export const revalidate = 60; // ISR every 60 second
import React from "react";

import MainLayout from "../layouts/MainLayout";
import ContentListing from "../Components/content/ContentListing";
import JsonLd from "../Components/JsonLd";
import { breadcrumbLd, pageMeta } from "../utils/seo";

export const metadata = pageMeta({
  title: "افتخارات و دستاوردهای آذرهولوگرام",
  description:
    "افتخارات و دستاوردهای شرکت آذرهولوگرام در صنعت هولوگرام و چاپ امنیتی ایران.",
  path: "/Honors",
});

async function fetchHonors() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/honors/list`,
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

export default async function Honors() {
  const honors = await fetchHonors();

  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "افتخارات", path: "/Honors" }])} />
      <ContentListing
        title="افتخارات"
        description="گواهینامه‌ها و دستاوردهای آذرهولوگرام در صنعت هولوگرام."
        basePath="/Honors"
        items={honors}
        emptyText="هنوز افتخاری ثبت نشده است."
      />
    </MainLayout>
  );
}
