"use client";

import MainLayout from "@/app/layouts/MainLayout";

import ShowRoute from "@/app/Components/ShowRoute";
import { notFound } from "next/navigation";
import data from "/public/json/productInnerPage.json";

import EachProductVideo from "@/app/eachPageComponent/ProductInnerPageComponents/EachProductVideo";
import React, { useRef, useEffect, useState } from "react";
import FAQ from "@/app/Components/FAQ";
import ProductShow from "@/app/eachPageComponent/ProductInnerPageComponents/ProductShow";

export default function Product() {
  // State to track the currently selected media (image or video)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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
