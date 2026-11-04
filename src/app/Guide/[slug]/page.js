import { notFound } from "next/navigation";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MainLayout from "@/app/layouts/MainLayout";
import PageIntro from "@/app/Components/ui/PageIntro";
import JsonLd from "@/app/Components/JsonLd";
import EditorialSections from "@/app/Components/content/EditorialSections";
import { COMPANY } from "@/app/utils/company";
import {
  breadcrumbLd,
  decodeFully,
  encodePath,
  pageMeta,
} from "@/app/utils/seo";
import { findGuide, PRODUCTS_HUB } from "@/app/utils/seoContent";

export async function generateMetadata({ params }) {
  const guide = findGuide(decodeFully(params.slug));
  if (!guide) {
    return { title: "صفحه پیدا نشد", robots: { index: false } };
  }
  return pageMeta({
    title: guide.title,
    description: guide.description,
    path: encodePath("Guide", guide.slug),
    type: "article",
  });
}

export default function GuidePage({ params }) {
  const guide = findGuide(decodeFully(params.slug));
  if (!guide) notFound();

  return (
    <MainLayout>
      <JsonLd
        data={breadcrumbLd([
          { name: "راهنما", path: "/Guide" },
          { name: guide.heading, path: encodePath("Guide", guide.slug) },
        ])}
      />
      <PageIntro
        eyebrow="راهنما"
        title={guide.heading}
        description={guide.lead}
        crumbLabel={guide.heading}
      >
        <div className="d-flex flex-wrap gap-2 mt-2">
          <Link href={encodePath(PRODUCTS_HUB)} className="az-btn az-btn--primary">
            انتخاب محصول و استعلام قیمت
            <ArrowBackIcon aria-hidden="true" />
          </Link>
          <a href={COMPANY.phoneHref} className="az-btn az-btn--outline-dark">
            <CallOutlinedIcon aria-hidden="true" />
            {COMPANY.phoneLabel}
          </a>
        </div>
      </PageIntro>
      <section className="az-section container">
        <EditorialSections
          sections={guide.sections}
          faq={guide.faq}
          links={guide.links}
        />
      </section>
    </MainLayout>
  );
}
