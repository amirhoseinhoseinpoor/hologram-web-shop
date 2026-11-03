export const revalidate = 60; // ISR every 60 second

import MainLayout from "@/app/layouts/MainLayout";
import { notFound } from "next/navigation";
import ContentDetail from "@/app/Components/content/ContentDetail";

export async function generateMetadata({ params }) {
  const allExhibitions = await fetchExhibition();
  const decodedId = decodeURIComponent(params.id);
  const exhibition = allExhibitions.find(
    (item) => item.title.trim().toLowerCase() === decodedId.trim().toLowerCase()
  );

  if (!exhibition) {
    return {
      title: "نمایشگاه یافت نشد",
      description: "نمایشگاه مورد نظر یافت نشد.",
    };
  }

  const description = exhibition.content
    ? exhibition.content.replace(/<[^>]*>/g, "").slice(0, 160)
    : `نمایشگاه ${exhibition.title} - آذرهولوگرام`;

  return {
    title: exhibition.title,
    description,
    alternates: {
      canonical: `/Exhibition/${encodeURIComponent(exhibition.title)}`,
    },
    openGraph: {
      title: exhibition.title,
      description,
      type: "article",
      images: exhibition.src
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${exhibition.src}`,
              alt: exhibition.title,
            },
          ]
        : [],
    },
  };
}

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

    const allHonors = await response.json();
    return Array.isArray(allHonors) ? allHonors : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function innerExhibition({ params }) {
  const allExhibitions = await fetchExhibition();
  const decodedId = decodeURIComponent(params.id);

  const exhibition = allExhibitions.find(
    (item) => item.title.trim().toLowerCase() === decodedId.trim().toLowerCase(),
  );

  if (!exhibition) {
    notFound();
  }

  return (
    <MainLayout>
      <ContentDetail item={exhibition} />
    </MainLayout>
  );
}
