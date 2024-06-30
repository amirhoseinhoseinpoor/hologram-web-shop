'use client'

import React from 'react';

import style from "../Styles/HomeStyle/Honors.module.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import SwiperCore, {  } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


export default function Honors() {

    const Urls = [
        {url : '/HomeImages/honors.png' },
        {url : '/HomeImages/honors.png' },
        {url : '/HomeImages/honors.png' },
        {url : '/HomeImages/honors.png' },
        {url : '/HomeImages/honors.png' },
        
        
      ];
  
      const UrlsObject = Urls.map((url , i)=>({
        id : i ,
        
        url : url.url,
      }))

     SwiperCore.use([Autoplay])

    return(
        <section className={`${style.mainbackgroundhonor} mt-5 mb-5`}>
            <div className="d-flex flex-row container h-100">
                <div className={`${style.rigthtextslide} d-flex flex-column justify-content-center`}>
                    <div className="title">
                      <p>افتخاراتی که به آن‌ها</p>
                      <p className={`${style.slidernexttext} mt-1`}>افتخار می‌کنیم...</p>
                    </div>
                    <div className="mt-4 d-flex gap-3">
                       <button className={`${style.arrowforward} review-swiper-button-prev2`}>
                         <ArrowForwardIcon></ArrowForwardIcon>
                       </button>
                       <button className={`${style.arrowbackward} review-swiper-button-next2`}>
                         <ArrowBackIcon></ArrowBackIcon>
                       </button>
                    </div>   
                </div>
                <div className={style.leftslidewidth}>
                <Swiper
                    
                    loop={true}
                    autoplay={{ delay: 4000 }}
                    spaceBetween={2}
                    slidesPerView={1} 
                    breakpoints={{
                      770 : {
                        slidesPerView : 2,
                      },
                      990 : {
                        slidesPerView : 3 ,
                      },
                    }}
                    navigation={{nextEl: '.review-swiper-button-next2',prevEl: '.review-swiper-button-prev2',}} 
                    modules={[Navigation]} 
                    
                    className="mySwiper"
                  >
                    {UrlsObject.map((item)=>(
                      
                      <SwiperSlide className={style.swiperslideHonors} key={item.id}>
                        
                        <Box key={item.id}  className="h-100"
                          component="img"
                          sx={{
                              width: '100%', 
                              maxHeight: '80%', 
                              borderRadius: 3,
                          }}
                          alt="slieds"
                          src={item.url}
                          
                        />
                    
                    </SwiperSlide> 
                    ))}
                  </Swiper>    
                </div>
            </div>
        </section>

    )
}