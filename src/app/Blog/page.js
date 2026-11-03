import React from "react";
import { Suspense } from "react";
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";

import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";

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
    <MainLayout>
      <PageIntro
        eyebrow="مجله آذرهولوگرام"
        title="مقالات"
        description="آخرین مقالات و راهنماها درباره هولوگرام، لیبل‌های امنیتی و فناوری هولوگرافی."
      />
      <BlogCard />
      <Suspense
        fallback={
          <div className="container az-section">
            <div className="az-spinner" />
          </div>
        }
      >
        <BlogRegular />
      </Suspense>
    </MainLayout>
  );
}
