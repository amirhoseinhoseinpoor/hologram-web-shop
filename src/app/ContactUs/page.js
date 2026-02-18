export const metadata = {
  title: "تماس با ما | آذرهولوگرام",
  description:
    "برای سفارش هولوگرام امنیتی یا اطلاعات بیشتر با کارشناسان آذرهولوگرام تماس بگیرید.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir"}/ContactUs`,
  },
};

import HeaderSeo from "../Components/HeaderSeo.js";
import Form from "../eachPageComponent/ContactUsComponent/Form.js";
import Address from "../eachPageComponent/ContactUsComponent/Address.js";
import MainLayout from "../layouts/MainLayout.js";

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
