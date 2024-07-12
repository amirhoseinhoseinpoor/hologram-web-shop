import Link from "next/link";
import style from "../../Styles/HomeStyle/Blog.module.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import React from 'react';

import axios from 'axios'; // Import axios for API calls

// const getData = async () => {
 
    
//       const response = await axios.get('/json/Blog.json');
//       console.log(response.data);

//       return response.data;
   
 
// }


export default async function Magazine() {
 
  // const data = await getData()

    return(
        <section className="mb-5 mt-4 container">
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <span className="title">مجله آذر هولگرام </span>
                    <span className={`${style.slidernexttext} pe-1  title`}>برای مطالعه بیشتر...</span>
                </div>
                <div className={style.arrowbacklink}>
                    <Link href="/Blog">مطالعه بیشتر <ArrowBackIcon></ArrowBackIcon></Link>
                </div>
            </div>
            <div className={`${style.responsiveFirstBox} d-flex flex-row gap-3 mt-4 justify-content-center`}>
                <div className={`${style.boxBackgroundMain} d-flex flex-column justify-content-center`}>
                    <div className={style.mobilePictureResponsiveBlog}>
                      <Box
                       component="img"
                       sx={{
                        width: '100%', 
                        maxHeight: 300, 
                        objectFit: 'cover',
                        aspectRatio : 1.48,
                      }}
                        alt="image."
                        src="/HomeImages/coin.png"
                      />     
                    </div>

                    <div>
                        <p className={`${style.studingtimetext} mt-2 mb-2 discription`}>مطالعه: 5دقیقه</p>
                    </div>
                    <div>
                        <p className="subitem">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    </div>
                    
                </div>
                <div className={`${style.boxBackgroundMain} d-flex flex-column d-none d-lg-block d-md-block`}>
                  <Box
                    component="img"
                    sx={{
                        width: '100%', 
                        maxHeight: 300, 
                        objectFit: 'cover',
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/cube-coin.png"
                  />
                  <p className={`${style.studingtimetext} mt-2 mb-2 discription`}>مطالعه: 5دقیقه</p>
                  <p className="subitem">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                <div className={`${style.boxBackgroundMain} d-flex flex-column d-none d-lg-block d-md-block d-xl-block`}>
                  <Box
                    component="img"
                    sx={{
                        width: '100%', // Ensures responsiveness
                        maxHeight: 300, // Set a maximum height (optional)
                        objectFit: 'cover',
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/text.png"
                  />
                 <p className={`${style.studingtimetext} mt-2 mb-2 discription`}>مطالعه: 5دقیقه</p>
                 <p className="subitem">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
            </div>
        </section>
    )
}
