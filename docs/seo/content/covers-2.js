// Article covers drawn in HTML/CSS with the site's font and palette, rendered to JPEG by
// headless Chrome (so Persian text is shaped correctly).
//   node docs/seo/content/covers-2.js <out-dir>
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FONT = pathToFileURL(path.resolve(__dirname, "../../../src/app/Fonts/IRANSansXVF.woff2")).href;
const SPECTRUM = "#f3802c, #e4c14f, #58c3a2, #5a8fd8, #a07bd6";

const swatch = ([from, to]) =>
  `<div class="sw" style="background:linear-gradient(135deg, ${from}, ${to})"><i></i></div>`;

const ART = {
  color: `<div class="swatches">${[
    ["#e9eef4", "#8794a6"], ["#f8dc85", "#b07f22"], ["#ff7a7a", "#a3122a"],
    ["#7cbcff", "#1d4ea3"], ["#86e6b0", "#1b7a4b"], ["#cfaaff", "#5a2aa3"],
    ["#ffbd78", "#c25611"], ["#eba57e", "#8a4527"], ["#86ece4", "#127c76"],
  ].map(swatch).join("")}</div>`,

  seal: `<svg viewBox="0 0 460 460" class="svg">
    <defs>
      <linearGradient id="spec" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f3802c"/><stop offset=".25" stop-color="#e4c14f"/>
        <stop offset=".5" stop-color="#58c3a2"/><stop offset=".75" stop-color="#5a8fd8"/><stop offset="1" stop-color="#a07bd6"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#2a3d58"/><stop offset=".45" stop-color="#3d587c"/><stop offset="1" stop-color="#1e2c42"/>
      </linearGradient>
    </defs>
    <rect x="150" y="150" width="160" height="270" rx="34" fill="url(#glass)" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
    <rect x="190" y="96" width="80" height="70" rx="10" fill="url(#glass)" stroke="rgba(255,255,255,.25)" stroke-width="2"/>
    <rect x="178" y="56" width="104" height="52" rx="10" fill="#0f1a2b" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
    <g opacity=".95">
      <rect x="214" y="40" width="32" height="170" rx="5" fill="url(#spec)"/>
      <rect x="214" y="40" width="10" height="170" rx="4" fill="rgba(255,255,255,.35)"/>
    </g>
    <rect x="170" y="250" width="120" height="110" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.18)"/>
    <path d="M168 168 C 168 200, 160 210, 160 240" stroke="rgba(255,255,255,.25)" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`,

  fast: `<svg viewBox="0 0 460 460" class="svg">
    <defs>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f3802c"/><stop offset=".3" stop-color="#e4c14f"/>
        <stop offset=".6" stop-color="#58c3a2"/><stop offset="1" stop-color="#a07bd6"/>
      </linearGradient>
    </defs>
    <rect x="206" y="40" width="48" height="34" rx="8" fill="#2a3d58"/>
    <rect x="222" y="70" width="16" height="22" fill="#2a3d58"/>
    <circle cx="230" cy="250" r="150" fill="#131f32" stroke="url(#ring)" stroke-width="16"/>
    <circle cx="230" cy="250" r="118" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="2" stroke-dasharray="4 18"/>
    <path d="M230 250 L 230 152" stroke="#f2f4f7" stroke-width="10" stroke-linecap="round"/>
    <path d="M230 250 L 300 292" stroke="#f3802c" stroke-width="10" stroke-linecap="round"/>
    <circle cx="230" cy="250" r="14" fill="#f2f4f7"/>
    <g stroke="rgba(255,255,255,.35)" stroke-width="10" stroke-linecap="round">
      <path d="M30 200 H 70"/><path d="M14 250 H 66"/><path d="M30 300 H 70"/>
    </g>
  </svg>`,

  cost: `<svg viewBox="0 0 460 460" class="svg">
    <defs>
      <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e4c14f"/><stop offset=".5" stop-color="#58c3a2"/><stop offset="1" stop-color="#5a8fd8"/>
      </linearGradient>
    </defs>
    <path d="M50 400 H 420" stroke="rgba(255,255,255,.3)" stroke-width="3"/>
    <rect x="70" y="110" width="52" height="290" rx="8" fill="url(#bar)" opacity=".95"/>
    <rect x="140" y="175" width="52" height="225" rx="8" fill="url(#bar)" opacity=".9"/>
    <rect x="210" y="230" width="52" height="170" rx="8" fill="url(#bar)" opacity=".85"/>
    <rect x="280" y="275" width="52" height="125" rx="8" fill="url(#bar)" opacity=".8"/>
    <rect x="350" y="310" width="52" height="90" rx="8" fill="url(#bar)" opacity=".75"/>
    <path d="M96 70 C 200 70, 300 150, 376 250" stroke="#f3802c" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M352 252 L 380 258 L 384 228" stroke="#f3802c" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};

const COVERS = [
  { file: "cover-color-guide.jpg", art: "color", title: "رنگ هولوگرام", lead: "راهنمای انتخاب رنگ برچسب هولوگرامی" },
  { file: "cover-cap-seal.jpg", art: "seal", title: "برچسب پلمپ درب", lead: "بطری، ظرف و جعبه؛ روش انتخاب و نصب" },
  { file: "cover-fast.jpg", art: "fast", title: "چاپ فوری هولوگرام", lead: "چه چیزی زمان تحویل را تعیین می‌کند؟" },
  { file: "cover-cost.jpg", art: "cost", title: "کاهش هزینه چاپ هولوگرام", lead: "۹ راه برای سفارش اقتصادی‌تر" },
];

const html = ({ art, title, lead }) => `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><style>
@font-face { font-family: "IRANSans"; src: url("${FONT}") format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 675px; overflow: hidden; }
body { font-family: "IRANSans", Tahoma, sans-serif; background: #0b1524; }
.c { position: relative; width: 1200px; height: 675px; overflow: hidden; color: #f2f4f7;
  background: radial-gradient(120% 100% at 90% 0%, #1e2c42 0%, #0b1524 55%, #070e18 100%); }
.glow { position: absolute; width: 640px; height: 640px; left: -140px; top: 20px; border-radius: 50%;
  background: conic-gradient(from 200deg, ${SPECTRUM}, #f3802c); filter: blur(100px); opacity: .26; }
.rings { position: absolute; inset: 0; opacity: .07; }
.art { position: absolute; left: 80px; top: 100px; width: 460px; height: 460px; }
.svg { width: 100%; height: 100%; }
.swatches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; width: 100%; height: 100%; }
.sw { position: relative; border-radius: 22px; overflow: hidden; box-shadow: 0 18px 40px -20px rgba(0,0,0,.8);
  border: 1px solid rgba(255,255,255,.25); }
.sw i { position: absolute; inset: 0;
  background: repeating-linear-gradient(115deg, rgba(255,255,255,0) 0 6px, rgba(255,255,255,.12) 6px 7px),
    conic-gradient(from 40deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,.55) 50deg, rgba(255,255,255,0) 100deg,
      rgba(255,120,200,.25) 170deg, rgba(120,220,255,.3) 230deg, rgba(255,255,255,0) 300deg);
  mix-blend-mode: screen; }
.text { position: absolute; right: 80px; top: 0; bottom: 0; width: 540px; display: flex; flex-direction: column;
  justify-content: center; gap: 22px; text-align: right; }
.eyebrow { display: flex; align-items: center; gap: 14px; color: #f3802c; font-size: 26px; font-weight: 700; }
.eyebrow::before { content: ""; width: 48px; height: 5px; border-radius: 3px; background: linear-gradient(90deg, ${SPECTRUM}); }
h1 { font-size: 66px; font-weight: 800; line-height: 1.32; }
p { font-size: 30px; font-weight: 500; line-height: 1.7; color: #aab4c3; }
.brand { position: absolute; left: 80px; bottom: 44px; font: 700 24px Arial, sans-serif; color: #f3802c; }
.spectrum { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: linear-gradient(90deg, ${SPECTRUM}); }
</style></head><body><div class="c">
<div class="glow"></div>
<svg class="rings" viewBox="0 0 1200 675">${Array.from({ length: 14 }, (_, i) =>
  `<ellipse cx="300" cy="340" rx="${120 + i * 38}" ry="${70 + i * 24}" fill="none" stroke="#fff" stroke-width="1.5"/>`).join("")}</svg>
<div class="art">${ART[art]}</div>
<div class="text"><span class="eyebrow">مجله آذرهولوگرام</span><h1>${title}</h1><p>${lead}</p></div>
<div class="brand">AzarHologram</div>
<div class="spectrum"></div>
</div></body></html>`;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const out = path.resolve(process.argv[2] || ".");
  fs.mkdirSync(out, { recursive: true });
  const port = 9600 + Math.floor(Math.random() * 300);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`,
    `--user-data-dir=${path.join(out, ".profile")}`, "--no-first-run", "--hide-scrollbars",
    "--allow-file-access-from-files", "about:blank"]);
  let targets = [];
  for (let i = 0; i < 40 && !targets.length; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch {}
    if (!targets.length) await wait(250);
  }
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 675, deviceScaleFactor: 1, mobile: false });
  for (const cover of COVERS) {
    const file = path.join(out, cover.file.replace(/\.jpg$/, ".html"));
    fs.writeFileSync(file, html(cover));
    await send("Page.navigate", { url: pathToFileURL(file).href });
    await wait(1500);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 86, clip: { x: 0, y: 0, width: 1200, height: 675, scale: 1 } });
    fs.writeFileSync(path.join(out, cover.file), Buffer.from(shot.result.data, "base64"));
    console.log(cover.file);
  }
  ws.close();
  chrome.kill();
})();
