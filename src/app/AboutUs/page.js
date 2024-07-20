import React from "react";
import HeaderSeo from "../Components/HeaderSeo";
import ImageText from "../eachPageComponent/AboutUsComponents/About";
import Advantages from "../Components/Advantages";
import FAQ from "../Components/FAQ";
import RedirectCall from "../eachPageComponent/AboutUsComponents/RedirectCall";

const AboutUS = () => {
  return (
    <>
      <HeaderSeo />
      <ImageText />
      <Advantages />
      <FAQ />
      <RedirectCall />
    </>
  );
};

export default AboutUS;
