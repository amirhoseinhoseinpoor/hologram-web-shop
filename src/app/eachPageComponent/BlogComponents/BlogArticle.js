import React from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "../../Styles/BlogStyle/Blog.module.scss";
import BlogInnerSearch from "./BlogInnerSearch";
import CopyLinkButton from "@/app/Components/CopyLinkButton";
import PageIntro from "@/app/Components/ui/PageIntro";
import { formatPersianDate } from "@/app/utils/persionDateUtils";
import { mediaUrl, normalizeProductLink } from "@/app/utils/productContent";

const splitList = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

// Gives every <h2> and <h3> an id so the table of contents can link to it. The contents
// list the article's top level: its <h2>s, or its <h3>s when it has no <h2>.
const withHeadingIds = (content = "") => {
  const headings = [];
  const html = content.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level, text) => {
    const id = `heading-${headings.length}`;
    headings.push({ id, level, text: text.replace(/<[^>]*>/g, "") });
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
  const top = headings.some((heading) => heading.level === "2") ? "2" : "3";
  return { html, headings: headings.filter((heading) => heading.level === top) };
};

// Words too common across the articles to say anything about relatedness.
const COMMON_WORDS = new Set(["هولوگرام", "برچسب", "چیست", "و", "در", "از", "با", "به"]);
const words = (text = "") =>
  text
    .split(/[\s,،؛؟?:()]+/)
    .filter((word) => word.length > 1 && !COMMON_WORDS.has(word));

// Ranks other articles by the tags and title words they share with this one.
function relatedPosts(post, allBlogs, count = 3) {
  const tags = new Set(splitList(post.content.tags));
  const vocabulary = new Set(words(`${post.content.title} ${post.content.tags}`));
  return allBlogs
    .filter((blog) => blog.code !== post.code && blog.content?.title)
    .map((blog) => {
      const sharedTags = splitList(blog.content.tags).filter((tag) => tags.has(tag)).length;
      const sharedWords = new Set(
        words(`${blog.content.title} ${blog.content.tags}`).filter((word) => vocabulary.has(word)),
      ).size;
      return { blog, score: sharedTags * 3 + sharedWords };
    })
    .sort((a, b) => b.score - a.score || new Date(b.blog.date) - new Date(a.blog.date))
    .slice(0, count)
    .map(({ blog }) => blog);
}

export default function BlogArticle({ post, allBlogs }) {
  const { content, date } = post;
  const { html, headings } = withHeadingIds(content.content);
  const positives = splitList(content.posetives);
  const negatives = splitList(content.negetive);
  const tags = splitList(content.tags);

  const related = relatedPosts(post, allBlogs);

  return (
    <>
      <PageIntro
        eyebrow={content.type}
        title={content.title}
        description={`${content.time} مطالعه | ${formatPersianDate(date)}`}
      />

      <div className={`container ${style.article}`}>
        <article className={style.articleMain}>
          <div className={style.articleImage}>
            <Image
              src={mediaUrl(content.imageSrc)}
              alt={content.title}
              width={1200}
              height={675}
              sizes="(max-width: 992px) 100vw, 66vw"
              priority
            />
          </div>

          {(positives.length > 0 || negatives.length > 0) && (
            <div className={style.prosCons}>
              {positives.length > 0 && (
                <div>
                  <h2 className={style.prosTitle}>نقاط مثبت</h2>
                  <ul>
                    {positives.map((item) => (
                      <li key={item}>
                        <AddCircleOutlineIcon aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {negatives.length > 0 && (
                <div>
                  <h2 className={style.consTitle}>نقاط منفی</h2>
                  <ul>
                    {negatives.map((item) => (
                      <li key={item}>
                        <RemoveCircleOutlineIcon aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="az-rich-content">{parse(html)}</div>

          {content.product?.link && (
            <div className={style.productCta}>
              {content.product.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl(content.product.src)}
                  alt=""
                  loading="lazy"
                />
              )}
              <div>
                <p className="az-h3">{content.product.title}</p>
                <Link
                  href={normalizeProductLink(content.product.link)}
                  className="az-btn az-btn--primary az-btn--sm"
                >
                  ثبت سفارش
                  <ArrowBackIcon aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          <div className={style.articleFoot}>
            {tags.length > 0 && (
              <ul className={style.tags}>
                {tags.map((tag) => (
                  <li key={tag}>
                    <a href={`/Blog?tag=${encodeURIComponent(tag)}`} rel="tag">
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <CopyLinkButton />
          </div>
        </article>

        <aside className={style.aside}>
          <BlogInnerSearch allBlogs={allBlogs} />
          {headings.length > 0 && (
            <nav className={style.toc} aria-label="سرفصل‌ها">
              <p className="az-h3">سرفصل‌ها</p>
              <ul>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="az-section az-section--soft">
          <div className="container">
            <h2 className={`az-h2 ${style.relatedTitle}`}>مقالات مرتبط</h2>
            <div className={style.grid}>
              {related.map((blog) => (
                <article key={blog.code} className={style.featuredItem}>
                  <Link href={`/Blog/${blog.content.title}`}>
                    <div className={style.media}>
                      <Image
                        src={mediaUrl(blog.content.imageSrc)}
                        alt={blog.content.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className={style.body}>
                      <p className={style.meta}>مطالعه: {blog.content.time}</p>
                      <h2>{blog.content.title}</h2>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
