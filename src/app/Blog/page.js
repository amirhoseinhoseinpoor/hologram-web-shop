import React from "react";
import { Suspense } from "react";
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";

import MainLayout from "../layouts/MainLayout";


export default function Blog() {
  return (
    <>
      <MainLayout>
        <BlogCard />
        <Suspense fallback={<div>Loading...</div>}>
          <BlogRegular />
        </Suspense>
      </MainLayout>
    </>
  );
}
