// SQL for the 2026-11-10 batch: four articles with generated covers, and additions to
// two honor pages.
//   node build-sql-3.js <state.json> <out-dir>
// state.json holds { honors: [{ code, updatedAt }] } read from the database right before.
// Honor additions are appended on the server side and pinned to that updatedAt, so an
// edit made in the admin panel after the snapshot aborts the whole transaction.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const articles = require("./articles-3");
const honors = require("./honors-2");
const { enc } = require("./links");

const [stateFile, out = "."] = process.argv.slice(2);
const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
const q = (value) => `'${String(value).replace(/'/g, "''")}'`;
const newCode = () => String(crypto.randomInt(100000, 999999));

const sql = ["BEGIN;"];
const media = [];

for (const post of articles) {
  const stored = `${crypto.randomUUID()}.jpg`;
  media.push([post.coverFile, "blogMainSrc", stored].join("|"));
  const missing = `NOT EXISTS (SELECT 1 FROM "Blogs" WHERE content->>'title' = ${q(post.title)})`;
  const content = {
    title: post.title,
    type: "آموزشی",
    time: post.time,
    tags: post.tags,
    priority: false,
    imageSrc: stored,
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
    `INSERT INTO "Media" ("createdAt","updatedAt","createdBy","updatedBy",tag,type,"originalName","fileName","isPublic",active) ` +
      `SELECT now(),now(),1,1,'blogMainSrc','1',${q(post.coverFile)},${q(stored)},true,true WHERE ${missing};`,
    `INSERT INTO "Blogs" ("createdAt","updatedAt","createdBy","updatedBy",code,active,deleted,content) ` +
      `SELECT now(),now(),1,1,${q(newCode())},true,false,${q(JSON.stringify(content))}::jsonb WHERE ${missing};`,
  );
}

for (const { code, append } of honors) {
  const row = state.honors.find((item) => item.code === code);
  if (!row) throw new Error(`honor ${code} is not in the snapshot`);
  sql.push(
    `DO $do$ BEGIN\n  UPDATE "Honors" SET "updatedAt" = now(), content = to_jsonb((content #>> '{}') || ${q("\n" + append)}) ` +
      `WHERE code = ${q(code)} AND "updatedAt" = ${q(row.updatedAt)};\n` +
      `  IF NOT FOUND THEN RAISE EXCEPTION ${q(`honor ${code} changed since the snapshot`)}; END IF;\nEND $do$;`,
  );
}

sql.push("COMMIT;");
fs.writeFileSync(path.join(out, "content-3.sql"), sql.join("\n") + "\n");
fs.writeFileSync(path.join(out, "media-3.txt"), media.join("\n") + "\n");
console.log(`${articles.length} articles, ${honors.length} honor additions, ${media.length} covers`);
