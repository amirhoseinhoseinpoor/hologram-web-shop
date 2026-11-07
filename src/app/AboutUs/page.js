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
    "خانه چاپ چکاوک (آذرهولوگرام)، تولیدکننده هولوگرام امنیتی و لیبل هولوگرام با خط کامل تولید در ایران؛ تقدیرشده در جوایز IHMA ۲۰۱۶ و حاضر در drupa و Labelexpo.",
  path: "/AboutUs",
});

const AboutUS = () => {
  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "درباره ما", path: "/AboutUs" }])} />
      <PageIntro
        eyebrow="درباره ما"
        title="خانه چاپ چکاوک؛ تولیدکننده هولوگرام امنیتی در ایران"
        description="شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام، با خط کامل تولید در داخل کشور، هولوگرام امنیتی، لیبل هولوگرام، برچسب پلمپ و اسکرچ را با طرح اختصاصی طراحی و تولید می‌کند."
      />
      <ImageText />
      <FAQ />
    </MainLayout>
  );
};

export default AboutUS;
