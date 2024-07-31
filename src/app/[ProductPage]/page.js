import React from "react";
import fs from "fs";
import path from "path";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HoleProductAndSearch from "../eachPageComponent/ProductPageComponent/HoleProductAndSearch";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import ShowRoute from "../Components/ShowRoute";
import { notFound } from "next/navigation";
import Link from "next/link";
import style from "../Styles/ProductPage/DynamicProductPage.module.scss";

function getProductDetailsById(id) {
  const filePath = path.join(process.cwd(), "public", "json", "Header.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(jsonData);

  const decodedId = decodeURIComponent(id);
  const slashDecodedId = "/" + decodedId;

  let matchedTitle = null;
  const links = [];
  const titles = [];
  const itemsClick = [];

  function extractLinksAndTitles(items) {
    items.forEach((item) => {
      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach((subItem) => {
          if (subItem.link) {
            links.push(subItem.link);
          }
          if (subItem.title) {
            titles.push(subItem.title);
          }
          if (subItem.link === slashDecodedId) {
            matchedTitle = subItem.title;
          }
          if (subItem.link === slashDecodedId && subItem.subItems.length > 0) {
            subItem.subItems.forEach((innnerSub) => {
              itemsClick.push(innnerSub);
            });
          }
        });
      }
    });
  }

  extractLinksAndTitles(products);
  return { links, titles, matchedTitle, itemsClick };
}

function fixTitleSize(text) {
  var shortTitle;
  if (text.length > 60) {
    shortTitle = text.slice(0, 60) + "...";
    return shortTitle;
  } else {
    return text;
  }
}



export default function ProductPage({ params }) {
  const { ProductPage: id } = params;

  const { links, titles, matchedTitle, itemsClick } = getProductDetailsById(id);

  if (!matchedTitle) {
    notFound();
  }

  return (
    <>
      <Header />
      <section className="container">
        <ShowRoute />
        <div className={style.fixContentSizePlace}>
          {itemsClick.map((item, index) => (
            <React.Fragment key={index}>
              <Card className={`${style.mainCardStyle} `}>
                <Link className="text-decoration-none" href={`/Blog`} passHref>
                  <CardMedia
                    className={`${style.fixBoxSize} gap-3`}
                    component="img"
                    image={item.src}
                    alt={item.title}
                  />

                  <CardContent className={style.adjustContent}>
                
                    <Typography
                      className="discription"
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      {fixTitleSize(item.title)}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </React.Fragment>
          ))}
        </div>

        <HoleProductAndSearch
          itemsClick={itemsClick}
         
        />
       
      </section>
      <Footer />
    </>
  );
}
