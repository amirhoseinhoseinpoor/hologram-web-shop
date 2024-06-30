import React from 'react';

import style from '../Styles/HomeStyle/Intro-Secure.module.scss'
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
export default function IntroSecure() {
  return (
    <section className="container mt-4 mb-4">
      <div className={`${style.mainDivResponsive} d-flex flex-row`}>
        <div className={style.imageStyle}>
        <Box
         component="img"
         sx={{
          width: '100%', 
          height : '100%',
          objectFit: 'cover',
        }}
          alt="image."
          src="/HomeImages/Intro-image.png"
        /> 
        </div>
        <div className={`${style.responsiveMarginText} ${style.textStyle} d-flex flex-column container justify-content-evenly`}>
            <div className="title mb-1">
              <span>انواع افکت‌های <span className={style.titleColor}>امنیتی</span></span>
            </div>
            <div>
                <p className="subtitle">در دنیای پر آشوب جعل و تقلب، هولوگرام‌ها به مثابه گارد‌های نامرئی عمل می‌کنند و با ظرافت و دقت، اصالت و کیفیت را تضمین می‌کنند. هولوگرام‌ها قابل شخصی‌سازی هستند با درج لوگو، تصاویر یا کدهای منحصر به فرد، هولوگرام‌ها به مهر تأیید اصالت محصول تبدیل می‌شوند.</p>
            </div>
            <div>
                <button className={`${style.buttonPclass} d-flex flex-row align-items-center mt-2`}>
                    <div>
                        معرفی محصولات
                    </div>
                   <ArrowBackIcon className="me-2"/>    
                </button>
            </div>
        </div>
      </div>
      <div className={`${style.rowBackground} d-flex flex-row`}>
        <div className={`${style.rowBox} d-flex flex-column`}>
            <div>
              <SecurityIcon/>
            </div>
            <h4>سطح 100 امنیت</h4>
            <p className="discription">معمای امنیتی با ظرافت‌های غیرقابل تکرار</p>
        </div>
        <div className={`${style.rowBox} d-flex flex-column`}>
            <div>
                <SecurityIcon/>
            </div>
            <h4>نفوذپذیری صفر</h4>
            <p className="discription">نفوذناپذیر در برابر روش‌های معمول جعل</p>

        </div>
        <div className={`${style.rowBox} d-flex flex-column`}>
            <div>
              <SecurityIcon/>
            </div>
            <h4>نفوذپذیری صفر</h4>
            <p className="discription">نفوذناپذیر در برابر روش‌های معمول جعل</p>

        </div>
      </div>
    </section>
  );
}
