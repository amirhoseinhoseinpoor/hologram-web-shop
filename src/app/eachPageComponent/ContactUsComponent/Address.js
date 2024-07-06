
import style from '../../Styles/ContactUsStyle/Address.module.scss'

export default function Address() {
    return(
        <section className={`${style.mainBackground} mt-4 container pt-3 pb-3`}>
            <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                   <div>
                     <p className="title">راه‌های ارتباطی</p>
                   </div>
                   <div className="d-flex flex-row">
                     <div>

                     </div>
                     <div>
                        <p>شماره تماس:</p>
                        <p>۵ الی ۰۲۱۶۶۹۷۱۴۰۲</p>
                     </div>
                   </div>
                   <div className="d-flex flex-row">
                     <div>
                        <p>آدرس:</p>
                     </div>
                     <div>
                        <p>تهران، میدان فلسطین،خیابان فلسطین جنوبی، خیابان بزرگمهر غربی، نبش کوچه حکمت، پلاک یک، طبقه ششم</p>
                     </div>
                   </div>
                </div>
                <div className="d-flex flex-column">

                </div>
            </div>
        </section>
    )
}