// Replaces the "AZARHOLOGRAM.CO" plaque on the home banner (code 864328) with a new plaque
// reading AZARHOLOGRAM.NET. The rest of the original banner is kept as it is.
//   node docs/seo/content/banner-net.js <original.png> <out.png>
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [input, output] = process.argv.slice(2);
const W = 1672;
const H = 940;
const SPECTRUM = "#ff4fa3, #ff9a3c, #ffe84d, #5dff9b, #3ad7ff, #6f6bff, #d65cff, #ff4fa3";

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #000; }
.bg { position: absolute; inset: 0; background: url("${pathToFileURL(path.resolve(input)).href}") no-repeat 0 0 / ${W}px ${H}px; }
/* Dark panel that hides the old plaque; its edges fade into the banner. */
.mask { position: absolute; left: 656px; top: 512px; width: 1016px; height: 222px;
  background: linear-gradient(180deg, #0b0a1c, #120c26 50%, #0b0a1c);
  -webkit-mask: linear-gradient(90deg, transparent 0, #000 22px, #000 100%); }
.plaque { position: absolute; left: 702px; top: 532px; width: 944px; height: 182px; border-radius: 22px; padding: 6px;
  background: linear-gradient(100deg, ${SPECTRUM});
  box-shadow: 0 0 34px rgba(90, 160, 255, .45), 0 0 4px rgba(255,255,255,.6); }
.inner { position: relative; width: 100%; height: 100%; border-radius: 17px; overflow: hidden;
  background: radial-gradient(120% 140% at 50% 0%, #1b1640, #07061a 70%);
  box-shadow: inset 0 0 0 3px rgba(0,0,0,.85), inset 0 0 0 5px rgba(255,255,255,.18); }
.mesh { position: absolute; inset: 0; opacity: .22;
  background: repeating-linear-gradient(60deg, rgba(120,140,255,.5) 0 1px, transparent 1px 14px),
    repeating-linear-gradient(-60deg, rgba(255,90,170,.45) 0 1px, transparent 1px 14px); }
.word { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font: 700 128px/1 "Bahnschrift", "Arial Narrow", sans-serif; font-stretch: condensed; letter-spacing: 2px; }
.word span { position: relative; }
.word .shadow { position: absolute; left: 0; top: 0; color: transparent; -webkit-text-stroke: 14px #05040f; }
.word .fill { position: relative; color: transparent;
  background: linear-gradient(100deg, ${SPECTRUM}), repeating-linear-gradient(0deg, rgba(255,255,255,.0) 0 3px, rgba(255,255,255,.25) 3px 4px);
  background-blend-mode: overlay; -webkit-background-clip: text; background-clip: text;
  -webkit-text-stroke: 2px rgba(255,255,255,.55); filter: drop-shadow(0 0 10px rgba(255,255,255,.25)); }
.word .gloss { position: absolute; left: 0; top: 0; color: transparent;
  background: linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,0) 45%);
  -webkit-background-clip: text; background-clip: text; }
</style></head><body>
<div class="bg"></div><div class="mask"></div>
<div class="plaque"><div class="inner"><div class="mesh"></div>
  <div class="word"><span><span class="shadow">AZARHOLOGRAM.NET</span><span class="fill">AZARHOLOGRAM.NET</span><span class="gloss">AZARHOLOGRAM.NET</span></span></div>
</div></div>
<script>
  // Shrink the word until it fits the plaque with a margin on each side.
  const word = document.querySelector(".word"), box = document.querySelector(".inner");
  let size = 128;
  const span = word.firstElementChild;
  while (span.offsetWidth > box.clientWidth - 70 && size > 40) { size -= 2; word.style.fontSize = size + "px"; }
</script>
</body></html>`;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const dir = path.dirname(path.resolve(output));
  const file = path.join(dir, "banner-net.html");
  fs.writeFileSync(file, html);
  const port = 9600 + Math.floor(Math.random() * 300);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`,
    `--user-data-dir=${path.join(dir, ".profile")}`, "--no-first-run", "--hide-scrollbars",
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
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: pathToFileURL(file).href });
  await wait(1500);
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  fs.writeFileSync(output, Buffer.from(shot.result.data, "base64"));
  console.log(output);
  ws.close();
  chrome.kill();
})();
