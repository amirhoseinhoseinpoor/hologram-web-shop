import React from "react";

import style from "../Styles/ExhibitionPageStyle/Exhibition.module.scss";
import HeaderSeo from "../Components/HeaderSeo";
import exhibition from "../../../public/json/ExhibitionPage.json";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
export default function Exhibition() {

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
      <HeaderSeo />
      <section>
        <div className={`${style.MainDiv} container`}>
          {exhibition.map((exhi, index) => (
            <React.Fragment key={index}>
              {exhi.slides.map((exhiinner, index) => (
                <React.Fragment key={index}>
                  <Card
                    className={`${style.mainCardStyle} ${style.adjustpriority}`}
                  >
                    <Link
                      className={`${style.adjustMobileFlow} text-decoration-none`}
                      href={`/Exhibition/${exhiinner.id}`}
                      passHref
                    >
                      <div>
                        <CardMedia
                        className={`${style.fixBoxSize} gap-3 h-100`}
                        component="img"
                        image={exhiinner.url}
                        alt={exhiinner.text}
                      />
                      </div>
                      

                      <CardContent className={style.adjustContent}>
                        <Typography
                          className={`${style.dateTime} discription`}
                          gutterBottom
                          variant="span"
                          component="div"
                        >
                          {exhiinner.date}
                        </Typography>
                        <Typography
                          className="subitem"
                          gutterBottom
                          variant="p"
                          component="div"
                        >
                          {fixTitleSize(exhiinner.text)}
                          
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
