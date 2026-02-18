export const metadata = {
  title: "آذرهولوگرام | چاپ و تولید هولوگرام امنیتی",
  description:
    "آذرهولوگرام پیشرو در تولید و چاپ هولوگرام‌های امنیتی، برچسب‌های هولوگرامی و محصولات ضد جعل در ایران. سفارش آنلاین با کیفیت بالا و تحویل سریع.",
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir" },
};

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

import MainLayout from "./layouts/MainLayout";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

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
            <FAQ />
            <Blog />
          </MainLayout>
        </ThemeProvider>
      </React.StrictMode>
    </main>
  );
}
