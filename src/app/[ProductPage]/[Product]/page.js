"use client";


import MainLayout from "@/app/layouts/MainLayout";

import ShowRoute from "@/app/Components/ShowRoute";
import { notFound } from "next/navigation";

import EachProductVideo from "@/app/eachPageComponent/ProductInnerPageComponents/EachProductVideo";
import React, { useRef, useEffect, useState } from "react";
import FAQ from "@/app/Components/FAQ";
import ProductShow from "@/app/eachPageComponent/ProductInnerPageComponents/ProductShow";

export default function Product() {
  // State to track the currently selected media (image or video)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const data = [
    {
      title: "هولوگرام اختصاصی با اثر گذاری باطل شد",
      subtitle: "یه معرفی اجمالی درباره این محصول که در حد دو خطه این جا میاد.",
      color: [
        { name: "آبی", value: "blue" },
        { name: "سرمه ای", value: "navy" },
        { name: "زرد", value: "yellow" },
      ],
      sizes: ["2:4", "2:5", "3:5", "3:11", "5:15"],

      imgData: [
        {
          src: "/HomeImages/typeazar1.jpg",
          type: "image",
        },
        {
          src: "/HomeImages/coin.png",
          type: "image",
        },
        {
          src: "/HomeImages/coin.png",
          type: "image",
        },
        {
          src: "/HomeImages/coin.png",
          type: "image",
        },
        {
          src: "/HomeImages/cube-coin.png",
          type: "image",
        },
        {
          src: "/HomeVideo/sampleVideo2.mp4",
          poster: "/HomeImages/Video image.jpg",
          type: "video",
        },
      ],
    },
  ];

  return (
    <section>
      <MainLayout>
        
        <div className="container">
          <ShowRoute />
        </div>

        <ProductShow data={data} />

        <EachProductVideo />
        <div className="mt-5">
          <FAQ />
        </div>

       
      </MainLayout>
    </section>
  );
}
