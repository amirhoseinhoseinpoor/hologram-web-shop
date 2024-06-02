'use client'

import "./Styles/footer.scss"
import Box from '@mui/material/Box';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CallIcon from '@mui/icons-material/Call';
export default function Footer(){
 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  return(
    <section className="main-color">
        {/* upward arrow */}
        <div className="text-center align-upward-arrow">
          <button className="border-0" onClick={scrollToTop}>
            <div className="footer-upward-arrow-inner-div">
              <ArrowUpwardIcon className="footer-upward-arrow"></ArrowUpwardIcon>
            </div>  
          </button>
        </div>
        {/* picture box */}
        <div className="row p-4 responsive-row">
            <div className="col-3 d-flex flex-column responsive-picture-person">
                <div className="footer-top-person p-3 text-footer-rs-p position-relative ">
                    <div className="image-footer-rs-b d-block d-lg-none">
                      <Box className="f-c-b"
                        component="img"
                        sx={{
                            width: '100%', // Ensures responsiveness
                            maxHeight: 200, // Set a maximum height (optional)
                            objectFit: 'contain',
                            aspectRatio : 0.8
                        }}
                        alt="a man"
                        src="/HomeImages/person.png"
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <p>شتیبان‌های ما همه روزه در ساعت‌های اداری آماده پاسخگو سوالات شما هستند.</p>
                      <div className="d-flex flex-row footer-number-flex-rp">
                         <p className="mt-2"><span className="fs-6">۰۲۱-</span><span className="fs-5">۶۶۹۷۱۴۰۲-۵</span></p>
                         <a href="#">
                           <div className="phonecall-footer-div">
                             <div>
                               <CallIcon></CallIcon>
                             </div>
                           </div>
                         </a>
                         
                         
                      </div>
                    </div>
                    
                </div>
                <div className="image-footer-rs-b d-none d-lg-block">
                  <Box className="f-c-b"
                    component="img"
                    sx={{
                        width: '100%', // Ensures responsiveness
                        maxHeight: 200, // Set a maximum height (optional)
                        objectFit: 'cover',
                        aspectRatio : 0.8
                    }}
                    alt="a man"
                    src="/HomeImages/person.png"
                  />
                </div>
            </div>
         <div className="col-9 responsive-row">
            <div className="d-flex flex-row responsive-text responsive-logo">
                <div className="footer-logo bg-light mb-3 w-50 responsive-text">
                    <p>لوگو</p>
                </div>
                <div className="p-1 mb-2 w-50  responsive-text">
                 <p>شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام ، به دلیل دارا بودن خط کامل تولید هولوگرام در داخل کشور با بالاترین سطح امنیتى موجود زمان چاپ هولوگرام و فروش هولوگرام به کم ترین زمان کاهش پیدا کرده است.</p>
                </div>
            </div>
             {/* product */}
            <div className="d-flex flex-row responsive-row">
             <div className="d-flex flex-row justify-content-around w-50 responsive-text">
                     <div>
                         <p className="mb-2">محصولات</p>
                         <p className="mb-2">سردسته 1</p>
                         <p className="mb-2">سردسته 2</p>
                         <p className="mb-2">سردسته 3</p>
                         <p className="mb-2">سردسته 4</p>
                         <p className="mb-2">سردسته 5</p>
                         <p className="mb-2">سردسته 6</p>
                     </div>
                     <div>
                         <p className="mb-2">لینک‌های مفید</p>
                         <p className="mb-2">معرفی هولگرام‌ها</p>
                         <p className="mb-2">درباره‌ی ما</p>
                         <p className="mb-2">تماس با ما</p>
                         <p className="mb-2">افتخارات</p>
                         <p className="mb-2">مقالات</p>
                         <p className="mb-2">نمیشگاه‌ها</p>
                     </div>
                 </div>
                 {/* social media */}
                 <div className="w-50 responsive-text">
                   <div className="p-1 mb-2">
                       <h3>راه‌های ارتباطی</h3>
                   </div>
                   <div className="p-1 mb-2">
                       <span>آدرس :  </span>
                       <span>تهران، میدان فلسطین، خیابان فلسطین جنوبی،خیابان بزرگمهر غربی، نبش کوچه حکمت، پلاک یک، طبقه ششم</span>
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
                       <span className="test">
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
                <div className="d-flex flex-row justify-content-between w-50 mt-2 mb-2">
                    <Box
                     component="img"
                     sx={{
                        objectFit : 'contain',
                        maxHeight : '100px'
                     }}
                     alt="logo"
                     src="/HomeImages/footer-brand-1.png"
                    />
                    <Box
                     component="img"
                     sx={{
                        objectFit : 'contain',
                        maxHeight : '100px'
                     }}
                     alt="logo"
                     src="/HomeImages/footer-brand-2.png"
                    />
                    <Box
                     component="img"
                     sx={{
                        objectFit : 'contain',
                        maxHeight : '100px'
                     }}
                     alt="logo"
                     src="/HomeImages/footer-brand-3.png"
                    />
                </div>
            </div>

            <p className="text-center mt-4">تمام حقوق اين وب‌سايت نیز برای شرکت آذر هولوگرام است.</p>
        </div>
    </section>
  )
}