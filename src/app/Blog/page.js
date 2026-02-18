import React from "react";
import { Suspense } from "react";
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";

import MainLayout from "../layouts/MainLayout";

export const metadata = {
  title: "وبلاگ",
  description:
    "آخرین مقالات و اخبار درباره هولوگرام، لیبل هولوگرام، فناوری هولوگرافی و محصولات امنیتی در وبلاگ آذرهولوگرام.",
  alternates: {
    canonical: "/Blog",
  },
  openGraph: {
    title: "وبلاگ آذرهولوگرام",
    description:
      "آخرین مقالات و اخبار درباره هولوگرام، لیبل هولوگرام و فناوری هولوگرافی.",
  },
};

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
