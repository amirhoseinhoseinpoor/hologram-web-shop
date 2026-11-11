// Article covers for part 5, drawn as studio-style product shots of holographic labels
// (light background, silver-rainbow foil, embossed emblem) to match the photos already
// on the site. Rendered to JPEG by headless Chrome.
//   node docs/seo/content/covers-3.js <out-dir>
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

// Concentric guilloche rosette, used inside every foil.
const rosette = (r, n = 36) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 360) / n;
    return `<ellipse cx="0" cy="0" rx="${r}" ry="${r * 0.38}" transform="rotate(${a})"/>`;
  }).join("");

const EMBLEM = {
  gear: `<g transform="translate(0,0)">
    <path d="M-8-60h16l4 14a48 48 0 0 1 13 7l14-5 8 14-11 10a48 48 0 0 1 0 15l11 10-8 14-14-5a48 48 0 0 1-13 7l-4 14h-16l-4-14a48 48 0 0 1-13-7l-14 5-8-14 11-10a48 48 0 0 1 0-15l-11-10 8-14 14 5a48 48 0 0 1 13-7z"/>
    <circle r="20"/></g>`,
  shield: `<path d="M0-62 L50-42 V0 C50 34 26 54 0 64 C-26 54 -50 34 -50 0 V-42 Z"/>
    <path d="M-22 2 L-6 18 L24 -16"/>`,
  cross: `<path d="M-14-50h28v36h36v28h-36v36h-28v-36h-36v-28h36z"/>`,
  star: `<path d="M0-58 L14-18 L56-18 L22 6 L35 48 L0 22 L-35 48 L-22 6 L-56-18 L-14-18 Z"/>`,
};

// A holographic foil: silver base, rainbow diffraction, fine lines, embossed emblem.
const foil = ({ w, h, radius = 18, emblem, angle = 0, serial }) => `
<div class="foil" style="width:${w}px;height:${h}px;border-radius:${radius}px;--a:${angle}deg">
  <div class="rainbow"></div><div class="lines"></div>
  <svg class="guil" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice"><g>${rosette(92)}${rosette(64, 28)}</g></svg>
  <svg class="emb" viewBox="-100 -100 200 200">
    <g class="shade" transform="translate(2.5,3)">${EMBLEM[emblem]}</g>
    <g class="lite">${EMBLEM[emblem]}</g>
  </svg>
  ${serial ? `<div class="serial">${serial}</div>` : ""}
  <div class="sheen"></div>
</div>`;

const SCENES = {
  // Box corner with a seal across the lid, plus a small label on a metal part.
  autoParts: `
  <div class="box" style="left:150px;top:210px;width:640px;height:330px;transform:rotate(-4deg)">
    <div class="box-lid"></div>
    <div class="place" style="left:270px;top:-40px;transform:rotate(0deg)">${foil({ w: 120, h: 190, radius: 10, emblem: "gear", angle: 30 })}</div>
  </div>
  <div class="metal" style="left:720px;top:250px;transform:rotate(8deg)">
    <div class="place" style="left:95px;top:95px">${foil({ w: 130, h: 130, radius: 65, emblem: "gear", angle: 140, serial: "A 0417" })}</div>
  </div>`,

  // Certificate with a round hologram seal and a card beside it.
  documents: `
  <div class="paper" style="left:170px;top:90px;transform:rotate(-5deg)">
    <div class="border"></div>
    <div class="lines-txt">${Array.from({ length: 7 }, (_, i) => `<i style="width:${[70, 88, 80, 92, 60, 84, 50][i]}%"></i>`).join("")}</div>
    <div class="place" style="left:470px;top:330px">${foil({ w: 150, h: 150, radius: 75, emblem: "star", angle: 60 })}</div>
  </div>
  <div class="card" style="left:760px;top:300px;transform:rotate(9deg)">
    <div class="photo"></div>
    <div class="card-lines"><i></i><i></i><i></i></div>
    <div class="place" style="left:150px;top:120px">${foil({ w: 100, h: 64, radius: 10, emblem: "shield", angle: 200 })}</div>
  </div>`,

  // Supplement bottle with a seal over the cap, and capsules.
  pharma: `
  <div class="bottle" style="left:430px;top:110px">
    <div class="cap"></div><div class="neck"></div><div class="body"><div class="label-blank"></div></div>
    <div class="place" style="left:118px;top:-6px">${foil({ w: 64, h: 190, radius: 8, emblem: "cross", angle: 90 })}</div>
  </div>
  <div class="caps">
    <i style="left:250px;top:470px;transform:rotate(-20deg)"></i>
    <i style="left:330px;top:520px;transform:rotate(35deg)"></i>
    <i style="left:780px;top:500px;transform:rotate(-60deg)"></i>
  </div>
  <div class="place" style="left:760px;top:250px;transform:rotate(10deg)">${foil({ w: 170, h: 170, radius: 22, emblem: "shield", angle: 250 })}</div>`,
};

const COVERS = [
  { file: "cover-auto-parts.jpg", scene: "autoParts" },
  { file: "cover-documents.jpg", scene: "documents" },
  { file: "cover-pharma.jpg", scene: "pharma" },
];

