import "./Styles/Exhibition.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Exhibition(){
    return(
      <section className="main-background">
        <div className="d-flex flex-row container h-100">
          <div className="d-flex flex-column justify-content-center">
            <div>
             <p>در سرتاسر جهان ما نمایشگاه برگزار کردیم...</p>
            </div>
            <div className="mt-4">
              <ArrowForwardIcon className="arrow-forward"></ArrowForwardIcon>
              <ArrowBackIcon className="arrow-backward"></ArrowBackIcon>
            </div>

          </div>
          <div className="d-flex flex-column">
            


          </div>

        </div>
      </section>
    )
}