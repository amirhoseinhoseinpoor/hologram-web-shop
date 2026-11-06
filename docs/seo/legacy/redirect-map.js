// Builds the nginx map that sends every URL of the retired azarhologram.co and azarhologram.ir
// to the closest page on azarhologram.net. The URL list comes from the Wayback Machine.
//   node redirect-map.js <out-file>
// Unknown paths fall back to regexes in legacy-domains.conf, then to the home page.
const fs = require("fs");
const { honors, exhibitions, blogs, enc } = require("./content");
const later = require("./articles-2");

const allBlogs = [...blogs, ...later.blogs];
const blogPath = (key) => enc("Blog", allBlogs.find((b) => b.key === key).title);
const T = {
  home: "/",
  about: "/AboutUs",
  contact: "/ContactUs",
  blog: "/Blog",
  honors: "/Honors",
  exhibitions: "/Exhibition",
  effects: "/EffectType",
  products: enc("محصولات"),
  hologram: enc("هولوگرام"),
  labels: enc("لیبل‌های امنیتی"),
  seals: enc("برچسب‌های پلمپ"),
  scratch: enc("اسکرچ"),
  price: enc("Guide", "قیمت-هولوگرام"),
  choose: enc("Guide", "انتخاب-برچسب-امنیتی"),
  barcode: enc("هولوگرام", "بارکد هولوگرام"),
  destructible: enc("هولوگرام", "هولوگرام های تخریب شونده"),
  transparent: enc("هولوگرام", "هولوگرام‌های شفاف"),
  colors: enc("هولوگرام", "هولوگرام‌های رنگی"),
  tape: enc("هولوگرام", "نوار هولوگرام"),
  pvc: enc("هولوگرام", "هولوگرام کارت‌ های پی وی سی"),
  stripeLabel: enc("لیبل‌های امنیتی", "لیبل با نوار هولوگرام"),
  holographic: enc("لیبل‌های امنیتی", "لیبل‌های هولوگرافیک"),
  holoScratch: enc("اسکرچ", "هولو اسکرچ"),
  whatIs: enc("Blog", "هولوگرام چیست؟ کاربردها، مزایا و انواع هولوگرام‌های امنیتی"),
  security: enc("Blog", "هولوگرام امنیتی چیست و چه کاربردی دارد؟"),
  verify: blogPath("verify"),
  warranty: blogPath("warranty"),
  threeD: blogPath("3d"),
  install: blogPath("install"),
  ready: blogPath("ready"),
  void: blogPath("void"),
  design: blogPath("design"),
  ihma: enc("Honors", honors.find((h) => h.key === "ihma2016").title),
  festival: enc("Honors", honors.find((h) => h.key === "festival16").title),
  labelexpo: enc("Exhibition", exhibitions.find((e) => e.key === "labelexpo").title),
};

// First match wins. Patterns run against a decoded path segment.
const RULES = [
  [/^(|home|خانه|index\.php|en|english)$/i, T.home],
  [/ihma|اثر-برتر/i, T.ihma],
  [/جشنوا|جشنواره/, T.festival],
  [/اكسپو|اکسپو|label-?expo|نمايشگاه-ليبل|نمایشگاه-لی|بزرگترين-نمايشگاه/i, T.labelexpo],
  [/افتخار/, T.honors],
  [/نمایشگاه|نمايشگاه|دروپا|drupa|دبی|دوبی|غرفه|بازديد|بازدید|استقبال|گزارش-زنده|exhibition/i, T.exhibitions],
  [/^general$|هولوگرام-آماده|استوک|عمومی|تعداد-کم|در-این-صفحه-به-فروش/, T.ready],
  [/وید-تخریبی|^void$/i, T.void],
  [/طراحی.*هولوگرام|طراحی-هولوگرام|هوگرام|^هولوگرام-اختصاصی$|هویت-بصری|ایده-خلاقانه-برای-طراحی/, T.design],
  [/تشخیص|جعلی|غیر-قابل-جعل|جلوگیری-از-جعل|اسکناس|تقلبی|چرا-جعل/, T.verify],
  [/گارانتی|warranty/i, T.warranty],
  [/نصب/, T.install],
  [/سه-?بعدی|سهبعدی|سه‌بعدی|دو-و-سه|3d|full-3d|three-d/i, T.threeD],
  [/^barcode$|بارکد/i, T.barcode],
  [/پلمپ|ضد-سرقت|اموال|voidopen|stamp-labels|seal/i, T.seals],
  [/اسکرچ|scratch/i, T.holoScratch],
  [/^(cancelled|destructible|degradable.*|holograms-of-decals)$|تخریب|وید-تخریبی/i, T.destructible],
  [/^(transparent|transparent-hologram)$|شفاف/i, T.transparent],
  [/^(colors|hologram-in-different-colors)$/i, T.colors],
  [/^(holotape|hologram-tape)$|نوار-هولوگرام/i, T.tape],
  [/pvc|پی-وی-سی|کارتهای-پی/i, T.pvc],
  [/^(hololable|simple-labels-and-holograms)$/i, T.stripeLabel],
  [/holographic-labels|لیبلهای-هولوگرافیک|برچسبهای-هولوگرافیک|هولوگرافیک-جدید/i, T.holographic],
  [/^(2d|2d-3d|90-flip-flop|90-degree.*|animated-hidden.*|decolor|dotdiamond|diamond-point|dotmatrix|dot-matrix|flip-flops?|flip-flop-2|guilloche.*|hidden-?image|image-secret-code|hologram-effects|hologram-security-effects|kinetic|moving-images|metal|metallic.*|micro-images|micron.*|microtext|truecolor|true-colors.*|whitetext|white-text|two-dimensional-hologram|surface)$|افکت|میکرو|بیرنگ|گیلوچه|فلزی|دو-بعدی/i, T.effects],
  [/faq|how-to-order|قیمت|سفارش-(چاپ-)?هولوگرام|سفارش-چاپ|خرید-(خرید-)*هولوگرام|خرید-.*هولوگرام|فروش-هولوگرام|حداقل-تعداد|مدت-زمان|عوامل-موثر|نکاتی-که-باید|نکته-در-خرید|هولوگرام-آماده|در-این-صفحه-به-فروش|چگونگی-سفارش|price|order/i, T.price],
  [/^about|^درباره|خانه-چاپ|چاپ-چکاوک|آذر-هولوگرام-خانه/i, T.about],
  [/contact|تماس|locations\.kml/i, T.contact],
  [/انواع-برچسب-امنیتی|لیبل-امنیتی|برچسب-امنیتی|تاثیر-برچسب/, T.choose],
  [/لیبل|برچسب|label/i, T.labels],
  [/what-is|چیست|تاریخچه|تکنولوژی|معرفی|آشنایی|جهان-هولوگرام|اصطلاحات|هولوگرافیک/i, T.whatIs],
  [/usage|using-hologram|characteristics|specifications|کاربرد|مزایا|مزیت|امنیت|مدارک|اسناد|شناسایی|دارو|کارایی|اهمیت|چرا/i, T.security],
  [/types|انواع/i, T.products],
  [/^(serial|sheet|roll|general|tolid-hologram|hologram-printing|hotstampe|hotstamp-continuous|continuous-hot-stamping|hologram-hot-stamp|hologram-roll|hologram-with-.*|sheet-hologram-label)$|هولوگرام|هات|مهر-زنی|رول|چاپ|تولید|ساخت/i, T.hologram],
];

