import React from "react";
import ImageText from "../eachPageComponent/AboutUsComponents/About";
import FAQ from "../Components/FAQ";
import JsonLd from "../Components/JsonLd";

import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";
import { breadcrumbLd, pageMeta } from "../utils/seo";

export const metadata = pageMeta({
  title: "درباره آذرهولوگرام (خانه چاپ چکاوک)",
  description:
    "شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام، با خط کامل تولید در داخل کشور در زمینه تولید و چاپ هولوگرام، لیبل هولوگرام و محصولات مرتبط فعالیت می‌کند.",
  path: "/AboutUs",
});

const AboutUS = () => {
  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "درباره ما", path: "/AboutUs" }])} />
      <PageIntro
        eyebrow="درباره ما"
        title="خانه چاپ چکاوک؛ پیشرو در صنعت هولوگرام ایران"
        description="شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام، با بکارگیری پیشرفته‌ترین تجهیزات و تکنولوژی روز در زمینه لیزر و هولوگرافی و بهره‌گیری از متخصصان مجرب، در زمینه تولید هولوگرام، چاپ هولوگرام، لیبل هولوگرام و محصولات مرتبط فعالیت می‌نماید."
      />
      <ImageText />
      <FAQ />
    </MainLayout>
  );
};

export default AboutUS;
