import Link from "next/link";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import style from "../Styles/MainStyle/Footer.module.scss";
import ShowVersionServer from "./ShowVersionServer";
import { COMPANY } from "../utils/company";

const PRODUCT_LINKS = [
  { href: "/هولوگرام", label: "هولوگرام" },
  { href: "/لیبل‌های امنیتی", label: "لیبل‌های امنیتی" },
  { href: "/برچسب‌های پلمپ", label: "برچسب‌های پلمپ" },
  { href: "/اسکرچ", label: "اسکرچ" },
];

const COMPANY_LINKS = [
  { href: "/AboutUs", label: "درباره ما" },
  { href: "/ContactUs", label: "تماس با ما" },
  { href: "/Honors", label: "افتخارات" },
  { href: "/Blog", label: "مقالات" },
  { href: "/Exhibition", label: "نمایشگاه‌ها" },
];

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={`container ${style.grid}`}>
        <div className={style.brandColumn}>
          <div className={style.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COMPANY.logo} alt={COMPANY.name} width={232} height={46} />
          </div>
          <p className={style.intro}>{COMPANY.intro}</p>
        </div>

        <nav aria-label="محصولات">
          <h2 className={style.heading}>محصولات</h2>
          <ul className={style.links}>
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="لینک‌های مفید">
          <h2 className={style.heading}>لینک‌های مفید</h2>
          <ul className={style.links}>
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={style.heading}>راه‌های ارتباطی</h2>
          <p className={style.support}>
            پشتیبان‌های ما همه روزه در ساعت‌های اداری آماده پاسخگویی به سوالات
            شما هستند.
          </p>
          <ul className={style.contact}>
            <li>
              <CallOutlinedIcon aria-hidden="true" />
              <a href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a>
            </li>
            <li>
              <PrintOutlinedIcon aria-hidden="true" />
              <span>فکس: {COMPANY.fax}</span>
            </li>
            <li>
              <MailOutlineIcon aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
            <li>
              <PlaceOutlinedIcon aria-hidden="true" />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={style.bottomLine}>
        <div className={`container ${style.bottom}`}>
          <p>تمام حقوق این وب‌سایت برای شرکت آذرهولوگرام محفوظ است.</p>
          <div className={style.bottomEnd}>
            <ShowVersionServer />
            <a href="#" className={style.toTop}>
              بازگشت به بالا
              <ArrowUpwardIcon aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
