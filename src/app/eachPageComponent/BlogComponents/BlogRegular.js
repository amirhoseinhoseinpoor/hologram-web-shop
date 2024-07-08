"use client";
import React from "react";
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
  return (
    <section className="container">
      <div className={style.inputStyle}>
        <div>
          <input type="text" placeholder="جست و جو" />
        </div>
        <div className={style.searchIconposition}>
          <SearchIcon />
        </div>
      </div>

      <div className={style.test}>
        <Tabs
          id="controlled-tab-example"
          //  activeKey={key}
          //  onSelect={(k) => setKey(k)}
          className={`${style.buttonsTabbed}`}
        >
          {blogs.map((blog, index) => (
            <Tab key={index} eventKey={blog.type} title={blog.type}>
              {blog.card.map((cards, index) => (
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
                          {cards.title}
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                </React.Fragment>
              ))}
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
