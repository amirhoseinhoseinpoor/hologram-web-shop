// Turns the content modules in this folder into reviewable SQL for the production database.
//
//   node build-sql.js <state.json> <out-dir>
//
// state.json is a snapshot of the records this touches (code, updatedAt and, for products,
// the two description fields), taken right before the run. Every UPDATE is pinned to that
// snapshot inside a DO block that raises if no row matches, so anything edited in the admin
// panel after the snapshot aborts the whole transaction instead of being overwritten.
//
// Output:
//   products-intro.sql    field 1 ("توضیحات") of every product
//   products-details.sql  field 2 ("توضیحات تکمیلی"); needs the site's ProductDetails renderer
//   content.sql           new articles and exhibitions, rewrites, hidden unverified records
//   media.txt             uploads for the new exhibition covers: <file>|<tag>|<stored name>
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const products = require("./products");
const newBlogs = [...require("./articles-1"), ...require("./articles-2")];
const { blogs, exhibitionsNew, exhibitionUpdates, honorUpdates, hide, enc } = require("./updates");

const [stateFile, out = "."] = process.argv.slice(2);
const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));

const q = (value) => `'${String(value).replace(/'/g, "''")}'`;
const newCode = () => String(crypto.randomInt(100000, 999999));
const find = (table, code) => {
  const row = state[table].find((item) => item.code === code);
  if (!row) throw new Error(`${table} ${code} is not in the snapshot`);
  return row;
};

// One UPDATE that must hit exactly the snapshotted row.
const pinned = (label, statement) =>
  `DO $do$ BEGIN\n  ${statement};\n  IF NOT FOUND THEN RAISE EXCEPTION ${q(`${label} changed since the snapshot`)}; END IF;\nEND $do$;`;

// ---------------------------------------------------------------- products
function productSql(field) {
  const lines = ["BEGIN;"];
  for (const item of products) {
    const row = find("products", item.code);
    const value = field === "subtitle" ? item.subtitle : item.details;
    if (field === "subtitle" && /\n/.test(value)) throw new Error(`${item.code}: field 1 must be one line`);
    if (row[field] === value) continue;
    lines.push(
      pinned(
        `product ${item.code} ${field}`,
        `UPDATE "Products" SET "updatedAt" = now(), info = jsonb_set(info, ${q(`{${field}}`)}, to_jsonb(${q(value)}::text)) ` +
          `WHERE code = ${q(item.code)} AND deleted = false AND info->>${q(field)} = ${q(row[field])}`,
      ),
    );
  }
  lines.push("COMMIT;");
  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------- content
const sql = ["BEGIN;"];
const media = [];

for (const post of newBlogs) {
  const content = {
    title: post.title,
    type: "آموزشی",
    time: post.time,
    tags: post.tags,
    priority: false,
    imageSrc: post.cover,
    posetives: "",
    negetive: "",
    product: {
      src: post.product.src,
      link: enc(post.product.category, post.product.name),
      title: post.product.title,
    },
    content: post.content,
  };
  sql.push(
    `INSERT INTO "Blogs" ("createdAt","updatedAt","createdBy","updatedBy",code,active,deleted,content) ` +
      `SELECT now(),now(),1,1,${q(newCode())},true,false,${q(JSON.stringify(content))}::jsonb ` +
      `WHERE NOT EXISTS (SELECT 1 FROM "Blogs" WHERE content->>'title' = ${q(post.title)});`,
  );
}

for (const { code, fields } of blogs) {
  const row = find("blogs", code);
  sql.push(
    pinned(
      `blog ${code}`,
      `UPDATE "Blogs" SET "updatedAt" = now(), content = content || ${q(JSON.stringify(fields))}::jsonb ` +
        `WHERE code = ${q(code)} AND "updatedAt" = ${q(row.updatedAt)}`,
    ),
  );
}

for (const item of exhibitionsNew) {
  const id = crypto.randomUUID();
  const ext = path.extname(item.image.file);
  media.push([item.image.file, "exhibitionImage", `${id}${ext}`].join("|"));
  const missing = `NOT EXISTS (SELECT 1 FROM "Exhibition" WHERE title = ${q(item.title)})`;
  sql.push(
    `INSERT INTO "Media" ("createdAt","updatedAt","createdBy","updatedBy",tag,type,"originalName","fileName","isPublic",active) ` +
      `SELECT now(),now(),1,1,'exhibitionImage','1',${q(item.image.file)},${q(id + ext)},true,true WHERE ${missing};`,
    `INSERT INTO "Exhibition" ("createdAt","updatedAt","createdBy","updatedBy",code,title,tags,src,active,deleted,content) ` +
      `SELECT ${q(item.date)}::timestamptz AT TIME ZONE 'UTC',now(),1,1,${q(newCode())},${q(item.title)},${q(item.tags)},${q(id)},true,false,${q(item.content)} ` +
      `WHERE ${missing};`,
  );
}

for (const { code, content } of exhibitionUpdates) {
  const row = find("exhibitions", code);
  sql.push(
    pinned(
      `exhibition ${code}`,
      `UPDATE "Exhibition" SET "updatedAt" = now(), content = ${q(content)} WHERE code = ${q(code)} AND "updatedAt" = ${q(row.updatedAt)}`,
    ),
  );
}

for (const { code, content, tags } of honorUpdates) {
  const row = find("honors", code);
  sql.push(
    pinned(
      `honor ${code}`,
      `UPDATE "Honors" SET "updatedAt" = now(), tags = ${q(tags)}, content = to_jsonb(${q(content)}::text) ` +
        `WHERE code = ${q(code)} AND "updatedAt" = ${q(row.updatedAt)}`,
    ),
  );
}

for (const [table, key] of [["Honors", "honors"], ["Exhibition", "exhibitions"]]) {
  for (const code of hide[key]) {
    const row = find(key, code);
    sql.push(
      pinned(
        `${key} ${code} (hide)`,
        `UPDATE "${table}" SET deleted = true WHERE code = ${q(code)} AND deleted = false AND "updatedAt" = ${q(row.updatedAt)}`,
      ),
    );
  }
}

sql.push("COMMIT;");

fs.writeFileSync(path.join(out, "products-intro.sql"), productSql("subtitle"));
fs.writeFileSync(path.join(out, "products-details.sql"), productSql("subtitleCompelete"));
fs.writeFileSync(path.join(out, "content.sql"), sql.join("\n") + "\n");
fs.writeFileSync(path.join(out, "media.txt"), media.join("\n") + "\n");
console.log(`${newBlogs.length} new articles, ${blogs.length} rewrites, ${exhibitionsNew.length} new exhibitions, ` +
  `${hide.honors.length + hide.exhibitions.length} hidden, ${products.length} products`);
