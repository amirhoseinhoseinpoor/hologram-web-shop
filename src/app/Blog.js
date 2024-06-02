import Link from "next/link";
import "./Styles/Blog.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

export default function  Magazine() {
    return(
        <section className="mb-5 mt-4 container">
            <div className="d-flex flex-row justify-content-between">
                <div className="fs-5">
                    <span>مجله آذر هولگرام </span>
                    <span className="slider-next-text pe-1">برای مطالعه بیشتر...</span>
                </div>
                <div className="arrowback-link">
                    <Link href="#">مطالعه بیشتر <ArrowBackIcon></ArrowBackIcon></Link>
                </div>
            </div>
            <div className="d-flex flex-row gap-3 mt-4 justify-content-center">
                <div className="d-flex flex-column justify-content-center">
                    <div>
                      <Box
                       component="img"
                       sx={{
                        width: '100%', // Ensures responsiveness
                        maxHeight: 300, // Set a maximum height (optional)
                        objectFit: 'cover',
                        aspectRatio : 1.48,
                      }}
                        alt="image."
                        src="/HomeImages/coin.png"
                      />     
                    </div>

                    <div>
                        <p className="studing-time-text  mt-2 mb-2">مطالعه: 5دقیقه</p>
                    </div>
                    <div>
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    </div>
                    
                </div>
                <div className="d-flex flex-column d-none d-lg-block d-md-block">
                  <Box
                    component="img"
                    sx={{
                        width: '100%', // Ensures responsiveness
                        maxHeight: 300, // Set a maximum height (optional)
                        objectFit: 'cover',
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/cube-coin.png"
                  />
                  <p className="studing-time-text mt-2 mb-2">مطالعه: 5دقیقه</p>
                  <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                <div className="d-flex flex-column d-none d-lg-block">
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
                 <p className="studing-time-text mt-2 mb-2">مطالعه: 5دقیقه</p>
                 <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
            </div>
        </section>
    )
}