import React from "react";
import Banner from "./eachPageComponent/HomeComponent/Banner";
import PurchaseProcessSteps from "./eachPageComponent/HomeComponent/PurchaseProcessSteps";
import Blog from "./eachPageComponent/HomeComponent/Blog";
import Exhibition from "./eachPageComponent/HomeComponent/Exhibition";
import Advantages from "./Components/Advantages";
import IntroSecure from "./eachPageComponent/HomeComponent/Intro-Secure";
import IntroHologram from "./eachPageComponent/HomeComponent/Intro-Hologram";
import Video from "./eachPageComponent/HomeComponent/Video";
import Honors from "./eachPageComponent/HomeComponent/Honors";
import FAQ from "./Components/FAQ";
import FAQJsonLd from "./Components/FAQJsonLd";

import MainLayout from "./layouts/MainLayout";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export const metadata = {
  title: "آذرهولوگرام | تولید و چاپ هولوگرام در ایران",
  description:
    "شرکت آذرهولوگرام (خانه چاپ چکاوک) با خط کامل تولید هولوگرام در ایران. سفارش انواع لیبل هولوگرام، هولوگرام امنیتی و محصولات هولوگرافی با بالاترین کیفیت.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Banner />
            <PurchaseProcessSteps />
            <IntroSecure />
            <IntroHologram />
            <Honors />
            <Video />
            <Exhibition />
            <Advantages />
            <FAQJsonLd />
            <FAQ />
            <Blog />
          </MainLayout>
        </ThemeProvider>
      </React.StrictMode>
    </main>
  );
}
