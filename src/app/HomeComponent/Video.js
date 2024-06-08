import style from '../Styles/HomeStyle/Video.module.scss'
import { Card, CardContent, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';

export default function Video() {
    return(
        <section className={`mt-5 mb-5 container ${style.responsiveSection}`}>
            <div className="position-relative">
            <Card>
                <CardContent>
                 <div className="d-flex flex-column">
                  <div className={`${style.titleStyle} fs-5 `}>
                   <span>عنوان ویدئو</span><span className={style.titleColor}> که اینجاست</span>
                  </div>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.</p>
                 </div>
               </CardContent>
               <CardMedia
                component="video"
                image="HomeVideo/SampleVideo_1280x720_1mb.mp4" 
                poster='HomeImages/Video image.png'
                controls
              />  
              <Box
                 className={style.posterIcon}
                 component="img"
                 alt="image."
                 src="/HomeImages/Video icon.png"
               />      
               <Box
                 className={style.posterIconArrow}
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
            </Card>
            <div>
               
            </div>
            </div>
        </section>
    )
}