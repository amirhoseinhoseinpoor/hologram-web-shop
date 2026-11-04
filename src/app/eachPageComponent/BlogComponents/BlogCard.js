import Image from "next/image";
import Link from "next/link";
import style from "../../Styles/BlogStyle/Blog.module.scss";
import { formatPersianDate } from "@/app/utils/persionDateUtils";
import { mediaUrl } from "@/app/utils/productContent";
import { fetchBlogs } from "@/app/utils/serverApi";

export const revalidate = 60; // ISR every 60 seconds

// Editor's picks: blogs flagged as priority in the admin panel.
export default async function BlogCard() {
  const blogs = await fetchBlogs();
  const featured = blogs.filter((item) => item.content?.priority === true);

  // With only a few articles this would just repeat the list below it.
  if (featured.length === 0 || blogs.length <= 3) return null;

  return (
    <section className="az-section az-section--soft">
      <div className={`container ${style.featured}`}>
        {featured.slice(0, 3).map((blog, index) => (
          <article
            key={blog.code}
            className={index === 0 ? style.featuredLead : style.featuredItem}
          >
            <Link href={`/Blog/${blog.content.title}`}>
              <div className={style.media}>
                <Image
                  src={mediaUrl(blog.content.imageSrc)}
                  alt={blog.content.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={style.body}>
                <p className={style.meta}>
                  {blog.content.time} | {formatPersianDate(blog.date)}
                </p>
                <h2>{blog.content.title}</h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