const CATEGORY_RULES = [
  [/hologram-labels/i, T.labels],
  [/security-effects/i, T.effects],
  [/types-of-holograms/i, T.products],
  [/افتخارات/, T.honors],
  [/اکسپو|اكسپو|label-expo/i, T.labelexpo],
  [/نمایشگاه|دروپا|دوبی/, T.exhibitions],
  [/معرفي-هولوگرام/, T.whatIs],
];

function classify(segment) {
  for (const [re, target] of RULES) if (re.test(segment)) return target;
  return null;
}

// path: decoded, no trailing slash, no ".html"
function target(path) {
  const segs = path.split("/").filter(Boolean);
  if (segs.length === 0) return T.home;
  const [first, second = ""] = segs;
  if (/^(cat|category)$/i.test(first)) {
    for (const [re, t] of CATEGORY_RULES) if (re.test(second)) return t;
    return T.blog;
  }
  if (/^tag$/i.test(first)) return classify(second) || T.blog;
  if (/^author$/i.test(first)) return T.about;
  if (/^(blog|بلاگ|news|articles)$/i.test(first) || /^\d{4}$/.test(first)) return T.blog;
  if (/\.php$/i.test(first)) return T.home;
  // attachment pages live under their post
  return classify(first) || T.blog;
}

const SKIP = /wp-content|wp-includes|wp-json|wp-admin|wp-login|\/feed|xmlrpc|cdn-cgi|\.(jpe?g|png|gif|css|js|webp|svg|pdf|xml|txt|ico|woff2?|ttf|eot|mp4|zip|rar)$/i;

async function archived(host) {
  const url = `https://web.archive.org/cdx/search/cdx?url=${host}/*&output=txt&fl=original&collapse=urlkey&filter=statuscode:200&limit=5000`;
  const text = await (await fetch(url)).text();
  const paths = new Set();
  for (const line of text.split("\n")) {
    const raw = line.trim();
    if (!raw || SKIP.test(raw)) continue;
    let p = raw.replace(/^https?:\/\/(www\.)?[^/]+(:\d+)?/i, "").split("?")[0].split("#")[0];
    try {
      p = decodeURIComponent(p);
    } catch {
      continue;
    }
    p = p.replace(/\/{2,}/g, "/").replace(/\.html$/i, "").replace(/\/+$/, "") || "/";
    if (/[\s"';{}\\]/.test(p)) continue; // not safe as a literal nginx map key
    paths.add(p);
  }
  return [...paths];
}

(async () => {
  const outFile = process.argv[2] || "azarhologram-legacy-map.conf";
  const all = new Set([...(await archived("azarhologram.co")), ...(await archived("azarhologram.ir"))]);
  const lines = [];
  const counts = {};
  for (const p of [...all].sort()) {
    const t = target(p);
    counts[t] = (counts[t] || 0) + 1;
    // keys are matched against the normalized path, see legacy-domains.conf
    lines.push(`"${p}" ${t};`);
  }
  fs.writeFileSync(outFile, `# generated by docs/seo/legacy/redirect-map.js\n${lines.join("\n")}\n`);
  const name = Object.fromEntries(Object.entries(T).map(([k, v]) => [v, k]));
  console.log(`${lines.length} paths`);
  for (const [t, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(n, name[t] || t);
})();

