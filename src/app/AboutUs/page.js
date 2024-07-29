import React from "react";
import HeaderSeo from "../Components/HeaderSeo";
import ImageText from "../eachPageComponent/AboutUsComponents/About";
import Advantages from "../Components/Advantages";
import FAQ from "../Components/FAQ";
import RedirectCall from "../eachPageComponent/AboutUsComponents/RedirectCall";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";

const AboutUS = () => {
  return (
    <>
      <Header/>
      <HeaderSeo />
      <ImageText />
      <Advantages />
      <FAQ />
      <RedirectCall />
      <Footer/>
    </>
  );
};

export default AboutUS;
