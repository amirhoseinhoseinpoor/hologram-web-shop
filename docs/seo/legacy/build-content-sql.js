// Writes the SQL and the image list that add the migrated honors, exhibition and new articles.
//   node build-content-sql.js <out-dir>
// Every insert is skipped when a row with the same title already exists, so re-running is safe.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { honors, exhibitions, blogs, enc } = require("./content");

const out = process.argv[2] || ".";
const q = (value) => `'${String(value).replace(/'/g, "''")}'`;
const code = () => String(crypto.randomInt(100000, 999999));

const files = [];
const sql = ["BEGIN;"];

function media(item, tag) {
  const ext = path.extname(item.image.name);
  const id = crypto.randomUUID();
  files.push([`${id}${ext}`, tag, item.image.url].join("|"));
  sql.push(
    `INSERT INTO "Media" ("createdAt","updatedAt","createdBy","updatedBy",tag,type,"originalName","fileName","isPublic",active) ` +
      `SELECT now(),now(),1,1,${q(tag)},'1',${q(item.image.name)},${q(id + ext)},true,true ` +
      `WHERE NOT EXISTS (SELECT 1 FROM "${tag === "honorImage" ? "Honors" : "Exhibition"}" WHERE title = ${q(item.title)});`,
  );
  return id;
}

for (const item of honors) {
  const src = media(item, "honorImage");
  sql.push(
    `INSERT INTO "Honors" ("createdAt","updatedAt","createdBy","updatedBy",code,title,tags,src,active,deleted,content) ` +
      `SELECT ${q(item.date)}::timestamptz AT TIME ZONE 'UTC',now(),1,1,${q(code())},${q(item.title)},${q(item.tags)},${q(src)},true,false,to_jsonb(${q(item.content)}::text) ` +
      `WHERE NOT EXISTS (SELECT 1 FROM "Honors" WHERE title = ${q(item.title)});`,
  );
}

for (const item of exhibitions) {
  const src = media(item, "exhibitionImage");
  sql.push(
    `INSERT INTO "Exhibition" ("createdAt","updatedAt","createdBy","updatedBy",code,title,tags,src,active,deleted,content) ` +
      `SELECT ${q(item.date)}::timestamptz AT TIME ZONE 'UTC',now(),1,1,${q(code())},${q(item.title)},${q(item.tags)},${q(src)},true,false,${q(item.content)} ` +
      `WHERE NOT EXISTS (SELECT 1 FROM "Exhibition" WHERE title = ${q(item.title)});`,
  );
}

for (const post of blogs) {
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
      `SELECT now(),now(),1,1,${q(code())},true,false,${q(JSON.stringify(content))}::jsonb ` +
      `WHERE NOT EXISTS (SELECT 1 FROM "Blogs" WHERE content->>'title' = ${q(post.title)});`,
  );
}

sql.push("COMMIT;");
fs.writeFileSync(path.join(out, "legacy-content.sql"), sql.join("\n") + "\n");
fs.writeFileSync(path.join(out, "legacy-images.txt"), files.join("\n") + "\n");
console.log(`${sql.length - 2} statements, ${files.length} images`);
