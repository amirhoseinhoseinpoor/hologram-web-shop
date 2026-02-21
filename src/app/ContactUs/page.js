import HeaderSeo from "../Components/HeaderSeo.js";
import Form from "../eachPageComponent/ContactUsComponent/Form.js";
import Address from "../eachPageComponent/ContactUsComponent/Address.js";
import MainLayout from "../layouts/MainLayout.js";

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
    <>
     <MainLayout>
      <HeaderSeo />
      <Form />
      <Address />     
      </MainLayout>
    </>
  );
}
