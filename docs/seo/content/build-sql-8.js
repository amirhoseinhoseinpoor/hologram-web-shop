// SQL for the 2026-11-16 batch: three articles; covers are the Gemini product mockups.
//   node build-sql-8.js <out-dir>
// Each insert is guarded by the article title, so running the file twice adds nothing.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const articles = require("./articles-8");
const { enc } = require("./links");

const [out = "."] = process.argv.slice(2);
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

sql.push("COMMIT;");
fs.writeFileSync(path.join(out, "content-8.sql"), sql.join("\n") + "\n");
fs.writeFileSync(path.join(out, "media-8.txt"), media.join("\n") + "\n");
console.log(`${articles.length} articles, ${media.length} covers`);
