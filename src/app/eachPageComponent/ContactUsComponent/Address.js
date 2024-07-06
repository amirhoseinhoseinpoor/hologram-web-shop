import CallIcon from "@mui/icons-material/Call";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import style from "../../Styles/ContactUsStyle/Address.module.scss";

export default function Address() {
  return (
    <section className={`${style.mainBackground} mt-5 container pt-3 pb-3`}>
      <div className={`${style.responsiveBreak} d-flex flex-row gap-3`}>
        <div className={`${style.responsiveMain} d-flex flex-column`}>
          <div>
            <p className="title">راه‌های ارتباطی</p>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={style.CallIconDiv}>
              <CallIcon />
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>
                شماره تماس:
              </p>
              <p className="purchesSize">۵ الی ۰۲۱۶۶۹۷۱۴۰۲</p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={style.CallIconDiv}>
              <FmdGoodIcon />
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>آدرس:</p>
              <p className="purchesSize">
                تهران، میدان فلسطین،خیابان فلسطین جنوبی، خیابان بزرگمهر غربی،
                نبش کوچه حکمت، پلاک یک، طبقه ششم
              </p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={`${style.CallIconDiv} ${style.fixicon}`}>
              <MailOutlinedIcon />
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>ایمیل:</p>
              <p className="purchesSize">info@azarhologram.co</p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={`${style.CallIconDiv} ${style.fixicon}`}>
              <AccessTimeOutlinedIcon />
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>
                ساعت کاری:
              </p>
              <p className="purchesSize">همه روزه 7 الی 18</p>
            </div>
          </div>
          <div className="d-flex flex-row mt-2 gap-2">
            <div className={`${style.CallIconDiv} ${style.fixicon}`}>
              <LocalPrintshopOutlinedIcon />
            </div>
            <div className={style.phoneNumberAD}>
              <p className={`${style.phonecolorstyle} discription`}>فکس:</p>
              <p className="purchesSize">۶۶۹۷۱۴۰۵</p>
            </div>
          </div>
        </div>
        <div className={`${style.responsiveMain} d-flex flex-column`}>
          <div>
            <p className="title">آدرس ما</p>
          </div>
          <div className="h-100 mt-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3239.9064675876466!2d51.40370990213015!3d35.703919218164344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQyJzEzLjAiTiA1McKwMjQnMDYuOCJF!5e0!3m2!1sfa!2s!4v1720280623034!5m2!1sfa!2s"
              style={{ border: 0 , height:'100%' , width:'100%' , borderRadius:'4px' , minHeight:'260px'}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
