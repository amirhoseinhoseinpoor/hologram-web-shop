import Link from "next/link";
import MainLayout from "./layouts/MainLayout";
import Guilloche from "./Components/ui/Guilloche";
import style from "./Components/home/Home.module.scss";

export const metadata = {
  title: "صفحه پیدا نشد",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <MainLayout>
      <section className={style.cta}>
        <div className="container">
          <div className={style.ctaCard}>
            <Guilloche className={style.ctaMotif} />
            <div className={style.ctaBody}>
              <div>
                <h1 className="az-h1">صفحه‌ای که دنبالش هستید پیدا نشد</h1>
                <p>
                  ممکن است نشانی تغییر کرده باشد. از صفحه اصلی به محصولات دسترسی
                  دارید.
                </p>
              </div>
              <Link href="/" className="az-btn az-btn--primary">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
