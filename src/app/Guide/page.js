import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";
import JsonLd from "../Components/JsonLd";
import style from "../Components/content/Content.module.scss";
import { breadcrumbLd, encodePath, pageMeta } from "../utils/seo";
import { GUIDE_INDEX_SEO, GUIDES } from "../utils/seoContent";

export const metadata = pageMeta({
  title: GUIDE_INDEX_SEO.title,
  description: GUIDE_INDEX_SEO.description,
  path: "/Guide",
});

export default function GuideIndex() {
  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "راهنما", path: "/Guide" }])} />
      <PageIntro
        eyebrow="راهنما"
        title={GUIDE_INDEX_SEO.heading}
        description={GUIDE_INDEX_SEO.lead}
      />
      <section className="az-section container">
        <div className={style.grid}>
          {GUIDES.map((guide) => (
            <article key={guide.slug} className={style.card}>
              <Link href={encodePath("Guide", guide.slug)}>
                <div className={style.cardBody}>
                  <h2>{guide.heading}</h2>
                  <p>{guide.summary}</p>
                  <span className={style.more}>
                    مطالعه راهنما
                    <ArrowBackIcon aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
