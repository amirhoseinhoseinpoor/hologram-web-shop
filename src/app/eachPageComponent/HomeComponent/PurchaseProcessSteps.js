import React from "react";

import style from "../../Styles/HomeStyle/PurchaseProcessSteps.module.scss";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PurchaseProcessSteps() {
  return (
    // <section className={`${style.mainBackground} mt-5`}>
    //   <div className="container d-flex flex-column">
    //     <div className={`${style.responsiveDiv} d-flex flex-row`}>
    //       <div
    //         className={`${style.widthResizing} d-flex flex-column position-relative mt-3 justify-content-enenly`}
    //       >
    //         <h2 className={`${style.titleColor} title mb-2`}>
    //           فرایند ثبت سفارش <span>هولوگرام</span>
    //         </h2>
    //         <div className={style.marginbottom}>
    //           <p>
    //             بت سفارش هولوگرام، فرآیندی ساده و امن است. شما می‌توانید با چند
    //             کلیک ساده در وب‌سایت ما، سفارش خود را ثبت کنید.
    //           </p>
    //           <p>
    //             کارشناسان مجرب ما در تمام مراحل سفارش و پس از آن در کنار شما
    //             هستند تا به تمامی سوالات شما پاسخ دهند و بهترین خدمات را به شما
    //             ارائه دهند.
    //           </p>
    //         </div>
    //         <div className={style.phoneNumber}>
    //           <div className="d-flex flex-column">
    //             <div className="position-relative">
    //               <span>
    //                 ۰۲۱-<span className="title">۶۶۹۷۱۴۰۲-۵</span>
    //               </span>
    //               <Box
    //                 className={style.Arrow}
    //                 component="img"
    //                 sx={{
    //                   width: 138,
    //                   maxHeight: 57,
    //                 }}
    //                 alt="slieds"
    //                 src="/HomeImages/PurchuseArrow.png"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={`${style.widthResizing} d-flex flex-row`}>
    //         <div
    //           className={`${style.box1} ${style.widthResizing} position-relative`}
    //         >
    //           <Box
    //             className={style.bux1Icon}
    //             component="img"
    //             sx={{
    //               width: 100,
    //               maxHeight: 100,
    //             }}
    //             alt="tic"
    //             src="/HomeImages/pur-box1.png"
    //           />
    //           <div className={`${style.margin} container`}>
    //             <span className={style.numberStyle}>01</span>
    //             <h4 className={style.boxTextSize}>
    //               ارسال مدارک و تایید احراز هویت فرد حقیقی و حقوقی
    //             </h4>
    //           </div>
    //         </div>
    //         <div
    //           className={`${style.box1} ${style.widthResizing} position-relative`}
    //         >
    //           <Box
    //             className={style.bux1Icon}
    //             component="img"
    //             sx={{
    //               width: 100,
    //               maxHeight: 100,
    //             }}
    //             alt="tic"
    //             src="/HomeImages/pur-box2.png"
    //           />
    //           <div className={`${style.margin} container`}>
    //             <span className={style.numberStyle}>02</span>
    //             <h4 className={style.boxTextSize}>
    //               انتخاب هولوگرام متناسب با نیاز شما
    //             </h4>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className={`${style.responsiveDiv} d-flex flex-row`}>
    //       <div className={`${style.widthResizing} d-flex flex-row`}>
    //         <div
    //           className={`${style.box1} ${style.widthResizing} position-relative`}
    //         >
    //           <Box
    //             className={style.bux1Icon}
    //             component="img"
    //             sx={{
    //               width: 100,
    //               maxHeight: 100,
    //             }}
    //             alt="tic"
    //             src="/HomeImages/pur-box3.png"
    //           />
    //           <div className={`${style.margin} container`}>
    //             <span className={style.numberStyle}>03</span>
    //             <h4 className={style.boxTextSize}>
    //               ارسال مدارک و تایید احراز هویت فرد حقیقی و حقوقی
    //             </h4>
    //           </div>
    //         </div>
    //         <div
    //           className={`${style.box1} ${style.widthResizing} position-relative`}
    //         >
    //           <Box
    //             className={style.bux1Icon}
    //             component="img"
    //             sx={{
    //               width: 100,
    //               maxHeight: 100,
    //             }}
    //             alt="tic"
    //             src="/HomeImages/pur-box4.png"
    //           />
    //           <div className={`${style.margin} container`}>
    //             <span className={style.numberStyle}>04</span>
    //             <h4 className={style.boxTextSize}>
    //               انتخاب هولوگرام متناسب با نیاز شما
    //             </h4>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={`${style.widthResizing}  d-flex flex-row`}>
    //         <div
    //           className={`${style.box1} ${style.widthResizing} position-relative`}
    //         >
    //           <Box
    //             className={style.bux1Icon}
    //             component="img"
    //             sx={{
    //               width: 100,
    //               maxHeight: 100,
    //             }}
    //             alt="tic"
    //             src="/HomeImages/pur-box5.png"
    //           />
    //           <div className={`${style.margin} container`}>
    //             <span className={style.numberStyle}>05</span>
    //             <h4 className={style.boxTextSize}>
    //               ارسال مدارک و تایید احراز هویت فرد حقیقی و حقوقی
    //             </h4>
    //           </div>
    //         </div>
    //         <div
    //           className={`${style.box1} ${style.widthResizing} position-relative`}
    //         >
    //           <Box
    //             className={style.bux1Icon}
    //             component="img"
    //             sx={{
    //               width: 100,
    //               maxHeight: 100,
    //             }}
    //             alt="tic"
    //             src="/HomeImages/pur-box6.png"
    //           />
    //           <div className={`${style.margin} container`}>
    //             <span className={style.numberStyle}>06</span>
    //             <h4 className={style.boxTextSize}>
    //               انتخاب هولوگرام متناسب با نیاز شما
    //             </h4>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="mt-5 mb-5 container">
      <div>
        <h2 className={`${style.titleColor} title mb-2`}>
          محصولات متنوع <span>آذرهولوگرام</span>
        </h2>
      </div>
      <div className={`${style.mainSizez} mt-4`}>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/هولوگرام`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage}  gap-3`}
              component="img"
              image={`/HomeImages/typeazar1.jpg`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                هولوگرام
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/لیبل‌های امنیتی`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage}  gap-3`}
              component="img"
              image={`/HomeImages/typeazar2.png`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                لیبل
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/برچسب‌های پلمپ`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage}  gap-3`}
              component="img"
              image={`/HomeImages/typeazar3.png`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                لیبل هولوگرام
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/اسکرچ`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage} `}
              component="img"
              image={`/HomeImages/typeazar4.png`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                اسکرچ
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </div>
    </section>
  );
}
