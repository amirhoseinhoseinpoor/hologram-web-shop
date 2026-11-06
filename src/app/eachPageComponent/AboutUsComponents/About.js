import Image from "next/image";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import style from "../../Styles/AboutUsStyle/About.module.scss";
import { COMPANY_RECORD } from "../../utils/seoContent";

const STRENGTHS = [
  {
    title: "کاهش زمان",
    text: "به دلیل دارا بودن خط تولید کامل در داخل کشور، زمان چاپ و فروش هولوگرام به حداقل ممکن رسیده است.",
  },
  {
    title: "امنیت بالا",
    text: "با استفاده از پیشرفته‌ترین تکنولوژی‌های روز دنیا، هولوگرام‌های تولیدی آذرهولوگرام از بالاترین سطح امنیت برخوردارند.",
  },
  {
    title: "کیفیت عالی",
    text: "آذرهولوگرام با بهره‌گیری از مواد اولیه مرغوب و تجهیزات پیشرفته، هولوگرام‌هایی با کیفیت و ظاهری زیبا و چشم‌نواز ارائه می‌دهد.",
  },
  {
    title: "تنوع محصولات",
    text: "آذرهولوگرام طیف گسترده‌ای از محصولات هولوگرامی را به مشتریان خود عرضه می‌کند و می‌تواند نیازهای مختلف آن‌ها را برآورده سازد.",
  },
  {
    title: "خدمات پس از فروش",
    text: "آذرهولوگرام با ارائه خدمات پس از فروش به مشتریان خود، تجربه‌ای رضایت‌بخش را برای آن‌ها به ارمغان می‌آورد.",
  },
];

export default function ImageText() {
  return (
    <>
      <section className={`az-section container ${style.layout}`}>
        <div className={style.images}>
          <Image
            src="/AboutImages/aboytgroup.png"
            alt="تیم آذرهولوگرام"
            width={996}
            height={664}
            sizes="(max-width: 992px) 50vw, 40vw"
            priority
          />
          <Image
            src="/AboutImages/aboutImage-person.png"
            alt="کارشناس آذرهولوگرام"
            width={996}
            height={664}
            sizes="(max-width: 992px) 50vw, 40vw"
          />
        </div>
        <div className={style.text}>
          <span className="az-eyebrow">چرا آذرهولوگرام</span>
          <h2 className="az-h2">تجربه، تجهیزات و خط تولید کامل در داخل کشور</h2>
          <p className="az-lead">
            خانه چاپ چکاوک، با نام تجاری آذرهولوگرام، پیشرو در ارائه خدمات چاپ
            هولوگرام، لیبل هولوگرام و محصولات مرتبط در ایران است. تجهیزات پیشرفته
            و به‌روز، به همراه تخصص و تجربه کارکنان آذرهولوگرام، این شرکت را به
            انتخابی ایده‌آل برای تمامی نیازهای شما در زمینه هولوگرام تبدیل کرده
            است.
          </p>
          <ul className={style.strengths}>
            {STRENGTHS.map((item) => (
              <li key={item.title}>
                <CheckCircleOutlineIcon aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="az-muted">
            با انتخاب آذرهولوگرام، می‌توانید از امن‌ترین، باکیفیت‌ترین و زیباترین
            هولوگرام‌ها برای برند و محصولات خود استفاده کنید و خیالی آسوده از
            اصالت و امنیت آن‌ها داشته باشید.
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
