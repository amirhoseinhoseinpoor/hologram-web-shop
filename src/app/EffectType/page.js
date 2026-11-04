import React from "react";
import MainLayout from "../layouts/MainLayout";
import PageIntro from "../Components/ui/PageIntro";
import JsonLd from "../Components/JsonLd";
import EffectBrowser from "../eachPageComponent/EffectType/EffectBrowser";
import style from "../Styles/EffectType/EffectType.module.scss";
import { toProductView } from "../utils/productContent";
import { breadcrumbLd } from "../utils/seo";
import { EFFECTS, EFFECTS_SEO } from "../utils/seoContent";
import {
  fetchHeaderItems,
  fetchProducts,
  getCategories,
} from "../utils/serverApi";

export default async function EffectTypePage({ searchParams }) {
  const [products, headerItems] = await Promise.all([
    fetchProducts(),
    fetchHeaderItems(),
  ]);

  const categories = getCategories(headerItems).map((category) => ({
    title: category.title,
    names: (category.subItems || []).map((item) => item.title),
  }));

  // Only what the gallery draws, so the page payload stays small.
  const views = products.map(toProductView).map((view) => ({
    code: view.code,
    name: view.name,
    title: view.title,
    href: view.href,
    gallery: view.gallery,
    videos: view.videos,
  }));

  return (
    <MainLayout>
      <JsonLd data={breadcrumbLd([{ name: "افکت‌ها", path: "/EffectType" }])} />
      <PageIntro
        eyebrow="افکت‌ها"
        title={EFFECTS_SEO.heading}
        description={EFFECTS_SEO.lead}
      />
      <section className="az-section az-section--soft">
        <div className="container">
          <h2 className={`az-h2 ${style.heading}`}>افکت‌های امنیتی هولوگرام</h2>
          <dl className={style.effects}>
            {EFFECTS.map((effect) => (
              <div key={effect.name}>
                <dt>{effect.name}</dt>
                <dd>{effect.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <EffectBrowser
        categories={categories}
        products={views}
        initialType={searchParams?.type}
      />
    </MainLayout>
  );
}
