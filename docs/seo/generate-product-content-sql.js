// Turns product-content.json into reviewable SQL for the Products table.
//
//   node docs/seo/generate-product-content-sql.js > product-content.sql
//
// Every update is pinned to the value the field holds right now (read from the
// live API), so nothing written in the admin panel since then gets overwritten.
const fs = require("fs");
const path = require("path");

const API = process.env.API_URL || "https://azarhologram.net/api";
const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, "product-content.json"), "utf8"),
);

const quote = (value) => `'${String(value).replace(/'/g, "''")}'`;

(async () => {
  const products = await (await fetch(`${API}/product/list`)).json();
  const lines = ["BEGIN;"];

  for (const [code, fields] of Object.entries(content)) {
    const product = products.find((item) => item.code === code);
    if (!product) throw new Error(`product ${code} is not in the live list`);

    for (const [field, value] of Object.entries(fields)) {
      if (product.info[field] === value) continue;
      lines.push(
        `UPDATE "Products" SET info = jsonb_set(info, ${quote(`{${field}}`)}, to_jsonb(${quote(value)}::text))` +
          ` WHERE code = ${quote(code)} AND info->>${quote(field)} = ${quote(product.info[field])};`,
      );
    }
  }

  lines.push("COMMIT;");
  console.log(lines.join("\n"));
})();
