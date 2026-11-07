import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InventoryOutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import style from "./ProductCard.module.scss";

// Takes the output of toProductView(); shared by the home page, catalog and
// related products so every product looks the same wherever it appears.
export default function ProductCard({
  product,
  showCategory = false,
  priority = false,
}) {
  const summary = product.intro || product.detailsText;

  return (
    <article className={style.card}>
      <Link href={product.href} className={style.link}>
        <div className={style.media}>
          {product.cover ? (
            <Image
              src={product.cover}
              alt={product.title}
              fill
              sizes="(max-width: 520px) 100vw, (max-width: 992px) 50vw, 33vw"
              priority={priority}
            />
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
          <h3 className={style.title}>{product.title}</h3>
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
