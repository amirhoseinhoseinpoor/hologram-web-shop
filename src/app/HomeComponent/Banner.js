'use client'

import style from '../Styles/HomeStyle/Banner.module.scss'
import Box from '@mui/material/Box';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import SwiperCore, {  } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Banner() {
    const Urls = [
        {url : '/HomeImages/Banner-image.png' },
        {url : '/HomeImages/Banner-image.png' },
        {url : '/HomeImages/Banner-image.png' },
        {url : '/HomeImages/Banner-image.png' },
        {url : '/HomeImages/Banner-image.png' },
        
        
      ];
  
      const UrlsObject = Urls.map((url , i)=>({
        id : i ,
        url : url.url,
      }))

     SwiperCore.use([Autoplay])
    return(
        <section className={`${style.mainSection} container mt-4 mb-4`}>
            <div className={`${style.resizeWidth} position-relative`}>
               <Swiper     
                    loop={true}
                    // autoplay={{ delay: 4000 }}
                    slidesPerView={1} 
                   
                    pagination={{
                        bulletClass: `swiper-pagination-bullet ${style['feature-pagination']}`,
                        

                        dynamicBullets: true,
                        clickable : true,
                        // className : `${style.test}`,
                    }}
                    modules={[Pagination]} 
                    
                    className={`${style.swiperMain} mySwiper`}
                  >
                    {UrlsObject.map((item)=>(
                      
                      <SwiperSlide className={style.swiperslideHonors} key={item.id}>
                        
                        <Box key={item.id}  className="h-100"
                          component="img"
                          sx={{
                              width: '100%', 
                              borderRadius: 3,
                          }}
                          alt="slieds"
                          src={item.url}
                          
                        />
                        <div className={style.BannerTextDiv}>
                            <div className="mb-2 Banner-title">
                                <h3>نقش هولوگرام امنیتی در </h3>
                                <h3>کاهش تخلفات</h3>
                            </div>
                            <div className={style.buttonBanner}>
                                <button>
                                  ثبت سفارش
                                </button>
                            </div>
                        </div>
                    
                    </SwiperSlide> 
                    ))}
               </Swiper>    
            </div>
        </section>
    )
}