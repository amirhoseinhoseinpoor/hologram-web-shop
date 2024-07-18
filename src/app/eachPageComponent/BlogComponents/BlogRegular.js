"use client";

import { useSearchParams } from 'next/navigation';

import React, { useState , useEffect} from "react";
import style from "../../Styles/BlogStyle/BlogRegular.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import blogs from "/public/json/BlogPage.json";
import SearchIcon from "@mui/icons-material/Search";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function BlogRegular() {

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  console.log(type);



  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(type || 'defaultTab');
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
      const normalizedTitle = cards.title ? normalizeString(cards.title) : '';
      const normalizeddate = cards.date ? normalizeString(cards.date) : '';
      const normalizedSearchTerm = normalizeString(searchTerm);
      return normalizedTitle.includes(normalizedSearchTerm) || normalizeddate.includes(normalizedSearchTerm);
        
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
          <SearchIcon />
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
                  <p className="text-center mt-3">متاسفانه، نوشته‌ای مرتبط با عبارت {"{یه متنی که توی هیچ بلاگی نیست}"} پیدا نشد. لطفا عبارت خود را تغیر داده و مجددا تلاش نمایید.</p>

                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
