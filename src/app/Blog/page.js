import React from "react";
import { Suspense } from "react";
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";

import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";
import JsonLd from "../Components/JsonLd";
import { breadcrumbLd, pageMeta } from "../utils/seo";

export const metadata = pageMeta({
  title: "مقالات هولوگرام و برچسب‌های امنیتی",
  description:
    "مقاله‌ها و راهنماهای آذرهولوگرام درباره هولوگرام، لیبل هولوگرام، برچسب پلمپ و فناوری هولوگرافی.",
  path: "/Blog",
});

export default function Blog() {
  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "مقالات", path: "/Blog" }])} />
      <PageIntro
        eyebrow="مجله آذرهولوگرام"
        title="مقالات هولوگرام و لیبل‌های امنیتی"
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
