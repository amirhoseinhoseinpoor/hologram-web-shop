export const revalidate = 60; // ISR every 60 second
import React from "react";
import HeaderSeo from "../Components/HeaderSeo";
import style from "../Styles/HonorsPageStyle/Honors.module.scss";
import { formatPersianDate } from "../utils/persionDateUtils";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MainLayout from "../layouts/MainLayout";

async function fetchHonors() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/honors/list`,
      {
        // Ensures fresh data every 60 seconds
        next: { revalidate: 60 },
        headers: {
          Origin: `${process.env.NEXT_PUBLIC_BACK_END_SERVER}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Failed to fetch data");
      return [];
    }

    const honors = await response.json();
    return Array.isArray(honors) ? honors : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function Honors() {
  const honors = await fetchHonors();

  if (honors.length === 0) {
    return (
      <p>No honors data available at the moment. Please try again later.</p>
    );
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
  return (
    <>
      <MainLayout>
        <HeaderSeo />
        <section>
          <div className={`${style.MainDiv} container`}>
            {honors?.map((honor, index) => (
              <React.Fragment key={index}>
                <Card
                  className={`${style.mainCardStyle} ${style.adjustpriority}`}
                >
                  <Link
                    className="text-decoration-none"
                    href={`/Honors/${honor.title}`}
                    passHref
                  >
                    <CardMedia
                      className={`${style.fixBoxSize} gap-3`}
                      component="img"
                      image={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${honor.src}`}
                      alt={honor.title}
                    />

                    <CardContent className={style.adjustContent}>
                      <Typography
                        className={`${style.dateTime} discription`}
                        gutterBottom
                        variant="span"
                        component="div"
                      >
                        {formatPersianDate(honor.date)}
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
