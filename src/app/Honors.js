'use client'


import "./Styles/Honors.scss"
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
        <section className="main-background-honor mt-5 mb-5">
            <div className="d-flex flex-row container h-100">
                <div className="rigth-text-slide  d-flex flex-column justify-content-center">
                    <div>
                      <p>افتخاراتی که به آن‌ها</p>
                      <p className="slider-next-text mt-1">افتخار می‌کنیم...</p>
                    </div>
                    <div className="mt-4 d-flex gap-3">
                       <button className="arrow-forward review-swiper-button-prev2">
                         <ArrowForwardIcon></ArrowForwardIcon>
                       </button>
                       <button className="arrow-backward review-swiper-button-next2">
                         <ArrowBackIcon></ArrowBackIcon>
                       </button>
                    </div>
                    
                </div>
                <div className="left-slidewidth">
                <Swiper
                    
                    loop={true}
                    // autoplay={{ delay: 4000 }}
                    spaceBetween={2}
                    slidesPerView={3} 
                    navigation={{nextEl: '.review-swiper-button-next2',prevEl: '.review-swiper-button-prev2',}} 
                    modules={[Navigation]} 
                    
                    className="mySwiper"
                  >
                    {UrlsObject.map((item)=>(
                      
        
                      <SwiperSlide className="swiper-slide-Honors" key={item.id}>
                        
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