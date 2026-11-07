export const revalidate = 60; // ISR every 60 second

import MainLayout from "@/app/layouts/MainLayout";
import { notFound, permanentRedirect } from "next/navigation";
import ContentDetail from "@/app/Components/content/ContentDetail";
import JsonLd from "@/app/Components/JsonLd";
import { mediaUrl } from "@/app/utils/productContent";
import { breadcrumbLd, encodePath, pageMeta, plainText } from "@/app/utils/seo";
import { fetchExhibitions } from "@/app/utils/serverApi";
import { isRetired } from "@/app/utils/seoContent";

const findExhibition = (exhibitions, id) => {
  const title = decodeURIComponent(id).trim().toLowerCase();
  return exhibitions.find((item) => item.title.trim().toLowerCase() === title);
};

export async function generateMetadata({ params }) {
  const exhibition = findExhibition(await fetchExhibitions(), params.id);

  if (!exhibition) {
    return { title: "نمایشگاه یافت نشد", robots: { index: false } };
  }

  return pageMeta({
    title: exhibition.title,
    description:
      plainText(exhibition.content) ||
      `نمایشگاه ${exhibition.title} - آذرهولوگرام`,
    path: encodePath("Exhibition", exhibition.title),
    image: mediaUrl(exhibition.src),
    imageAlt: exhibition.title,
    type: "article",
  });
}

export default async function innerExhibition({ params }) {
  const exhibition = findExhibition(await fetchExhibitions(), params.id);

  if (!exhibition) {
    if (isRetired("Exhibition", params.id)) permanentRedirect("/Exhibition");
    notFound();
  }

  return (
    <MainLayout>
      <JsonLd
        data={breadcrumbLd([
          { name: "نمایشگاه‌ها", path: "/Exhibition" },
          {
            name: exhibition.title,
            path: encodePath("Exhibition", exhibition.title),
          },
        ])}
      />
      <ContentDetail item={exhibition} />
    </MainLayout>
  );
}
