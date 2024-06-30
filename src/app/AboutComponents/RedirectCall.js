import style from "../Styles/AboutUsStyle/RedirectCall.module.scss"

export default function RedirectCall() {
    return(
        <section className={`container`}>
            <div className={style.mainbackground}>
                <div className="d-flex flex-column">
                    <p className="title mb-2">در مسیر امنیت ما در کنار شماییم.</p>
                   <p className="subtitle mb-3">پیشنهادات و نظراتتان را با ما درمیان بگذارید.</p>
                  <button>تماس با ما</button>
                </div>
                
            </div>
        </section>
    )
}