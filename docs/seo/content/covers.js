// Typographic covers for exhibition pages that have no archived photo.
//   node docs/seo/content/covers.js <out-dir>
// Each cover states only what the company's own news recorded: event, city, year, stand.
const path = require("path");
const sharp = require(path.resolve(__dirname, "../../../node_modules/sharp"));

const COVERS = [
  {
    file: "drupa-2016-dusseldorf.png",
    title: "drupa 2016",
    lines: ["Düsseldorf, Germany", "31 May – 10 June 2016", "Hall 6 · Stand 64"],
  },
  {
    file: "dubai-print-pack-2017.png",
    title: "Print & Pack 2017",
    lines: ["Dubai, UAE", "March 2017"],
  },
];

const escape = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ title, lines }) {
  const rows = lines
    .map(
      (line, i) =>
        `<text x="96" y="${520 + i * 62}" font-size="40" fill="#c9d3e1">${escape(line)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1524"/><stop offset="1" stop-color="#1e2c42"/>
    </linearGradient>
    <linearGradient id="holo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f3802c"/><stop offset="0.35" stop-color="#ffd166"/>
      <stop offset="0.65" stop-color="#5ee7df"/><stop offset="1" stop-color="#b490ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <rect x="96" y="250" width="180" height="10" rx="5" fill="url(#holo)"/>
  <text x="96" y="410" font-family="Arial, Helvetica, sans-serif" font-size="112" font-weight="700" fill="#ffffff">${escape(title)}</text>
  <g font-family="Arial, Helvetica, sans-serif">${rows}</g>
  <text x="96" y="800" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#f3802c">AzarHologram</text>
</svg>`;
}

(async () => {
  const out = process.argv[2] || ".";
  for (const cover of COVERS) {
    await sharp(Buffer.from(svg(cover))).png({ compressionLevel: 9 }).toFile(path.join(out, cover.file));
    console.log(cover.file);
  }
})();
