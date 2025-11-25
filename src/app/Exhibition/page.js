import React from "react";

import style from "../Styles/ExhibitionPageStyle/Exhibition.module.scss";
import HeaderSeo from "../Components/HeaderSeo";
// import exhibition from "../../../public/json/ExhibitionPage.json";
import { formatPersianDate } from "../utils/persionDateUtils";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MainLayout from "../layouts/MainLayout";

async function fetchExhibition() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/exhibition/list`,
      {
        headers: {
          Origin: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}`,
        },
      }
    );

    if (!response.ok) {
      console.log('Failed to fetch data');
      return [];
    }

    const exhibition = await response.json();
    return Array.isArray(exhibition) ? exhibition : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}


export default async function Exhibition() {

  const exhibition = await fetchExhibition();

  if (exhibition.length === 0) {
    return <p>No honors data available at the moment. Please try again later.</p>;
  }

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
          {exhibition.map((item, index) => (
            <React.Fragment key={index}>
              {/* {exhi.slides.map((exhiinner, index) => ())} */}
                <React.Fragment key={index}>
                  <Card
                    className={`${style.mainCardStyle} ${style.adjustpriority}`}
                  >
                    <Link
                      className={`${style.adjustMobileFlow} text-decoration-none`}
                      href={`/Exhibition/${item.title}`}
                      passHref
                    >
                      <div>
                        <CardMedia
                        className={`${style.fixBoxSize} gap-3 h-100`}
                        component="img"
                        image={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${item.src}`}
                        alt={item.title}
                      />
                      </div>
                      

                      <CardContent className={style.adjustContent}>
                        <Typography
                          className={`${style.dateTime} discription`}
                          gutterBottom
                          variant="span"
                          component="div"
                        >
                          {formatPersianDate(item.date)}
                        </Typography>
                        <Typography
                          className="subitem"
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
              
            </React.Fragment>
          ))}
        </div>
      </section>
    
      </MainLayout>
    </>
  );
}
