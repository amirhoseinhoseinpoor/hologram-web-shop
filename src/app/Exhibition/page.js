export const revalidate = 60; // ISR every 60 second
import React from "react";

import MainLayout from "../layouts/MainLayout";
import ContentListing from "../Components/content/ContentListing";

export const metadata = {
  title: "نمایشگاه‌ها",
  description:
    "حضور آذرهولوگرام در نمایشگاه‌های داخلی و بین‌المللی. گزارش تصویری و اخبار نمایشگاه‌های مرتبط با صنعت هولوگرام و چاپ.",
  alternates: {
    canonical: "/Exhibition",
  },
  openGraph: {
    title: "نمایشگاه‌ها | آذرهولوگرام",
    description:
      "حضور آذرهولوگرام در نمایشگاه‌های داخلی و بین‌المللی صنعت هولوگرام و چاپ.",
  },
};

async function fetchExhibition() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/exhibition/list`,
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

    const exhibition = await response.json();
    return Array.isArray(exhibition) ? exhibition : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function Exhibition() {
  const exhibitions = await fetchExhibition();

  return (
    <MainLayout>
      <ContentListing
        title="نمایشگاه‌ها"
        description="حضور آذرهولوگرام در نمایشگاه‌های داخلی و بین‌المللی صنعت چاپ و بسته‌بندی."
        basePath="/Exhibition"
        items={exhibitions}
        emptyText="هنوز نمایشگاهی ثبت نشده است."
      />
    </MainLayout>
  );
}
