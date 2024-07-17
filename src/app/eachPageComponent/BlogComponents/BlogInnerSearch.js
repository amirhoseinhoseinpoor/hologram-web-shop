"use client";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import style from "../../Styles/BlogStyle/BloginnerSearch.module.scss"
import blogPage from "/public/json/BlogPage.json"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogInnerSearch() {
    const router = useRouter();


    const handleCategoryClick = (blogType) => {
        router.push(`/Blog?type=${encodeURIComponent(blogType)}`);
    };



  return (
    <>
      <div className={style.inputStyle}>
        <div>
          <input type="text" placeholder="جست و جو در همه مقاله‌ها" />
        </div>
        <div className={style.searchIconposition}>
          <SearchIcon />
        </div>
      </div>

      <div className="d-flex flex-column">
        <p className="subitem mt-2 mb-1">دسته بندی</p>
        <ul>
          {blogPage.map((blog, index) => (
            <React.Fragment key={index}>
              <li
                className={`${style.borderbuttom} d-flex flex-row justify-content-between pb-2 pt-2`}
                onClick={() => handleCategoryClick(blog.type)}
              >
                <p>{blog.type}</p>
                <p>2</p>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
}
