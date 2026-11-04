import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageIntro from "../ui/PageIntro";
import style from "./Content.module.scss";
import { mediaUrl } from "../../utils/productContent";
import { formatPersianDate } from "../../utils/persionDateUtils";

// Honors and exhibitions share the same shape: { title, date, src, content }.
export default function ContentListing({
  title,
  description,
  basePath,
  items,
  emptyText,
}) {
  return (
    <>
      <PageIntro title={title} description={description} />
      <section className="az-section container">
        {items.length === 0 ? (
          <div className="az-state">
            <p>{emptyText}</p>
          </div>
        ) : (
          <div className={style.grid}>
            {items.map((item) => (
              <article key={item.code || item.title} className={style.card}>
                <Link href={`${basePath}/${item.title}`}>
                  <div className={style.cardMedia}>
                    <Image
                      src={mediaUrl(item.src)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 520px) 100vw, (max-width: 992px) 50vw, 33vw"
                    />
                  </div>
                  <div className={style.cardBody}>
                    <time dateTime={item.date}>
                      {formatPersianDate(item.date)}
                    </time>
                    <h2>{item.title}</h2>
                    <span className={style.more}>
                      مشاهده
                      <ArrowBackIcon aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
