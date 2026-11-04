import Form from "../eachPageComponent/ContactUsComponent/Form.js";
import MainLayout from "../layouts/MainLayout.js";
import PageIntro from "../Components/ui/PageIntro";
import ContactDetails from "../eachPageComponent/ContactUsComponent/Address.js";
import style from "../Styles/ContactUsStyle/Form.module.scss";
import JsonLd from "../Components/JsonLd";
import { breadcrumbLd, pageMeta } from "../utils/seo";

export const metadata = pageMeta({
  title: "تماس با آذرهولوگرام و سفارش هولوگرام",
  description:
    "نشانی دفتر مرکزی آذرهولوگرام در تهران، شماره تماس، ایمیل و فرم ارسال پیام برای سفارش هولوگرام، لیبل امنیتی و مشاوره با کارشناسان.",
  path: "/ContactUs",
});

export default function ContactUs() {
  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "تماس با ما", path: "/ContactUs" }])} />
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
