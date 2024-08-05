
import style from "../Styles/MainStyle/Footer.module.scss";
import Box from "@mui/material/Box";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

import Link from "next/link";
export default function Footer() {
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <section className={`${style.mainColor} position-relative`}>
      {/* upward arrow */}
      <div className={`text-center ${style.alignUpwardArrow}`}>
        <a href="#" className="border-0" >
          <div className={style.upwardArrowInner}>
            <Box sx={{ width: 25, height: 25 }}>
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.0929 12.7593L15.9996 4.66602L7.90625 12.7593"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 27.3326V4.89258"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </div>
        </a>
      </div>
      {/* picture box */}
      <div className={`row pt-5 mt-2 ${style.responsiveRow}`}>
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
                      {/* <CallIcon></CallIcon> */}
                      <Box>
                        <svg
                          width={22}
                          height={22}
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.97 17.33C20.97 17.69 20.89 18.06 20.72 18.42C20.55 18.78 20.33 19.12 20.04 19.44C19.55 19.98 19.01 20.37 18.4 20.62C17.8 20.87 17.15 21 16.45 21C15.43 21 14.34 20.76 13.19 20.27C12.04 19.78 10.89 19.12 9.75 18.29C8.6 17.45 7.51 16.52 6.47 15.49C5.44 14.45 4.51 13.36 3.68 12.22C2.86 11.08 2.2 9.94 1.72 8.81C1.24 7.67 1 6.58 1 5.54C1 4.86 1.12 4.21 1.36 3.61C1.6 3 1.98 2.44 2.51 1.94C3.15 1.31 3.85 1 4.59 1C4.87 1 5.15 1.06 5.4 1.18C5.66 1.3 5.89 1.48 6.07 1.74L8.39 5.01C8.57 5.26 8.7 5.49 8.79 5.71C8.88 5.92 8.93 6.13 8.93 6.32C8.93 6.56 8.86 6.8 8.72 7.03C8.59 7.26 8.4 7.5 8.16 7.74L7.4 8.53C7.29 8.64 7.24 8.77 7.24 8.93C7.24 9.01 7.25 9.08 7.27 9.16C7.3 9.24 7.33 9.3 7.35 9.36C7.53 9.69 7.84 10.12 8.28 10.64C8.73 11.16 9.21 11.69 9.73 12.22C10.27 12.75 10.79 13.24 11.32 13.69C11.84 14.13 12.27 14.43 12.61 14.61C12.66 14.63 12.72 14.66 12.79 14.69C12.87 14.72 12.95 14.73 13.04 14.73C13.21 14.73 13.34 14.67 13.45 14.56L14.21 13.81C14.46 13.56 14.7 13.37 14.93 13.25C15.16 13.11 15.39 13.04 15.64 13.04C15.83 13.04 16.03 13.08 16.25 13.17C16.47 13.26 16.7 13.39 16.95 13.56L20.26 15.91C20.52 16.09 20.7 16.3 20.81 16.55C20.91 16.8 20.97 17.05 20.97 17.33Z"
                            stroke="#333333"
                            strokeWidth="1.5"
                            strokeMiterlimit={10}
                          />
                        </svg>
                      </Box>
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
                <Link href="/هولوگرام" passHref style={{textDecoration:"none" , color:"#333333"}}>
                  <p className="mb-2">هولوگرام</p>
                </Link>
                <Link href="/لیبل‌های امنیتی" passHref style={{textDecoration:"none" , color:"#333333"}}>  
                 <p className="mb-2">لیبل‌های امنیتی</p>
                </Link>
                <Link href="/برچسب‌های پلمپ" passHref style={{textDecoration:"none" , color:"#333333"}}>
                  <p className="mb-2">برچسب‌های پلمپ</p>
                </Link>
                <Link href="/اسکرچ" passHref style={{textDecoration:"none" , color:"#333333"}}>
                  <p className="mb-2">اسکرچ</p>
                </Link>
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
              <div className="d-flex align-items-center flex-row p-1 mb-2">
                <span>شبکه‌های اجتماعی:</span>
                <span
                  className={`${style.test} d-flex align-items-center flrx-row`}
                >
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
                    <Box
                      sx={{
                        width: 37,
                        height: 37,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                      }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.60001 16H0.199997V5.3H3.60001V16ZM1.9 3.8C0.800002 3.8 0 3 0 1.9C0 0.8 0.900002 0 1.9 0C3 0 3.8 0.8 3.8 1.9C3.8 3 3 3.8 1.9 3.8ZM16 16H12.6V10.2C12.6 8.5 11.9 8 10.9 8C9.89999 8 8.89999 8.8 8.89999 10.3V16H5.5V5.3H8.7V6.8C9 6.1 10.2 5 11.9 5C13.8 5 15.8 6.1 15.8 9.4V16H16Z"
                          fill="#333333"
                        />
                      </svg>
                    </Box>
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
