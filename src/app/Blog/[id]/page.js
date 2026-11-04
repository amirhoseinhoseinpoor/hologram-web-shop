export const revalidate = 60; // ISR every 60 seconds

import MainLayout from "@/app/layouts/MainLayout";
import JsonLd from "@/app/Components/JsonLd";
import { notFound } from "next/navigation";
import BlogArticle from "@/app/eachPageComponent/BlogComponents/BlogArticle";
import { COMPANY } from "@/app/utils/company";
import { mediaUrl } from "@/app/utils/productContent";
import {
  absoluteUrl,
  breadcrumbLd,
  encodePath,
  pageMeta,
  plainText,
  SITE_URL,
} from "@/app/utils/seo";
import { fetchBlogs } from "@/app/utils/serverApi";

const findPost = (blogs, id) => {
  const title = decodeURIComponent(id).trim().toLowerCase();
  return blogs.find((item) => item.content.title?.trim().toLowerCase() === title);
};

export async function generateMetadata({ params }) {
  const blogPost = findPost(await fetchBlogs(), params.id);

  if (!blogPost) {
    return { title: "مقاله یافت نشد", robots: { index: false } };
  }

  const { title, content, imageSrc } = blogPost.content;
  return pageMeta({
    title,
    description:
      plainText(content) || `مقاله ${title} در وبلاگ آذرهولوگرام`,
    path: encodePath("Blog", title),
    image: mediaUrl(imageSrc),
    imageAlt: title,
    type: "article",
    publishedTime: blogPost.date,
  });
}

export default async function BlogPostPage({ params }) {
  const allBlogs = await fetchBlogs();
  const blogPost = findPost(allBlogs, params.id);

  if (!blogPost) {
    notFound();
  }

  const path = encodePath("Blog", blogPost.content.title);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogPost.content.title,
    image: mediaUrl(blogPost.content.imageSrc),
    datePublished: blogPost.date,
    inLanguage: "fa-IR",
    author: { "@type": "Organization", name: COMPANY.name, url: `${SITE_URL}/` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(path),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbLd([
          { name: "مقالات", path: "/Blog" },
          { name: blogPost.content.title, path },
        ])}
      />
      <MainLayout>
        <BlogArticle post={blogPost} allBlogs={allBlogs} />
      </MainLayout>
    </>
  );
}
