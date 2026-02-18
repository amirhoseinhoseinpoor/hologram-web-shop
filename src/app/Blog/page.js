export const metadata = {
  title: "وبلاگ | مقالات هولوگرام و امنیت",
  description:
    "مقالات تخصصی درباره هولوگرام‌های امنیتی، برچسب‌های ضد جعل، فناوری‌های نوین در صنعت چاپ و بسته‌بندی امنیتی.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir"}/Blog`,
  },
};

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
