// Additions to two honor pages (2026-11-10). The existing text stays; new sections only
// add verified context and internal links.
// IHMA award categories: the 2016 call for entries reported by Labels & Labeling
// ("IHMA opens latest Excellence in Holography Awards for entries"); the category of the
// company's own commendation is printed on its certificate.
const { P, B, G, a } = require("./links");

module.exports = [
  {
    code: "963851",
    append: `<h2>درباره جوایز Excellence in Holography</h2>
<p>انجمن بین‌المللی تولیدکنندگان هولوگرام (International Hologram Manufacturers Association یا IHMA) تولیدکنندگان هولوگرام و فعالان این صنعت را از کشورهای مختلف گرد هم می‌آورد و هر سال جوایز Excellence in Holography را برگزار می‌کند. آثار در چند بخش داوری می‌شوند؛ در فراخوان دوره ۲۰۱۶ از جمله این بخش‌ها آمده بود:</p>
<ul>
<li>نوآوری در فناوری هولوگرافی (Innovation in Holographic Technology)</li>
<li>بهترین ساخت مستر (Best Origination)</li>
<li>بهترین کاربرد نمایشی یا فناوری نوظهور هولوگرافی</li>
<li>بهترین کاربرد امنیتی (Best Applied Security)</li>
<li>بهترین محصول کاربردی تزئینی و بسته‌بندی (Best Applied Decorative/Packaging Product)</li>
</ul>
<p>تقدیر آذرهولوگرام در بخش آخر بود؛ بخشی که به کاربرد هولوگرام در جلوه و ارزش بصری بسته‌بندی می‌پردازد. علاوه بر برنده هر بخش، آثاری که داوران شایسته توجه بدانند با عنوان Commended معرفی می‌شوند.</p>
<h2>این تقدیر به کدام محصولات مربوط است؟</h2>
<p>محصول تقدیرشده یک لیبل هولوگرافیک بود. لیبل‌هایی که تمام سطح آن‌ها جلوه هولوگرام دارد امروز در صفحه ${a(P.holographic, "لیبل‌های هولوگرافیک")} معرفی شده‌اند. روش‌های ساخت مستر، از جمله ماتریس تصویر، را در مقاله ${a(B.process, "مراحل تولید هولوگرام")} و نقش رنگ در جلوه برچسب را در ${a(B.colorGuide, "رنگ هولوگرام")} توضیح داده‌ایم.</p>
<p>سایر سوابق شرکت را در ${a(G.honors, "افتخارات")} و ${a(G.exhibitions, "نمایشگاه‌ها")} ببینید.</p>`,
  },
  {
    code: "523744",
    append: `<h2>سوابق همان سال</h2>
<p>سال ۱۳۹۵ (۲۰۱۶) برای آذرهولوگرام سال پرکاری بود: علاوه بر این لوح، شرکت در ${a(G.drupa, "نمایشگاه drupa 2016")} در دوسلدورف حضور داشت و در ${a(G.ihma, "جوایز Excellence in Holography انجمن IHMA")} تقدیر شد.</p>
<p>محصولاتی که امروز تولید می‌شوند، از ${a(P.holographic, "لیبل‌های هولوگرافیک")} تا ${a(P.sealCustom, "برچسب‌های پلمپ")}، در صفحه ${a("/" + encodeURIComponent("محصولات"), "محصولات")} آمده‌اند.</p>`,
  },
];
