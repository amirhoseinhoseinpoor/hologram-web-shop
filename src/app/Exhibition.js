'use client'

import "./Styles/Exhibition.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules'; // Updated import path
import SwiperCore, {  } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Exhibition(){

    const Urls = [
      {url : '/HomeImages/exhibition.png' },
      {url : '/HomeImages/exhibition.png' },
      {url : '/HomeImages/exhibition.png' },
      {url : '/HomeImages/exhibition.png' },
      {url : '/HomeImages/exhibition.png' },
      
      
    ];

    const UrlsObject = Urls.map((url , i)=>({
      id : i ,
      url : url.url,
    }))
    SwiperCore.use([Autoplay])
    return(
      <section className="main-background mt-5">
        <div className="d-flex flex-row container h-100">
          <div className="rigth-text-slide  d-flex flex-column justify-content-center">
            <div>
             <p>در سرتاسر جهان ما نمایشگاه برگزار کردیم...</p>
            </div>
            <div className="mt-4">
              <ArrowForwardIcon className="arrow-forward review-swiper-button-next"></ArrowForwardIcon>
              <ArrowBackIcon className="arrow-backward review-swiper-button-prev"></ArrowBackIcon>
            </div>

          </div>
          <div className="left-slidewidth d-flex flex-column ">
          <Swiper
          
            loop={true}
            autoplay={{ delay: 4000 }}
            spaceBetween={30}
            slidesPerView={1.5} 
            navigation={{nextEl: '.review-swiper-button-next',prevEl: '.review-swiper-button-prev',}} 
            modules={[Navigation]} 
            
            className="mySwiper">
            {UrlsObject.map((item)=>(
              

              <SwiperSlide key={item.id}>
                <Box key={item.id}  className="h-100"
                  component="img"
                  sx={{
                      width: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'cover',
                      aspectRatio : 2.4
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