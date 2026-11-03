export const revalidate = 60; // ISR every 60 second
import React from "react";

import MainLayout from "../layouts/MainLayout";
import ContentListing from "../Components/content/ContentListing";

export const metadata = {
  title: "افتخارات",
  description:
    "افتخارات و دستاوردهای شرکت آذرهولوگرام در صنعت هولوگرام و چاپ امنیتی ایران.",
  alternates: {
    canonical: "/Honors",
  },
  openGraph: {
    title: "افتخارات | آذرهولوگرام",
    description:
      "افتخارات و دستاوردهای شرکت آذرهولوگرام در صنعت هولوگرام و چاپ امنیتی.",
  },
};

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
