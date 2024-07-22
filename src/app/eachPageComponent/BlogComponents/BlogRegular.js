"use client";

import { useSearchParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import style from "../../Styles/BlogStyle/BlogRegular.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import blogs from "/public/json/BlogPage.json";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Box } from "@mui/material";

export default function BlogRegular() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");


  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(type || "هولوگرام");
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  function fixTitleSize(text) {
    var shortTitle;
    if (text.length > 60) {
      shortTitle = text.slice(0, 60) + "...";
      return shortTitle;
    } else {
      return text;
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  const filteredBlogs = blogs.map((blog) => ({
    ...blog,
    card: blog.card.filter((cards) => {
      const normalizedTitle = cards.title ? normalizeString(cards.title) : "";
      const normalizeddate = cards.date ? normalizeString(cards.date) : "";
      const normalizedSearchTerm = normalizeString(searchTerm);
      return (
        normalizedTitle.includes(normalizedSearchTerm) ||
        normalizeddate.includes(normalizedSearchTerm)
      );
    }),
  }));

  return (
    <section className="container">
      <div className={style.inputStyle}>
        <div>
          <input
            type="text"
            placeholder="جست و جو"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={style.searchIconposition}>
          <Box
            sx={{
              width: 37,
              height: 37,
              display: "flex",
              alignItems: "center",
              padding: 1,
              marginRight: "-15px",
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

      <div className={style.test}>
        <Tabs
          id="controlled-tab-example"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className={`${style.buttonsTabbed}`}
        >
          {filteredBlogs.map((blog, index) => (
            <Tab key={index} eventKey={blog.type} title={blog.type}>
              {blog.card.length > 0 ? (
                blog.card.map((cards, index) => (
                  <React.Fragment key={index}>
                    <Card
                      className={`${style.mainCardStyle} ${style.adjustpriority}`}
                    >
                      <Link
                        className="text-decoration-none"
                        href={`/Blog/${cards.id}`}
                        passHref
                      >
                        <CardMedia
                          className={`${style.fixBoxSize} gap-3`}
                          component="img"
                          image={cards.imageSrc}
                          alt={cards.title}
                        />

                        <CardContent className={style.adjustContent}>
                          <Typography
                            className={`${style.dateTime} discription`}
                            gutterBottom
                            variant="span"
                            component="div"
                          >
                            {cards.time} | {cards.date}
                          </Typography>
                          <Typography
                            className="subitem"
                            gutterBottom
                            variant="p"
                            component="div"
                          >
                            {fixTitleSize(cards.title)}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </React.Fragment>
                ))
              ) : (
                <div className="d-flex flex-column mt-5 justify-content-center">
                  <p>نوشته‌ایی پیدا نشد</p>
                  <p className="text-center mt-3">
                    متاسفانه، نوشته‌ای مرتبط با عبارت
                     {searchTerm} پیدا نشد. لطفا عبارت خود
                    را تغیر داده و مجددا تلاش نمایید.
                  </p>
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
