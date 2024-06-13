import style from '../Styles/HomeStyle/PurchaseProcessSteps.module.scss'
import Box from '@mui/material/Box';


export default function PurchaseProcessSteps() {
    return(
     <section className={`${style.mainBackground} mt-3`}>
        <div className="container d-flex flex-column">
         <div className={`${style.responsiveDiv} d-flex flex-row`}>
            <div className={`${style.widthResizing} d-flex flex-column position-relative m-3`}> 
              <h2 className={`${style.titleColor} title mb-2`}>فرایند ثبت سفارش <span>هولوگرام</span></h2>
              <div style={{marginBottom: '55px'}}>
                 <p>بت سفارش هولوگرام، فرآیندی ساده و امن است. شما می‌توانید با چند کلیک ساده در وب‌سایت ما، سفارش خود را ثبت کنید.</p>
                 <p>کارشناسان مجرب ما در تمام مراحل سفارش و پس از آن در کنار شما هستند تا به تمامی سوالات شما پاسخ دهند و بهترین خدمات را به شما ارائه دهند.</p>
              </div>
              <div className={style.phoneNumber}>
                    <div className="d-flex flex-column">
                        <span>۰۲۱-<span className="title">۶۶۹۷۱۴۰۲-۵</span></span>
                        <Box className={style.Arrow}
                         component="img"
                         sx={{
                             width: 105, 
                             maxHeight: 80, 
                         }}
                         alt="slieds"
                         src="/HomeImages/PurchuseArrow.png"                
                        />
                    </div>
              </div>
            </div>
            <div className={`${style.widthResizing} d-flex flex-row`}>
                <div className={`${style.box1} ${style.widthResizing} position-relative`}>
                    <Box className={style.bux1Icon}
                     component="img"
                     sx={{
                         width: 100, 
                         maxHeight: 100, 
                     }}
                     alt="tic"
                     src="/HomeImages/pur-box1.png"                
                    />
                    <div className={`${style.margin} container`}>
                      <span className={style.numberStyle}>01</span>    
                      <h4 className={style.boxTextSize}>
                         ارسال مدارک و تایید احراز هویت فرد حقیقی و حقوقی
                      </h4>  
                    </div>      
                </div>
                <div className={`${style.box1} ${style.widthResizing} position-relative`}>
                    <Box className={style.bux1Icon}
                     component="img"
                     sx={{
                         width: 100, 
                         maxHeight: 100, 
                     }}
                     alt="tic"
                     src="/HomeImages/pur-box2.png"                
                    />
                    <div className={`${style.margin} container`}>
                      <span className={style.numberStyle}>02</span>    
                      <h4 className={style.boxTextSize}>
                         انتخاب هولوگرام متناسب با نیاز شما
                      </h4>  
                    </div>      
                </div>
             
            </div>
           </div>

           <div className={`${style.responsiveDiv} d-flex flex-row`}>
             <div className={`${style.widthResizing} d-flex flex-row`}>
               <div className={`${style.box1} ${style.widthResizing} position-relative`}>
                    <Box className={style.bux1Icon}
                     component="img"
                     sx={{
                         width: 100, 
                         maxHeight: 100, 
                     }}
                     alt="tic"
                     src="/HomeImages/pur-box3.png"                
                    />
                    <div className={`${style.margin} container`}>
                      <span className={style.numberStyle}>03</span>    
                      <h4 className={style.boxTextSize}>
                         ارسال مدارک و تایید احراز هویت فرد حقیقی و حقوقی
                      </h4>  
                    </div>      
                </div>
                <div className={`${style.box1} ${style.widthResizing} position-relative`}>
                    <Box className={style.bux1Icon}
                     component="img"
                     sx={{
                         width: 100, 
                         maxHeight: 100, 
                     }}
                     alt="tic"
                     src="/HomeImages/pur-box4.png"                
                    />
                    <div className={`${style.margin} container`}>
                      <span className={style.numberStyle}>04</span>    
                      <h4 className={style.boxTextSize}>
                         انتخاب هولوگرام متناسب با نیاز شما
                      </h4>  
                    </div>      
                </div>
             </div>
             <div className={`${style.widthResizing}  d-flex flex-row`}>
               <div className={`${style.box1} ${style.widthResizing} position-relative`}>
                    <Box className={style.bux1Icon}
                     component="img"
                     sx={{
                         width: 100, 
                         maxHeight: 100, 
                     }}
                     alt="tic"
                     src="/HomeImages/pur-box5.png"                
                    />
                    <div className={`${style.margin} container`}>
                      <span className={style.numberStyle}>05</span>    
                      <h4 className={style.boxTextSize}>
                         ارسال مدارک و تایید احراز هویت فرد حقیقی و حقوقی
                      </h4>  
                    </div>      
                </div>
                <div className={`${style.box1} ${style.widthResizing} position-relative`}>
                    <Box className={style.bux1Icon}
                     component="img"
                     sx={{
                         width: 100, 
                         maxHeight: 100, 
                     }}
                     alt="tic"
                     src="/HomeImages/pur-box6.png"                
                    />
                    <div className={`${style.margin} container`}>
                      <span className={style.numberStyle}>06</span>    
                      <h4 className={style.boxTextSize}>
                         انتخاب هولوگرام متناسب با نیاز شما
                      </h4>  
                    </div>      
                </div>
             </div>
           </div>


        </div>

    </section>
  
    )
}
  
    
