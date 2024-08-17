import React from "react";

import HeaderSeo from "../Components/HeaderSeo";
import style from "../Styles/HonorsPageStyle/Honors.module.scss";
import honors from "/public/json/HonorsPage.json";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MainLayout from "../layouts/MainLayout";

export default function Honors() {
  function fixTitleSize(text) {
    var shortTitle;
    if(text.length > 60) {
      shortTitle = text.slice(0 , 60) + "...";
      return shortTitle;
    }else{
      return text
    }
  }
  return (
    <>
    <MainLayout>
      <HeaderSeo />
      <section>
        <div className={`${style.MainDiv} container`}>
          {honors.map((honor, index) => (
            <React.Fragment key={index}>
              <Card
                className={`${style.mainCardStyle} ${style.adjustpriority}`}
              >
                <Link
                  className="text-decoration-none"
                  href={`/Honors/${honor.id}`}
                  passHref
                >
                  <CardMedia
                    className={`${style.fixBoxSize} gap-3`}
                    component="img"
                    image={honor.src}
                    alt={honor.title}
                  />

                  <CardContent className={style.adjustContent}>
                    <Typography
                      className={`${style.dateTime} discription`}
                      gutterBottom
                      variant="span"
                      component="div"
                    >
                       {honor.date}
                    </Typography>
                    <Typography
                      className="subitem"
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      {fixTitleSize(honor.title)}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </React.Fragment>
          ))}
        </div>
      </section>
      </MainLayout>
    </>
  );
}
