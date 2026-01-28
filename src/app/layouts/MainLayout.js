import Header from "../Components/Header";
import Footer from "../Components/Footer";
import style from "../Styles/LayoutStyle/MainLayout.module.scss"

export default function MainLayout({ children }) {
    return (
      <div className={style.LayOutMainDiv}>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </div>
    );
  }
  