"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import style from "../../Styles/BlogStyle/Blog.module.scss";

const normalizeString = (str = "") => str.replace(/\s+/g, "").toLowerCase();

export default function BlogInnerSearch({ allBlogs }) {
  const [searchTerm, setSearchTerm] = useState("");

  const term = normalizeString(searchTerm);
  const results = term
    ? allBlogs.filter((blog) =>
        normalizeString(blog.content?.title).includes(term),
      )
    : [];

  return (
    <div className={style.asideBlock}>
      <div className={style.search}>
        <SearchIcon aria-hidden="true" />
        <input
          type="search"
          className="az-input"
          aria-label="جست و جو در همه مقاله‌ها"
          placeholder="جست و جو در همه مقاله‌ها"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {term && (
        <ul className={style.searchResults} aria-live="polite">
          {results.length === 0 && <li>نتیجه‌ای پیدا نشد.</li>}
          {results.map((blog) => (
            <li key={blog.code}>
              <Link href={`/Blog/${blog.content.title}`}>
                {blog.content.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
