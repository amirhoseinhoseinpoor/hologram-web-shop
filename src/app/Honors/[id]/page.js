export const revalidate = 60; // ISR every 60 second

import MainLayout from "@/app/layouts/MainLayout";
import { notFound } from "next/navigation";
import ContentDetail from "@/app/Components/content/ContentDetail";
import JsonLd from "@/app/Components/JsonLd";
import { mediaUrl } from "@/app/utils/productContent";
import { breadcrumbLd, encodePath, pageMeta, plainText } from "@/app/utils/seo";
import { fetchHonors } from "@/app/utils/serverApi";

const findHonor = (honors, id) => {
  const title = decodeURIComponent(id).trim().toLowerCase();
  return honors.find((item) => item.title.trim().toLowerCase() === title);
};

export async function generateMetadata({ params }) {
  const honor = findHonor(await fetchHonors(), params.id);

  if (!honor) {
    return { title: "افتخار یافت نشد", robots: { index: false } };
  }

  return pageMeta({
    title: honor.title,
    description:
      plainText(honor.content) || `${honor.title} - افتخارات آذرهولوگرام`,
    path: encodePath("Honors", honor.title),
    image: mediaUrl(honor.src),
    imageAlt: honor.title,
    type: "article",
  });
}

export default async function innerHonors({ params }) {
  const honor = findHonor(await fetchHonors(), params.id);

  if (!honor) {
    notFound();
  }

  return (
    <MainLayout>
      <JsonLd
        data={breadcrumbLd([
          { name: "افتخارات", path: "/Honors" },
          { name: honor.title, path: encodePath("Honors", honor.title) },
        ])}
      />
      <ContentDetail item={honor} />
    </MainLayout>
  );
}
