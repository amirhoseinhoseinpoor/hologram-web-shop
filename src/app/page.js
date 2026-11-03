import React from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";

import FAQ from "./Components/FAQ";
import FAQJsonLd from "./Components/FAQJsonLd";
import VideoShowcase from "./Components/VideoShowcase";
import BannerSlider from "./Components/home/BannerSlider";
import ProductCard from "./Components/product/ProductCard";
import productCardStyle from "./Components/product/ProductCard.module.scss";
import Guilloche from "./Components/ui/Guilloche";
import SectionHeading from "./Components/ui/SectionHeading";
import style from "./Components/home/Home.module.scss";
import MainLayout from "./layouts/MainLayout";
import { COMPANY } from "./utils/company";
import {
  isMeaningfulText,
  mediaUrl,
  toProductView,
} from "./utils/productContent";
import {
  fetchBanners,
  fetchBlogs,
  fetchExhibitions,
  fetchHeaderItems,
  fetchHomeVideos,
  fetchHonors,
  fetchProducts,
  getCategories,
} from "./utils/serverApi";

export const revalidate = 60;

export const metadata = {
  title: "آذرهولوگرام | تولید و چاپ هولوگرام در ایران",
  description:
    "شرکت آذرهولوگرام (خانه چاپ چکاوک) با خط کامل تولید هولوگرام در ایران. سفارش انواع لیبل هولوگرام، هولوگرام امنیتی و محصولات هولوگرافی با بالاترین کیفیت.",
  alternates: {
    canonical: "/",
  },
};

const HERO_FACTS = [
  { icon: PrecisionManufacturingOutlinedIcon, text: "خط کامل تولید در داخل کشور" },
  { icon: FingerprintIcon, text: "قابل شخصی‌سازی با لوگو، تصویر و کد" },
  { icon: VerifiedOutlinedIcon, text: "شروع تولید از ۲۰۰ شیت" },
];

const SECURITY_FEATURES = [
  {
    icon: ContentCopyOutlinedIcon,
    title: "غیر قابل کپی‌برداری",
    text: "حتی با استفاده از جدیدترین روش‌های کپی",
  },
  {
    icon: ImageOutlinedIcon,
    title: "قابلیت گنجاندن تصاویر",
    text: "تصاویر مخفی درون هولوگرام",
  },
  {
    icon: QrCode2Icon,
    title: "کدهای مخفی",
    text: "کدهای مخفی درون هولوگرام",
  },
];

// Same stages the customer sees in the order tracker.
const ORDER_STEPS = [
  { title: "استعلام قیمت", text: "مشخصات مورد نیاز خود را ثبت می‌کنید." },
  { title: "بارگذاری مدارک", text: "مدارک لازم سفارش را بارگذاری می‌کنید." },
  { title: "طراحی سفارش", text: "طرح با گفت‌وگوی مستقیم نهایی می‌شود." },
  { title: "تسویه حساب", text: "صورت‌حساب سفارش را تسویه می‌کنید." },
  { title: "انتخاب تحویل سفارش", text: "شیوه تحویل را مشخص می‌کنید." },
  { title: "رسید نهایی", text: "رسید نهایی سفارش صادر می‌شود." },
];