const html = ({ scene }) => `<!doctype html><html><head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1200px; height: 675px; overflow: hidden; }
.c { position: relative; width: 1200px; height: 675px; overflow: hidden;
  background: radial-gradient(90% 120% at 30% 10%, #f4f7fa 0%, #dde5ee 45%, #b8c5d3 100%); }
.c::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(60% 50% at 75% 15%, rgba(255,255,255,.55), transparent 70%); }
.place, .box, .metal, .paper, .card, .bottle { position: absolute; }

.foil { position: relative; overflow: hidden;
  background: linear-gradient(135deg, #d9dee5, #8d97a5 35%, #f4f6f8 52%, #7d8794 75%, #c9cfd7);
  box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 14px 26px -12px rgba(30,45,70,.55), 0 2px 4px rgba(30,45,70,.25); }
.rainbow { position: absolute; inset: -40%;
  background: conic-gradient(from var(--a), #ff6b9a, #ffc36b, #f7ff8a, #7dffc2, #6bd8ff, #8f8bff, #ff7ae0, #ff6b9a);
  mix-blend-mode: hard-light; opacity: .62; filter: saturate(1.6); }
.lines { position: absolute; inset: 0; mix-blend-mode: overlay; opacity: .55;
  background: repeating-linear-gradient(calc(var(--a) + 20deg), rgba(255,255,255,.0) 0 2px, rgba(255,255,255,.9) 2px 3px); }
.guil { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: rgba(255,255,255,.55); stroke-width: .5; mix-blend-mode: overlay; }
.emb { position: absolute; inset: 14%; width: 72%; height: 72%; }
.emb .shade { fill: none; stroke: rgba(30,38,55,.55); stroke-width: 6; stroke-linejoin: round; stroke-linecap: round; }
.emb .lite { fill: none; stroke: rgba(255,255,255,.98); stroke-width: 5; stroke-linejoin: round; stroke-linecap: round; }
.serial { position: absolute; left: 0; right: 0; bottom: 10%; text-align: center; font: 700 15px "Courier New", monospace; color: rgba(25,35,55,.8); letter-spacing: 1px; }
.sheen { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.65) 45%, transparent 60%); mix-blend-mode: soft-light; }

.box { background: linear-gradient(180deg, #f7f7f5, #e4e3df); border-radius: 6px;
  box-shadow: 0 40px 60px -30px rgba(30,45,70,.6), 0 2px 0 #fff inset; }
.box-lid { position: absolute; left: 0; right: 0; top: 0; height: 70px; border-bottom: 2px solid #cfcdc7;
  background: linear-gradient(180deg, #fbfbfa, #ecebe7); border-radius: 6px 6px 0 0; }
.metal { width: 320px; height: 320px; border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, #9aa3ad 0 18%, transparent 18.5%),
    conic-gradient(from 20deg, #7f8892, #d7dce1, #8a939d, #e5e8eb, #7c858f, #cfd5da, #7f8892);
  box-shadow: 0 40px 60px -28px rgba(30,45,70,.65), inset 0 0 0 14px rgba(255,255,255,.15); }

.paper { width: 680px; height: 480px; background: #fbfbf8; border-radius: 4px;
  box-shadow: 0 40px 60px -30px rgba(30,45,70,.55); }
.paper .border { position: absolute; inset: 18px; border: 3px double #b9a985; border-radius: 3px; }
.lines-txt { position: absolute; left: 70px; right: 70px; top: 70px; display: flex; flex-direction: column; gap: 22px; align-items: center; }
.lines-txt i { display: block; height: 10px; border-radius: 5px; background: #d6d9de; }
.lines-txt i:first-child { height: 22px; background: #b9a985; }
.card { width: 340px; height: 214px; border-radius: 16px; background: linear-gradient(135deg, #ffffff, #e9eef4);
  box-shadow: 0 30px 50px -24px rgba(30,45,70,.6); }
.card .photo { position: absolute; left: 22px; top: 40px; width: 92px; height: 116px; border-radius: 8px; background: linear-gradient(180deg, #c9d3de, #a9b6c4); }
.card-lines { position: absolute; left: 136px; right: 24px; top: 46px; display: flex; flex-direction: column; gap: 14px; }
.card-lines i { display: block; height: 9px; border-radius: 5px; background: #cfd6de; }

.bottle .cap { position: absolute; left: 95px; top: 0; width: 110px; height: 70px; border-radius: 12px;
  background: repeating-linear-gradient(90deg, #f2f4f6 0 6px, #dfe3e8 6px 9px); box-shadow: 0 2px 0 #fff inset; }
.bottle .neck { position: absolute; left: 105px; top: 66px; width: 90px; height: 26px; background: #e8ebef; }
.bottle .body { position: absolute; left: 30px; top: 88px; width: 240px; height: 380px; border-radius: 40px 40px 26px 26px;
  background: linear-gradient(90deg, #d9dee4, #ffffff 35%, #f3f5f7 60%, #c9d0d8);
  box-shadow: 0 40px 60px -28px rgba(30,45,70,.6); }
.label-blank { position: absolute; left: 0; right: 0; top: 110px; height: 160px; background: linear-gradient(90deg, #cfdbe6, #eef3f7 40%, #c3d0dc); opacity: .7; }
.caps i { position: absolute; width: 70px; height: 28px; border-radius: 14px;
  background: linear-gradient(90deg, #f3f5f7 50%, #f3a86b 50%); box-shadow: 0 10px 14px -8px rgba(30,45,70,.6), inset 0 3px 4px rgba(255,255,255,.7); }
</style></head><body><div class="c">${SCENES[scene]}</div></body></html>`;

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
    await wait(1200);
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 88, clip: { x: 0, y: 0, width: 1200, height: 675, scale: 1 } });
    fs.writeFileSync(path.join(out, cover.file), Buffer.from(shot.result.data, "base64"));
    console.log(cover.file);
  }
  ws.close();
  chrome.kill();
})();
