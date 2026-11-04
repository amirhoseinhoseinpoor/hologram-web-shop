export const revalidate = 60; // ISR every 60 seconds

import MainLayout from "@/app/layouts/MainLayout";
import JsonLd from "@/app/Components/JsonLd";
import { notFound } from "next/navigation";
import BlogArticle from "@/app/eachPageComponent/BlogComponents/BlogArticle";

export async function generateMetadata({ params }) {
  const allBlogs = await fetchBlogs();
  const decodedId = decodeURIComponent(params.id);
  const blogPost = allBlogs.find(
    (item) =>
      item.content.title?.trim().toLowerCase() === decodedId.trim().toLowerCase()
  );

  if (!blogPost) {
    return {
      title: "مقاله یافت نشد",
      description: "مقاله مورد نظر یافت نشد.",
    };
  }

  const description = blogPost.content.content
    ? blogPost.content.content.replace(/<[^>]*>/g, "").slice(0, 160)
    : `مقاله ${blogPost.content.title} در وبلاگ آذرهولوگرام`;

  return {
    title: blogPost.content.title,
    description,
    alternates: {
      canonical: `/Blog/${encodeURIComponent(blogPost.content.title)}`,
    },
    openGraph: {
      title: blogPost.content.title,
      description,
      type: "article",
      publishedTime: blogPost.date,
      images: blogPost.content.imageSrc
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${blogPost.content.imageSrc}`,
              alt: blogPost.content.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.content.title,
      description,
      images: blogPost.content.imageSrc
        ? [`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${blogPost.content.imageSrc}`]
        : [],
    },
  };
}

async function fetchBlogs() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/blogs/list`,
      {
        // Ensures fresh data every 60 seconds
        next: { revalidate: 60 },
        headers: {
          Origin: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }

    const honors = await response.json();
    return Array.isArray(honors) ? honors : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function BlogPostPage({ params }) {
  const allBlogs = await fetchBlogs();
  const decodedId = decodeURIComponent(params.id);

  const blogPost = allBlogs.find(
    (item) =>
      item.content.title?.trim().toLowerCase() === decodedId.trim().toLowerCase(),
  );

  if (!blogPost) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.co";
  const backendUrl = process.env.NEXT_PUBLIC_BACK_END_SERVER;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogPost.content.title,
    image: `${backendUrl}/system/download/${blogPost.content.imageSrc}`,
    datePublished: blogPost.date,
    author: { "@type": "Organization", name: "آذرهولوگرام" },
    publisher: {
      "@type": "Organization",
      name: "آذرهولوگرام",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/LOGO/azarhologram-icon.png`,
      },
    },
    url: `${siteUrl}/Blog/${encodeURIComponent(blogPost.content.title)}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <MainLayout>
        <BlogArticle post={blogPost} allBlogs={allBlogs} />
      </MainLayout>
    </>
  );
}
