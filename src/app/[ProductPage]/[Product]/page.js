"use client";

// components
import MainLayout from "@/app/layouts/MainLayout";
import EachProductVideo from "@/app/eachPageComponent/ProductInnerPageComponents/EachProductVideo";
import ShowRoute from "@/app/Components/ShowRoute";
import FAQ from "@/app/Components/FAQ";
import ProductShow from "@/app/eachPageComponent/ProductInnerPageComponents/ProductShow";

import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";

// redux
import { useSelector, useDispatch } from "react-redux";
import { list } from "@/app/Store/thunks";
import { productListData } from "@/app/Store/slice";

import React, { useRef, useEffect, useState } from "react";

export default function Product() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [decodedPathname, setDecodedPathname] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDecodedPathname(decodeURIComponent(pathname));
  }, [pathname]);



  useEffect(() => {
    const fetchData = async () => {
      await dispatch(list());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const allProductData = useSelector(productListData);

  // Extract the desired part from the decoded pathname
  const pathSegments = decodedPathname.split("/");
  const targetName = pathSegments[pathSegments.length - 1];



  const productData = allProductData?.find((item) => item.name === targetName);

  console.log(productData);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    notFound();
  }

  return (
    <section>
      <MainLayout>
        <div className="container">
          <ShowRoute />
        </div>

        <ProductShow productData={productData} />

        <EachProductVideo productData={productData} />
        <div className="mt-5">
          <FAQ />
        </div>
      </MainLayout>
    </section>
  );
}
