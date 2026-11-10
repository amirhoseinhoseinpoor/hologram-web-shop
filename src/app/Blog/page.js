import React from "react";
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";

import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";
import JsonLd from "../Components/JsonLd";
import { breadcrumbLd, pageMeta } from "../utils/seo";
import { fetchBlogs } from "../utils/serverApi";

export const metadata = pageMeta({
  title: "مقالات هولوگرام و برچسب‌های امنیتی",
  description:
    "مقاله‌ها و راهنماهای آذرهولوگرام درباره هولوگرام، لیبل هولوگرام، برچسب پلمپ و فناوری هولوگرافی.",
  path: "/Blog",
});

export const revalidate = 60;

const newestFirst = (a, b) => new Date(b.date) - new Date(a.date);

export default async function Blog() {
  const blogs = (await fetchBlogs()).sort(newestFirst);

  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "مقالات", path: "/Blog" }])} />
      <PageIntro
        eyebrow="مجله آذرهولوگرام"
        title="مقالات هولوگرام و لیبل‌های امنیتی"
        description="آخرین مقالات و راهنماها درباره هولوگرام، لیبل‌های امنیتی و فناوری هولوگرافی."
      />
      <BlogCard />
      <BlogRegular blogs={blogs} />
    </MainLayout>
  );
}
