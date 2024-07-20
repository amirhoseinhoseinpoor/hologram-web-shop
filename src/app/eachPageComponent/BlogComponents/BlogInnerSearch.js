"use client";
import React from "react";
import { Box } from "@mui/material";

import style from "../../Styles/BlogStyle/BloginnerSearch.module.scss";
import blogPage from "/public/json/BlogPage.json";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
          <Box
            sx={{
              width: 37,
              height: 37,
              display: "flex",
              alignItems: "center",
              padding: 1,
              marginRight : "-15px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
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
