import { pageMeta } from "../utils/seo";
import { EFFECTS_SEO } from "../utils/seoContent";

export const metadata = pageMeta({
  title: EFFECTS_SEO.title,
  description: EFFECTS_SEO.description,
  path: "/EffectType",
});

export default function EffectTypeLayout({ children }) {
  return children;
}
