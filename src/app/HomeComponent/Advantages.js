import style from '../Styles/HomeStyle/Advantages.module.scss'

export default function Advantages() {
    return(
        <section className={`${style.mainBackground} mt-5 mb-5`}>
            <div className="d-flex flex-row justify-content-around">
              <div className={style.textColor}>
                  <div className="d-flex flex-column">
                    <p className="title">1.000+</p>
                    <p>پروژه انجام‌شده</p>
                  </div>
              </div>
              <div className={style.textColor}>
                  <div className="d-flex flex-column">
                    <p className="title">15+</p>
                    <p>سابقه</p>
                  </div>
              </div>
              <div className={style.textColor}>
                  <div className="d-flex flex-column">
                    <p className="title">100+</p>
                    <p>تنوع محصولات</p>
                  </div>
              </div>
              <div className={style.textColor}>
                  <div className="d-flex flex-column">
                    <p className="title">1.000+</p>
                    <p>مشتری وفادار</p>
                  </div>
              </div>
              
            </div>
            
        </section>
    )
}