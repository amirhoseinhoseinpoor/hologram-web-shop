export const revalidate = 60; // ISR every 60 second

import MainLayout from "@/app/layouts/MainLayout";
import { notFound } from "next/navigation";
import ContentDetail from "@/app/Components/content/ContentDetail";

export async function generateMetadata({ params }) {
  const allHonors = await fetchHonors();
  const decodedId = decodeURIComponent(params.id);
  const honor = allHonors?.find(
    (item) => item.title.trim().toLowerCase() === decodedId.trim().toLowerCase()
  );

  if (!honor) {
    return {
      title: "افتخار یافت نشد",
      description: "افتخار مورد نظر یافت نشد.",
    };
  }

  const description = honor.content
    ? honor.content.replace(/<[^>]*>/g, "").slice(0, 160)
    : `${honor.title} - افتخارات آذرهولوگرام`;

  return {
    title: honor.title,
    description,
    alternates: {
      canonical: `/Honors/${encodeURIComponent(honor.title)}`,
    },
    openGraph: {
      title: honor.title,
      description,
      type: "article",
      images: honor.src
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${honor.src}`,
              alt: honor.title,
            },
          ]
        : [],
    },
  };
}

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

    const allHonors = await response.json();
    return Array.isArray(allHonors) ? allHonors : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function innerHonors({ params }) {
  const allHonors = await fetchHonors();
  const decodedId = decodeURIComponent(params.id);

  const honor = allHonors.find(
    (item) => item.title.trim().toLowerCase() === decodedId.trim().toLowerCase(),
  );

  if (!honor) {
    notFound();
  }

  return (
    <MainLayout>
      <ContentDetail item={honor} />
    </MainLayout>
  );
}
