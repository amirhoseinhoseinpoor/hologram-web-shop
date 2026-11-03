import Form from "../eachPageComponent/ContactUsComponent/Form.js";
import MainLayout from "../layouts/MainLayout.js";
import PageIntro from "../Components/ui/PageIntro";
import ContactDetails from "../eachPageComponent/ContactUsComponent/Address.js";
import style from "../Styles/ContactUsStyle/Form.module.scss";

export const metadata = {
  title: "تماس با ما",
  description:
    "تماس با شرکت آذرهولوگرام. ارسال پیام، آدرس، شماره تماس و اطلاعات ارتباطی برای سفارش هولوگرام و مشاوره.",
  alternates: {
    canonical: "/ContactUs",
  },
  openGraph: {
    title: "تماس با ما | آذرهولوگرام",
    description:
      "اطلاعات تماس شرکت آذرهولوگرام. سفارش هولوگرام و مشاوره رایگان.",
  },
};

export default function ContactUs() {
  return (
    <MainLayout>
      <PageIntro
        eyebrow="تماس با ما"
        title="با کارشناسان آذرهولوگرام در ارتباط باشید"
        description="برای سفارش، مشاوره یا هر پرسشی پیام بگذارید؛ پشتیبان‌های ما در ساعت‌های اداری پاسخگو هستند."
      />
      <section className={`az-section container ${style.layout}`}>
        <Form />
        <ContactDetails />
      </section>
    </MainLayout>
  );
}
