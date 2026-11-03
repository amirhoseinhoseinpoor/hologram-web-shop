import React from "react";
import ImageText from "../eachPageComponent/AboutUsComponents/About";
import FAQ from "../Components/FAQ";
import FAQJsonLd from "../Components/FAQJsonLd";

import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";

export const metadata = {
  title: "درباره ما",
  description:
    "شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام، تولیدکننده انواع هولوگرام با بالاترین سطح امنیتی و فناوری روز لیزر و هولوگرافی در ایران.",
  alternates: {
    canonical: "/AboutUs",
  },
  openGraph: {
    title: "درباره ما | آذرهولوگرام",
    description:
      "آشنایی با شرکت آذرهولوگرام (خانه چاپ چکاوک)، پیشرو در تولید هولوگرام در ایران.",
  },
};

const AboutUS = () => {
  return (
    <MainLayout>
      <PageIntro
        eyebrow="درباره ما"
        title="خانه چاپ چکاوک؛ پیشرو در صنعت هولوگرام ایران"
        description="شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام، با بکارگیری پیشرفته‌ترین تجهیزات و تکنولوژی روز در زمینه لیزر و هولوگرافی و بهره‌گیری از متخصصان مجرب، در زمینه تولید هولوگرام، چاپ هولوگرام، لیبل هولوگرام و محصولات مرتبط فعالیت می‌نماید."
      />
      <ImageText />
      <FAQJsonLd />
      <FAQ />
    </MainLayout>
  );
};

export default AboutUS;
