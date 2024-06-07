'use client'

import style from "../Styles/HomeStyle/Exhibition.module.scss";
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
      {url : '/HomeImages/exhibition.png' ,text : 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است'},
      {url : '/HomeImages/exhibition.png' ,text : 'sdnfesanfinf'},
      {url : '/HomeImages/exhibition.png' ,text : 'asskdgvoisvi'},
      {url : '/HomeImages/exhibition.png' ,text : 'sdnfesanfinf'},
      
      
    ];

    const UrlsObject = Urls.map((url , i)=>({
      id : i ,
      text : url.text,
      url : url.url,
    }))


    SwiperCore.use([Autoplay])
    return(
      <section className={style.mainbackground}>
        <div className={`d-flex flex-row container h-100 ${style.exhibitionresponsivemaindiv}`}>
          <div className={`${style.rigthtextslide} ${style.rprighttext} d-flex flex-column justify-content-center`}>
            <div className="fs-4">
             <p>حضور ما در سرتاسر جهان، نشان‌دهنده تعهد ما به </p>
             <p className={`${style.slidernexttext} mt-1`}>پیشرفت و توسعه است...</p>
            </div>
            <div className={`mt-4 d-flex gap-3 ${style.rpexhibitionarrow}`}>
              <button className={`${style.arrowforward} review-swiper-button-prev`}>
               <ArrowForwardIcon></ArrowForwardIcon>
              </button>
              <button className={`${style.arrowbackward} review-swiper-button-next`}>
               <ArrowBackIcon></ArrowBackIcon>
              </button>
            </div>

          </div>
          <div className={style.leftslidewidth}>
          <Swiper
            
            loop={true}
            autoplay={{ delay: 4000 }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              
              990 : {
                slidesPerView : 2,
              },
            }} 
            navigation={{nextEl: '.review-swiper-button-next',prevEl: '.review-swiper-button-prev',}} 
            modules={[Navigation]} 
            
            className="mySwiper"
          >
            {UrlsObject.map((item)=>(
              

              <SwiperSlide key={item.id}>
                <div className={style.resetexhibition}>
                  <Box key={item.id}  className={`h-100`}
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
                    <p>{item.text}</p>
                </div>
            </SwiperSlide>      
            ))}       
          </Swiper>            
          </div>
        </div>
      </section>
    )
}