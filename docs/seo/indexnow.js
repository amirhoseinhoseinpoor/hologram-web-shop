// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) about every URL in the sitemap.
// Google does not take part in IndexNow; use Search Console for it.
//   node docs/seo/indexnow.js
const KEY = "568ffc98fb194dfc88d5ab4f81542661";
const HOST = "azarhologram.net";

(async () => {
  const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`submitted ${urlList.length} URLs: ${res.status} ${res.statusText}`);
})();
