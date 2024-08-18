import style from "../Styles/MainStyle/Advantages.module.scss";
import React from "react";
export default function Advantages() {
  return (
    <section className={`${style.mainBackground} mb-5`}>
      <div className={`${style.MakeResponsiveMainDiv} d-flex flex-row container`}>

       <div className={style.divText}>
          <p className="QASize">چرا ما مورد اعتمادیم؟</p>
        </div>

        <div className={`${style.DivLeftSideText} d-flex flex-row justify-content-between`}>
          <div className={style.textColor}>
            <div className="d-flex flex-column">
              <p className="title text-center">۶۶۹۰۵+</p>
              <p className="subAdvantages">پروژه انجام‌شده</p>
            </div>
          </div>
          <div className={style.textColor}>
            <div className="d-flex flex-column text-center">
              <p className="title">۶۶۹۰۵+</p>
              <p className="subAdvantages">سابقه</p>
            </div>
          </div>
          <div className={style.textColor}>
            <div className="d-flex flex-column">
              <p className="title text-center">۶۹+</p>
              <p className="subAdvantages">تنوع محصولات</p>
            </div>
          </div>
          <div className={style.textColor}>
            <div className="d-flex flex-column">
              <p className="title text-center">۹۰۵+</p>
              <p className="subAdvantages">مشتری وفادار</p>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
}
