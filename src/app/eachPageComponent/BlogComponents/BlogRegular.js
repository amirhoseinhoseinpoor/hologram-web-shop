"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import style from "../../Styles/BlogStyle/Blog.module.scss";
import { homePageBlogList } from "@/app/Store/thunks";
import { formatPersianDate } from "@/app/utils/persionDateUtils";
import { mediaUrl } from "@/app/utils/productContent";
import Pagination from "@/app/BaseComponent/Pagination";

const PAGE_SIZE = 10;
const OTHER_TYPE = "غیره";

const normalizeString = (str = "") => str.replace(/\s+/g, "").toLowerCase();

export default function BlogRegular() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState(searchParams.get("type"));
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    dispatch(homePageBlogList({ page: currentPage, limit: PAGE_SIZE }))
      .unwrap()
      .then((response) => {
        if (ignore) return;
        setBlogs(response.data || []);
        setTotalPages(response.pageCount || 1);
        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [currentPage, dispatch]);

  const blogTypes = [
    ...new Set(blogs.map((blog) => blog.content?.type || OTHER_TYPE)),
  ];

  const term = normalizeString(searchTerm);
  const visibleBlogs = blogs.filter((blog) => {
    const type = blog.content?.type || OTHER_TYPE;
    return (
      (!activeType || type === activeType) &&
      (normalizeString(blog.content?.title).includes(term) ||
        normalizeString(blog.content?.time).includes(term))
    );
  });

  return (
    <section className="az-section container">
      <div className={style.toolbar}>
        <div className={style.chips}>
          <button
            type="button"
            className={`az-chip ${!activeType ? "az-chip--active" : ""}`}
            aria-pressed={!activeType}
            onClick={() => setActiveType(null)}
          >
            همه
          </button>
          {blogTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`az-chip ${type === activeType ? "az-chip--active" : ""}`}
              aria-pressed={type === activeType}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className={style.search}>
          <SearchIcon aria-hidden="true" />
          <input
            type="search"
            className="az-input"
            aria-label="جست و جو در مقالات"
            placeholder="جست و جو در مقالات"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {status === "loading" && (
        <div className={style.grid} aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`az-skeleton ${style.skeleton}`} />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="az-alert az-alert--error" role="alert">
          دریافت مقالات با خطا مواجه شد. لطفا دوباره تلاش کنید.
        </div>
      )}

      {status === "ready" && visibleBlogs.length === 0 && (
        <div className="az-state" role="status">
          <p>نوشته‌ای پیدا نشد.</p>
          {searchTerm && (
            <p className="discription">
              نوشته‌ای مرتبط با «{searchTerm}» پیدا نشد؛ عبارت دیگری را امتحان
              کنید.
            </p>
          )}
        </div>
      )}

      {status === "ready" && visibleBlogs.length > 0 && (
        <div className={style.grid}>
          {visibleBlogs.map((blog) => (
            <article key={blog.code} className={style.featuredItem}>
              <Link href={`/Blog/${blog.content.title}`}>
                <div className={style.media}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mediaUrl(blog.content.imageSrc)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className={style.body}>
                  <p className={style.meta}>
                    {blog.content.time}
                    {blog.createdAt && ` | ${formatPersianDate(blog.createdAt)}`}
                  </p>
                  <h2>{blog.content.title}</h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
