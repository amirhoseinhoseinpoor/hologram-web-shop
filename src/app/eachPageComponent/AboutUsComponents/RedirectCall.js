import style from "../../Styles/AboutUsStyle/RedirectCall.module.scss";
import Link from "next/link";
export default function RedirectCall() {
  return (
    <section className={`container`}>
      <div className={style.mainbackground}>
        <div className="d-flex flex-column">
          <p className={`${style.firstBibFont} mb-2`}>
            در مسیر امنیت ما در کنار شماییم.
          </p>
          <p className={`${style.firstBibFont} mb-3`}>
            پیشنهادات و نظراتتان را با ما درمیان بگذارید.
          </p>
          <Link className={style.linkButton} href="/ContactUs" passHref>
            <button className={`${style.button}`} type="button">
              تماس با ما
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
