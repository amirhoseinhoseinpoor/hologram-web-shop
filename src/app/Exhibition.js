'use client'

import "./Styles/Exhibition.scss";
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


export default function Exhibition(){

    const Urls = [
      {url : '/HomeImages/exhibition.png' ,text : 'شیشهعتسیتره'},
      {url : '/HomeImages/exhibition.png' ,text : '346525257356656452'},
      {url : '/HomeImages/exhibition.png' ,text : 'sdnfesanfinf'},
      {url : '/HomeImages/exhibition.png' ,text : 'asskdgvoisvi'},
      {url : '/HomeImages/exhibition.png' ,text : 'sdnfesanfinf'},
      
      
    ];

    const UrlsObject = Urls.map((url , i)=>({
      id : i ,
      text : url.text,
      url : url.url,
    }))

    const truncateParagraph = (text, slideIndex) => {
      if (!text) {
        return ''; // Return an empty string if text is undefined
      }
      const maxChars = slideIndex * (text.length / 3); // Adjust factor for truncation
      return text.slice(0, maxChars) + (maxChars < text.length ? '...' : '');
    };



    SwiperCore.use([Autoplay])
    return(
      <section className="main-background">
        <div className="d-flex flex-row container h-100">
          <div className="rigth-text-slide  d-flex flex-column justify-content-center">
            <div className="fs-4">
             <p>در سرتاسر جهان ما </p>
             <p className="slider-next-text mt-1">حضور داریم...</p>
            </div>
            <div className="mt-4 d-flex gap-3">
              <button className="arrow-forward review-swiper-button-prev">
               <ArrowForwardIcon></ArrowForwardIcon>
              </button>
              <button className="arrow-backward review-swiper-button-next">
               <ArrowBackIcon></ArrowBackIcon>
              </button>
            </div>

          </div>
          <div className="left-slidewidth">
          <Swiper
            
            loop={true}
            autoplay={{ delay: 4000 }}
            spaceBetween={30}
            slidesPerView={1.5} 
            navigation={{nextEl: '.review-swiper-button-next',prevEl: '.review-swiper-button-prev',}} 
            modules={[Navigation]} 
            
            className="mySwiper"
          >
            {UrlsObject.map((item)=>(
              

              <SwiperSlide key={item.id}>
                
                <Box key={item.id}  className="h-100 test"
                  component="img"
                  sx={{
                      width: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'cover',
                      aspectRatio : 2.4 ,
                      borderRadius: 3,
                  }}
                  alt="slieds"
                  src={item.url}
                  
                />
                  <p>{truncateParagraph(item.text, item.id)}</p>
                
                  
                
                

            </SwiperSlide>
            
             
            ))}
            
            
          </Swiper>            


          </div>

        </div>
      </section>
    )
}