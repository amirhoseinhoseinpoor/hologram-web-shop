import Link from "next/link";
import Guilloche from "../Components/ui/Guilloche";
import { COMPANY } from "../utils/company";
import style from "../Styles/Login/AuthLayout.module.scss";

const POINTS = [
  "ثبت استعلام قیمت برای هر محصول",
  "پیگیری مرحله‌به‌مرحله سفارش",
  "گفت‌وگوی مستقیم با کارشناس طراحی",
];

// Split screen: brand panel beside the form. The panel hides on small screens.
export default function AuthLayout({ children }) {
  return (
    <div className={style.layout}>
      <aside className={style.brandPanel}>
        <Guilloche className={style.motif} />
        <Link href="/" className={style.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COMPANY.logo} alt="" width={48} height={48} />
          {COMPANY.name}
        </Link>
        <div className={style.brandBody}>
          <h2 className="az-h1">حساب کاربری آذرهولوگرام</h2>
          <ul>
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <a href={COMPANY.phoneHref} className={style.phone}>
          پشتیبانی: {COMPANY.phoneLabel}
        </a>
      </aside>
      <main className={style.formArea}>{children}</main>
    </div>
  );
}
