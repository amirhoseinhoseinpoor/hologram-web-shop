
import Box from "@mui/material/Box";
import style from "../../Styles/ContactUsStyle/Address.module.scss";

export default function Address() {
  return (
    <section className={`${style.mainBackground} mt-5 container pt-3 pb-3`}>
      <div className={`${style.responsiveBreak} d-flex flex-row gap-3`}>
        <div className={`${style.responsiveMain} d-flex flex-column`}>
          <div>
            <p className="title">راه‌های ارتباطی</p>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={style.CallIconDiv}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.955 26.6928C31.955 27.2441 31.835 27.8106 31.58 28.3619C31.325 28.9131 30.995 29.4338 30.56 29.9238C29.825 30.7506 29.015 31.3478 28.1 31.7306C27.2 32.1134 26.225 32.3125 25.175 32.3125C23.645 32.3125 22.01 31.945 20.285 31.1947C18.56 30.4444 16.835 29.4338 15.125 28.1628C13.4 26.8766 11.765 25.4525 10.205 23.8753C8.66 22.2828 7.265 20.6138 6.02 18.8681C4.79 17.1225 3.8 15.3769 3.08 13.6466C2.36 11.9009 2 10.2319 2 8.63937C2 7.59812 2.18 6.60281 2.54 5.68406C2.9 4.75 3.47 3.8925 4.265 3.12688C5.225 2.16219 6.275 1.6875 7.385 1.6875C7.805 1.6875 8.225 1.77938 8.6 1.96313C8.99 2.14688 9.335 2.4225 9.605 2.82063L13.085 7.82781C13.355 8.21063 13.55 8.56281 13.685 8.89969C13.82 9.22125 13.895 9.54281 13.895 9.83375C13.895 10.2013 13.79 10.5687 13.58 10.9209C13.385 11.2731 13.1 11.6406 12.74 12.0081L11.6 13.2178C11.435 13.3862 11.36 13.5853 11.36 13.8303C11.36 13.9528 11.375 14.06 11.405 14.1825C11.45 14.305 11.495 14.3969 11.525 14.4887C11.795 14.9941 12.26 15.6525 12.92 16.4488C13.595 17.245 14.315 18.0566 15.095 18.8681C15.905 19.6797 16.685 20.43 17.48 21.1191C18.26 21.7928 18.905 22.2522 19.415 22.5278C19.49 22.5584 19.58 22.6044 19.685 22.6503C19.805 22.6962 19.925 22.7116 20.06 22.7116C20.315 22.7116 20.51 22.6197 20.675 22.4513L21.815 21.3028C22.19 20.92 22.55 20.6291 22.895 20.4453C23.24 20.2309 23.585 20.1237 23.96 20.1237C24.245 20.1237 24.545 20.185 24.875 20.3228C25.205 20.4606 25.55 20.6597 25.925 20.92L30.89 24.5184C31.28 24.7941 31.55 25.1156 31.715 25.4984C31.865 25.8812 31.955 26.2641 31.955 26.6928Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                  />
                </svg>
              </Box>
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>
                شماره تماس:
              </p>
              <p className="purchesSize">۵ الی ۰۲۱۶۶۹۷۱۴۰۲</p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={style.CallIconDiv}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.43054 12.735C8.38554 -0.254997 27.6305 -0.239996 30.5705 12.75C32.2955 20.37 27.5555 26.82 23.4005 30.81C20.3855 33.72 15.6155 33.72 12.5855 30.81C8.44554 26.82 3.70554 20.355 5.43054 12.735Z"
                    stroke="white"
                    strokeWidth={3}
                  />
                  <path
                    d="M18.0003 20.1452C20.585 20.1452 22.6803 18.0498 22.6803 15.4652C22.6803 12.8805 20.585 10.7852 18.0003 10.7852C15.4156 10.7852 13.3203 12.8805 13.3203 15.4652C13.3203 18.0498 15.4156 20.1452 18.0003 20.1452Z"
                    stroke="white"
                    strokeWidth={3}
                  />
                </svg>
              </Box>
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>آدرس:</p>
              <p className="purchesSize">
                تهران، میدان فلسطین،خیابان فلسطین جنوبی، خیابان بزرگمهر غربی،
                نبش کوچه حکمت، پلاک یک، طبقه ششم
              </p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={`${style.CallIconDiv}`}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 36 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5 32.0156H10.5C6 32.0156 3 29.7188 3 24.3594V13.6406C3 8.28125 6 5.98438 10.5 5.98438H25.5C30 5.98438 33 8.28125 33 13.6406V24.3594C33 29.7188 30 32.0156 25.5 32.0156Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.5 14.4062L20.805 18.2344C19.26 19.49 16.725 19.49 15.18 18.2344L10.5 14.4062"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>ایمیل:</p>
              <p className="purchesSize">info@azarhologram.co</p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={`${style.CallIconDiv}`}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 36 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33 19C33 27.4525 26.28 34.3125 18 34.3125C9.72 34.3125 3 27.4525 3 19C3 10.5475 9.72 3.6875 18 3.6875C26.28 3.6875 33 10.5475 33 19Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23.5653 23.8697L18.9153 21.0369C18.1053 20.5469 17.4453 19.3678 17.4453 18.4031V12.125"
                    stroke="white"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>
                ساعت کاری:
              </p>
              <p className="purchesSize">همه روزه 7 الی 18</p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={`${style.CallIconDiv}`}>
              <Box
               sx={{
                width: 25,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
                <svg
                  viewBox="0 0 36 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.875 11.3438H25.125V8.28125C25.125 5.21875 24 3.6875 20.625 3.6875H15.375C12 3.6875 10.875 5.21875 10.875 8.28125V11.3438Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 23.5938V29.7188C24 32.7812 22.5 34.3125 19.5 34.3125H16.5C13.5 34.3125 12 32.7812 12 29.7188V23.5938H24Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31.5 15.9375V23.5938C31.5 26.6562 30 28.1875 27 28.1875H24V23.5938H12V28.1875H9C6 28.1875 4.5 26.6562 4.5 23.5938V15.9375C4.5 12.875 6 11.3438 9 11.3438H27C30 11.3438 31.5 12.875 31.5 15.9375Z"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.5 23.5938H23.685H10.5"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 17.4688H15"
                    stroke="white"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>فکس:</p>
              <p className="purchesSize">۶۶۹۷۱۴۰۵</p>
            </div>
          </div>
        </div>
        <div className={`${style.responsiveMain} d-flex flex-column`}>
          <div>
            <p className="title">آدرس ما</p>
          </div>
          <div className="h-100 mt-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3239.9064675876466!2d51.40370990213015!3d35.703919218164344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQyJzEzLjAiTiA1McKwMjQnMDYuOCJF!5e0!3m2!1sfa!2s!4v1720280623034!5m2!1sfa!2s"
              style={{
                border: 0,
                height: "100%",
                width: "100%",
                borderRadius: "4px",
                minHeight: "260px",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
