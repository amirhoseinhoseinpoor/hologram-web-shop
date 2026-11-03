import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InventoryOutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import style from "./ProductCard.module.scss";

// Takes the output of toProductView(); shared by the home page, catalog and
// related products so every product looks the same wherever it appears.
export default function ProductCard({ product, showCategory = false }) {
  const summary = product.intro || product.details;

  return (
    <article className={style.card}>
      <Link href={product.href} className={style.link}>
        <div className={style.media}>
          {product.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.cover} alt={product.name} loading="lazy" />
          ) : (
            <div className={style.noImage}>
              <InventoryOutlinedIcon aria-hidden="true" />
              <span>تصویر در دسترس نیست</span>
            </div>
          )}
        </div>
        <div className={style.body}>
          {showCategory && product.category && (
            <span className={style.category}>{product.category}</span>
          )}
          <h3 className={style.title}>{product.name}</h3>
          {summary && <p className={style.summary}>{summary}</p>}
          <span className={style.more}>
            مشاهده محصول
            <ArrowBackIcon aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
