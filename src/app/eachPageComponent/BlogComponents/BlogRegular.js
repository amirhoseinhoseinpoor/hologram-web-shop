"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import style from "../../Styles/BlogStyle/Blog.module.scss";
import { formatPersianDate } from "@/app/utils/persionDateUtils";
import { mediaUrl } from "@/app/utils/productContent";
import Pagination from "@/app/BaseComponent/Pagination";

const PAGE_SIZE = 12;
const OTHER_TYPE = "غیره";

const normalizeString = (str = "") => str.replace(/\s+/g, "").toLowerCase();

// The list arrives from the server, so the first page of article links is in the HTML
// that search engines read. Filtering, search and paging then run in the browser over
// the whole list.
export default function BlogRegular({ blogs = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Read ?type= after hydration: useSearchParams would keep this list out of the
  // server-rendered HTML.
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type) setActiveType(type);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeType]);

  const status = blogs.length ? "ready" : "error";

  const blogTypes = [
    ...new Set(blogs.map((blog) => blog.content?.type || OTHER_TYPE)),
  ];

  const term = normalizeString(searchTerm);
  const matches = blogs.filter((blog) => {
    const type = blog.content?.type || OTHER_TYPE;
    return (
      (!activeType || type === activeType) &&
      (normalizeString(blog.content?.title).includes(term) ||
        normalizeString(blog.content?.time).includes(term))
    );
  });
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const visibleBlogs = matches.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

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
                  <Image
                    src={mediaUrl(blog.content.imageSrc)}
                    alt={blog.content.title}
                    fill
                    sizes="(max-width: 520px) 100vw, (max-width: 992px) 50vw, 33vw"
                  />
                </div>
                <div className={style.body}>
                  <p className={style.meta}>
                    {blog.content.time}
                    {blog.date && ` | ${formatPersianDate(blog.date)}`}
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
