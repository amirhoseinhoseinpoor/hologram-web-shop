import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import data from "/public/json/favorite.json";

import style from "/src/app/Styles/Profile/FavoriteStyle/Favorite.module.scss";

export default function favorite() {
  function fixTitleSize(text) {
    var shortTitle;
    if (text.length > 40) {
      shortTitle = text.slice(0, 40) + "...";
      return shortTitle;
    } else {
      return text;
    }
  }

  return (
    <section className={style.mainSectionBackground}>
      <div className={style.eachCardGrid}>
        {data.map((cards, index) => (
          <Card key={index} className={`${style.mainCardStyle}`}>
            <Link
              className="text-decoration-none"
              href={`/Blog/${cards.productLink}`}
              passHref
            >
              <CardMedia
                className={`${style.fixBoxSize} gap-3`}
                component="img"
                image={cards.src}
                alt={cards.title}
              />

              <CardContent className={style.adjustContent}>
                <Typography
                  className={`${style.typografyPAdding} NormalTextSizing`}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {fixTitleSize(cards.title)}
                </Typography>
              </CardContent>
            </Link>
            <div className={style.diveSaveButton}>
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
                  fill="#5695F6"
                  stroke="#5695F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 10.6484H9.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={style.diveShareButton}>
              <svg
                width={16}
                height={18}
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.68 9.00016C10.68 7.81016 11.65 6.84016 12.84 6.84016C14.03 6.84016 15 7.81016 15 9.00016C15 10.1902 14.03 11.1602 12.84 11.1602C11.65 11.1602 10.68 10.1902 10.68 9.00016Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.00031 14.2111C1.00031 13.0211 1.97031 12.0511 3.16031 12.0511C4.35031 12.0511 5.32031 13.0211 5.32031 14.2111C5.32031 15.4011 4.35031 16.3711 3.16031 16.3711C1.97031 16.3711 1.00031 15.4111 1.00031 14.2111Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.00031 3.78922C1.00031 2.59922 1.97031 1.62922 3.16031 1.62922C4.35031 1.62922 5.32031 2.59922 5.32031 3.78922C5.32031 4.97922 4.35031 5.94922 3.16031 5.94922C1.97031 5.94922 1.00031 4.97922 1.00031 3.78922Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.99966 5.00032L8.56499 7.23448L10.3477 8.35156"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.73688 13.35L10.8617 10.1384L10.8629 10.1409"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
