export const metadata = {
  title: "درباره ما | آذرهولوگرام",
  description:
    "آذرهولوگرام با سال‌ها تجربه در تولید هولوگرام‌های امنیتی، پیشرو در صنعت چاپ و بسته‌بندی امنیتی ایران است.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir"}/AboutUs`,
  },
};

import React from "react";
import HeaderSeo from "../Components/HeaderSeo";
import ImageText from "../eachPageComponent/AboutUsComponents/About";
import Advantages from "../Components/Advantages";
import FAQ from "../Components/FAQ";
import RedirectCall from "../eachPageComponent/AboutUsComponents/RedirectCall";

import MainLayout from "../layouts/MainLayout";

const AboutUS = () => {
  return (
    <>
      <MainLayout>
        <HeaderSeo />
        <ImageText />
        <Advantages />
        <FAQ />
        <RedirectCall />
      </MainLayout>
    </>
  );
};

export default AboutUS;
