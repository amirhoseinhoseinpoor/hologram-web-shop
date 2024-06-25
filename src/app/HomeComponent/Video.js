'use client'
import React, { useRef, useEffect, useState } from 'react';
import style from '../Styles/HomeStyle/Video.module.scss'
import { Card, CardContent, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';

export default function Video() {
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef()
  useEffect(() => {
    const video = videoRef.current;
      video.onplay = () => {
        setVideoEnded(!videoEnded)
      }
  }, [])
  


    return(
        <section className={`mt-5 mb-5 container ${style.responsiveSection}`}>
            <div className={`${style.adjustWidth} position-relative`}>
            <Card>
                <CardContent>
                 <div className="d-flex flex-column">
                  <div className={`${style.titleStyle} title `}>
                   <span>عنوان ویدئو</span><span className={style.titleColor}> که اینجاست</span>
                  </div>
                  <p className="subtitle">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.</p>
                 </div>
               </CardContent>
               <CardMedia
                id='video'
                component="video"
                image="HomeVideo/SampleVideo_1280x720_1mb.mp4" 
                poster='HomeImages/Video image.png'
                controls
                ref={videoRef}
              />
              
                {!videoEnded &&
                  <>
                   <Box
                    className={`${style.posterIcon} d-none d-lg-block d-xl-block`}
                    component="img"
                    alt="image."
                    src="/HomeImages/Video icon.png"
                  />      
                  <Box
                    className={`${style.posterIconArrow} d-none d-lg-block d-xl-block`}
                    component="img"
                    sx={{
                     width: '60px', 
                     height: '25px', 
                     objectFit: 'cover',
                     aspectRatio : 1.48,
                  }}
                    alt="image."
                    src="/HomeImages/Video icon arrow.png"
                  />   
                  </>
                }
            
            </Card>       
            </div>
        </section>
    )
}