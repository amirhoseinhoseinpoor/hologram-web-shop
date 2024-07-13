"use client";

import style from "../Styles/MainStyle/Footer.module.scss";
import Box from "@mui/material/Box";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CallIcon from "@mui/icons-material/Call";
import Link from "next/link";
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={`${style.mainColor} position-relative`}>
      {/* upward arrow */}
      <div className={`text-center ${style.alignUpwardArrow}`}>
        <button className="border-0" onClick={scrollToTop}>
          <div className={style.upwardArrowInner}>
            <ArrowUpwardIcon
              className={style.footerUpwardArrow}
            ></ArrowUpwardIcon>
          </div>
        </button>
      </div>
      {/* picture box */}
      <div className={`row mt-2 ${style.responsiveRow}`}>
        <div
          className={`col-3 d-flex flex-column ${style.responsivepictureperson}`}
        >
          <div
            className={`${style.footertopperson} ${style.textFooter} p-3 position-relative`}
          >
            <div className={`${style.imagefooterrsb} d-block d-lg-none`}>
              <Box
                className={style.FCB}
                component="img"
                sx={{
                  width: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  aspectRatio: 1.2,
                }}
                alt="a man"
                src="/HomeImages/person.png"
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <p>
                پشتیبان‌های ما همه روزه در ساعت‌های اداری آماده پاسخگو سوالات
                شما هستند.
              </p>
              <div className={`d-flex flex-row ${style.footernumberflexrp}`}>
                <p className="mt-2">
                  <span className="fs-6">۰۲۱-</span>
                  <span className="fs-5">۶۶۹۷۱۴۰۲-۵</span>
                </p>
                <a href="#">
                  <div className={style.phonecallfooterdiv}>
                    <div>
                      <CallIcon></CallIcon>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className={`${style.imagefooterrsb} d-none d-lg-block`}>
            <Box
              className={style.FCB}
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: 0.8,
              }}
              alt="a man"
              src="/HomeImages/person.png"
            />
          </div>
        </div>
        <div className={`col-9 ${style.responsiveRow}`}>
          <div
            className={`d-flex flex-row ${style.responsivetext} ${style.responsivelogo} `}
          >
            <div
              className={`bg-light mb-3 w-50 ${style.responsivetext} ${style.footerlogo}`}
            >
              <p>لوگو</p>
            </div>
            <div className={`p-1 mb-2 w-50  ${style.responsivetext}`}>
              <p>
                شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام ، به دلیل دارا بودن
                خط کامل تولید هولوگرام در داخل کشور با بالاترین سطح امنیتى موجود
                زمان چاپ هولوگرام و فروش هولوگرام به کم ترین زمان کاهش پیدا کرده
                است.
              </p>
            </div>
          </div>
          {/* product */}
          <div className={`d-flex flex-row ${style.responsiveRow}`}>
            <div
              className={`d-flex flex-row justify-content-around w-50 ${style.responsivetext} ${style.productmobilers} `}
            >
              <div>
                <p className="mb-2">محصولات</p>
                <p className="mb-2">هولوگرام</p>
                <p className="mb-2">لیبل‌های امنیتی</p>
                <p className="mb-2">برچسب‌های پلمپ</p>
                <p className="mb-2">اسکرچ</p>
              </div>
              <div className={style.footerLinksstyle}>
                
                  <p className="mb-2">لینک‌های مفید</p>
                
                <Link href="/">
                  <p className="mb-2">معرفی هولگرام‌ها</p>
                </Link>
                <Link href="/AboutUs">
                  <p className="mb-2">درباره‌ی ما</p>
                </Link>
                <Link href="/ContactUs">
                  <p className="mb-2">تماس با ما</p>
                </Link>
                <Link href="/Honors">
                  <p className="mb-2">افتخارات</p>
                </Link>
                <Link href="/Blog">
                  <p className="mb-2">مقالات</p>
                </Link>
                <Link href="/Exhibition">
                  <p className="mb-2">نمیشگاه‌ها</p>
                </Link>
              </div>
            </div>
            {/* social media */}
            <div className={`w-50 ${style.responsivetext}`}>
              <div className="p-1 mb-2">
                <h3>راه‌های ارتباطی</h3>
              </div>
              <div className="p-1 mb-2">
                <span>آدرس : </span>
                <span>
                  تهران، میدان فلسطین، خیابان فلسطین جنوبی،خیابان بزرگمهر غربی،
                  نبش کوچه حکمت، پلاک یک، طبقه ششم
                </span>
              </div>
              <div className="p-1 mb-2">
                <span>ایمیل : </span>
                <span>info@azarhologram.co</span>
              </div>
              <div className="p-1 mb-2">
                <span>فکس : </span>
                <span>۶۶۹۷۱۴۰۵</span>
              </div>
              <div className="p-1 mb-2">
                <span>شبکه‌های اجتماعی:</span>
                <span className={style.test}>
                  <a href="#">
                    <WhatsAppIcon></WhatsAppIcon>
                  </a>
                  <a href="#">
                    <TelegramIcon></TelegramIcon>
                  </a>
                  <a href="#">
                    <InstagramIcon></InstagramIcon>
                  </a>
                  <a href="#">
                    <LinkedInIcon></LinkedInIcon>
                  </a>
                </span>
              </div>
            </div>
          </div>
          {/* trust-logo */}
          <div className="d-flex flex-row justify-content-around w-50 mt-2 mb-2">
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                maxHeight: "90px",
              }}
              alt="logo"
              src="/HomeImages/footer-brand-1.png"
            />
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                maxHeight: "90px",
              }}
              alt="logo"
              src="/HomeImages/footer-brand-2.png"
            />
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                maxHeight: "90px",
              }}
              alt="logo"
              src="/HomeImages/footer-brand-3.png"
            />
          </div>
        </div>

        <p className="text-center mt-4">
          تمام حقوق اين وب‌سايت نیز برای شرکت آذر هولوگرام است.
        </p>
      </div>
    </section>
  );
}