export default async function Home() {
  const [products, headerItems, banners, homeVideos, honors, exhibitions, blogs] =
    await Promise.all([
      fetchProducts(),
      fetchHeaderItems(),
      fetchBanners(),
      fetchHomeVideos(),
      fetchHonors(),
      fetchExhibitions(),
      fetchBlogs(),
    ]);

  const views = products.map(toProductView);

  const categories = getCategories(headerItems).map((category) => {
    const items = views.filter((view) => view.category === category.title);
    return {
      title: category.title,
      link: category.link,
      count: items.length,
      cover: items.find((item) => item.cover)?.cover,
      names: items.slice(0, 3).map((item) => item.name),
    };
  });

  // Only products that have been written up belong in the showcase.
  const featured = views
    .filter((view) => view.cover && view.intro && view.details)
    .slice(0, 6);

  const bannerItems = banners
    .filter((banner) => banner.src)
    .map((banner) => ({
      url: mediaUrl(banner.src),
      title: banner.title,
      link: banner.link,
    }));

  const videos = homeVideos
    .filter((item) => item.media?.src)
    .map(({ media }) => ({
      src: mediaUrl(media.src),
      poster: mediaUrl(media.poster),
      title: isMeaningfulText(media.title) ? media.title : "",
      description: isMeaningfulText(media.description) ? media.description : "",
    }));

  const latestBlogs = blogs
    .filter((blog) => blog.content?.priority === true)
    .slice(0, 3);

  const credentials = [
    ...honors.map((item) => ({
      kind: "افتخار",
      title: item.title,
      src: item.src,
      href: `/Honors/${item.title}`,
    })),
    ...exhibitions.map((item) => ({
      kind: "نمایشگاه",
      title: item.title,
      src: item.src,
      href: `/Exhibition/${item.title}`,
    })),
  ].slice(0, 4);

  return (
    <MainLayout>
      <section className={style.hero}>
        <Guilloche className={style.heroMotif} />
        <div className={`container ${style.heroGrid}`}>
          <div className={style.heroText}>
            <span className="az-eyebrow">{COMPANY.legalName}</span>
            <h1 className={style.heroTitle}>
              تولید و چاپ هولوگرام و لیبل‌های امنیتی در ایران
            </h1>
            <p className={style.heroLead}>{COMPANY.intro}</p>
            <div className={style.heroActions}>
              <a href="#products" className="az-btn az-btn--primary">
                مشاهده محصولات
                <ArrowBackIcon aria-hidden="true" />
              </a>
              <a href={COMPANY.phoneHref} className="az-btn az-btn--outline-dark">
                <CallOutlinedIcon aria-hidden="true" />
                {COMPANY.phoneLabel}
              </a>
            </div>
            <ul className={style.heroFacts}>
              {HERO_FACTS.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.heroVisual}>
            <BannerSlider banners={bannerItems} />
          </div>
        </div>
      </section>

      <section id="products" className="az-section">
        <div className="container">
          <SectionHeading
            eyebrow="محصولات"
            title="محصولات متنوع آذرهولوگرام"
            description="از هولوگرام‌های امنیتی تا لیبل پلمپ و اسکرچ؛ هر دسته را با نمونه‌های واقعی تولید ببینید."
          />
          <div className={style.categories}>
            {categories.map((category) => (
              <Link
                key={category.link}
                href={category.link}
                className={style.category}
              >
                <div className={style.categoryMedia}>
                  {category.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={category.cover} alt="" loading="lazy" />
                  )}
                </div>
                <div className={style.categoryBody}>
                  <div className={style.categoryHead}>
                    <h3 className="az-h3">{category.title}</h3>
                    {category.count > 0 && (
                      <span>{category.count.toLocaleString("fa-IR")} محصول</span>
                    )}
                  </div>
                  {category.names.length > 0 && (
                    <p>{category.names.join("، ")}</p>
                  )}
                  <ArrowBackIcon aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="az-section az-section--soft">
          <div className="container">
            <SectionHeading eyebrow="معرفی محصول" title="آشنایی با محصولات" />
            <div className={productCardStyle.grid}>
              {featured.map((product) => (
                <ProductCard key={product.code} product={product} showCategory />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="az-section">
        <div className={`container ${style.split}`}>
          <div className={style.splitMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/HomeImages/Intro-image.png"
              alt="نمای نزدیک هولوگرام امنیتی"
              loading="lazy"
            />
          </div>
          <div className={style.splitText}>
            <span className="az-eyebrow">افکت‌های امنیتی</span>
            <h2 className="az-h2">هولوگرام؛ مهر تأیید اصالت محصول شما</h2>
            <p className="az-lead">
              هولوگرام یکی از بهترین روش‌های امنیتی برای جلوگیری از جعل و کپی است.
              در این برچسب‌ها میکرو متن‌ها، تصاویر، کدها و نورهای لیزری در کنار
              یکدیگر قرار گرفته‌اند و با درج لوگو، تصاویر یا کدهای منحصر به فرد،
              قابل شخصی‌سازی هستند.
            </p>
            <ul className={style.features}>
              {SECURITY_FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={style.splitActions}>
              <Link
                href={`/EffectType?type=${encodeURIComponent("هولوگرام")}`}
                className="az-btn az-btn--dark"
              >
                معرفی افکت‌های هولوگرام
              </Link>
              <Link
                href={`/EffectType?type=${encodeURIComponent("لیبل‌های امنیتی")}`}
                className="az-btn az-btn--outline"
              >
                افکت‌های لیبل امنیتی
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="az-section az-section--dark">
        <div className="container">
          <SectionHeading
            eyebrow="مسیر سفارش"
            title="از استعلام قیمت تا رسید نهایی"
            description="هر سفارش این شش مرحله را طی می‌کند و وضعیت آن را در حساب کاربری خود می‌بینید."
          />
          <ol className={style.steps}>
            {ORDER_STEPS.map((step, index) => (
              <li key={step.title}>
                <span className={style.stepNumber}>
                  {(index + 1).toLocaleString("fa-IR")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="az-section">
          <div className="container">
            <SectionHeading eyebrow="ویدیو" title="محصولات را در عمل ببینید" />
            <VideoShowcase videos={videos} />
          </div>
        </section>
      )}

      {credentials.length > 0 && (
        <section className="az-section az-section--soft">
          <div className="container">
            <SectionHeading
              eyebrow="اعتبار"
              title="افتخارات و حضور در نمایشگاه‌ها"
              action={
                <div className={style.credentialLinks}>
                  <Link href="/Honors" className="az-btn az-btn--ghost">
                    همه افتخارات
                    <ArrowBackIcon aria-hidden="true" />
                  </Link>
                  <Link href="/Exhibition" className="az-btn az-btn--ghost">
                    همه نمایشگاه‌ها
                    <ArrowBackIcon aria-hidden="true" />
                  </Link>
                </div>
              }
            />
            <div className={style.credentials}>
              {credentials.map((item) => (
                <Link key={item.href} href={item.href} className={style.credential}>
                  <div className={style.credentialMedia}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mediaUrl(item.src)} alt="" loading="lazy" />
                  </div>
                  <span>{item.kind}</span>
                  <h3>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQJsonLd />
      <FAQ />

      {latestBlogs.length > 0 && (
        <section className="az-section az-section--soft">
          <div className="container">
            <SectionHeading
              eyebrow="مجله آذرهولوگرام"
              title="برای مطالعه بیشتر"
              action={
                <Link href="/Blog" className="az-btn az-btn--ghost">
                  همه مقالات
                  <ArrowBackIcon aria-hidden="true" />
                </Link>
              }
            />
            <div className={style.blogs}>
              {latestBlogs.map((blog) => (
                <Link
                  key={blog.code}
                  href={`/Blog/${blog.content.title}`}
                  className={style.blog}
                >
                  <div className={style.blogMedia}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mediaUrl(blog.content.imageSrc)}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <span>{blog.content.time}</span>
                  <h3>{blog.content.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={style.cta}>
        <Guilloche className={style.ctaMotif} />
        <div className={`container ${style.ctaBody}`}>
          <div>
            <h2 className="az-h2">برای محصول خود هولوگرام می‌خواهید؟</h2>
            <p>
              مشخصات سفارش خود را ثبت کنید یا برای مشاوره با کارشناسان ما تماس
              بگیرید.
            </p>
          </div>
          <div className={style.heroActions}>
            <a href="#products" className="az-btn az-btn--primary">
              انتخاب محصول و استعلام قیمت
            </a>
            <Link href="/ContactUs" className="az-btn az-btn--outline-dark">
              تماس با ما
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
