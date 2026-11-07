import Image from "next/image";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import style from "../../Styles/AboutUsStyle/About.module.scss";
import { encodePath } from "../../utils/seo";
import {
  CHOOSE_GUIDE_SLUG,
  ARTICLES,
  COMPANY_RECORD,
  PRODUCTS_HUB,
} from "../../utils/seoContent";

const CHOOSE_GUIDE_HREF = encodePath("Guide", CHOOSE_GUIDE_SLUG);
const BLOG_PROCESS = ARTICLES.process.href;

// Only what the company's own material states; see docs/seo/fact-check.md.
const STRENGTHS = [
  {
    title: "خط کامل تولید در داخل کشور",
    text: "تولید هولوگرام از طراحی تا برش و بسته‌بندی در خط تولید آذرهولوگرام در ایران انجام می‌شود؛ همین زمان چاپ و تحویل را کوتاه کرده است.",
    href: BLOG_PROCESS,
  },
  {
    title: "طراحی پیش از تولید",
    text: "طراحی اولیه در دست‌کم دو طرح ارائه می‌شود و تولید فقط پس از تأیید شما آغاز می‌شود.",
  },
  {
    title: "حفاظت از برند شما",
    text: "پیش از تولید هولوگرام اختصاصی، مدارک مالکیت برند بررسی می‌شود تا نام و نشان هیچ برندی بدون اجازه صاحب آن روی هولوگرام نرود.",
  },
  {
    title: "تنوع محصول و شکل تحویل",
    text: "هولوگرام تخریب‌شونده، شفاف، رنگی و بارکددار، نوار هولوگرام، هات‌استمپ کارت، لیبل‌های امنیتی، برچسب پلمپ و اسکرچ؛ با تحویل به‌صورت شیت، رول یا نوار.",
    href: encodePath(PRODUCTS_HUB),
  },
  {
    title: "شماره‌گذاری و کد",
    text: "شماره سریال چاپی برای تیراژ بالا و لیزری برای تیراژ پایین، به همراه بارکد و QR کد برای رهگیری و استعلام.",
  },
];

export default function ImageText() {
  return (
    <>
      <section className={`az-section container ${style.layout}`}>
        <div className={style.images}>
          {/* Stock photos, not the company's staff: decorative only. */}
          <Image
            src="/AboutImages/aboytgroup.png"
            alt=""
            width={996}
            height={664}
            sizes="(max-width: 992px) 50vw, 40vw"
            priority
          />
          <Image
            src="/AboutImages/aboutImage-person.png"
            alt=""
            width={996}
            height={664}
            sizes="(max-width: 992px) 50vw, 40vw"
          />
        </div>
        <div className={style.text}>
          <span className="az-eyebrow">چرا آذرهولوگرام</span>
          <h2 className="az-h2">
            بیش از یک دهه تولید هولوگرام امنیتی در ایران
          </h2>
          <p className="az-lead">
            خانه چاپ چکاوک، با نام تجاری آذرهولوگرام، هولوگرام امنیتی، لیبل
            هولوگرام و برچسب‌های امنیتی را با طرح اختصاصی تولید می‌کند. سایت
            شرکت از سال ۱۳۹۲ فعال است و آذرهولوگرام در سال ۲۰۱۶ در جوایز
            Excellence in Holography انجمن بین‌المللی تولیدکنندگان هولوگرام
            (IHMA) تقدیر شده و در نمایشگاه‌های drupa، دبی و Labelexpo Europe حضور
            داشته است.
          </p>
          <ul className={style.strengths}>
            {STRENGTHS.map((item) => (
              <li key={item.title}>
                <CheckCircleOutlineIcon aria-hidden="true" />
                <div>
                  <h3>
                    {item.href ? (
                      <Link href={item.href}>{item.title}</Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="az-muted">
            اگر هنوز نمی‌دانید کدام برچسب برای محصول شما مناسب است،{" "}
            <Link href={CHOOSE_GUIDE_HREF}>راهنمای انتخاب برچسب امنیتی</Link> را
            بخوانید یا با ما تماس بگیرید.
          </p>
        </div>
      </section>

      <section className="az-section az-section--soft">
        <div className="container">
          <span className="az-eyebrow">سوابق</span>
          <h2 className="az-h2">افتخارات و حضور بین‌المللی</h2>
          <ol className={style.record}>
            {COMPANY_RECORD.map((item) => (
              <li key={item.label}>
                <span className={style.recordYear}>{item.year}</span>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <p>{item.label}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="az-section az-section--dark">
        <div className={`container ${style.cta}`}>
          <div>
            <h2 className="az-h2">در مسیر امنیت ما در کنار شماییم.</h2>
            <p className="az-muted">
              پیشنهادات و نظراتتان را با ما در میان بگذارید.
            </p>
          </div>
          <Link href="/ContactUs" className="az-btn az-btn--primary">
            تماس با ما
          </Link>
        </div>
      </section>
    </>
  );
}
