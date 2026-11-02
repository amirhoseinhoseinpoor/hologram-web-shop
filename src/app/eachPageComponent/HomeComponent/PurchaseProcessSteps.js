import React from "react";

import style from "../../Styles/HomeStyle/PurchaseProcessSteps.module.scss";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PurchaseProcessSteps() {
  return (

    <section className={`container ${style.mainSection}`}>
      <div>
        <h2 className={`${style.titleColor} title mb-2`}>
          محصولات متنوع <span>آذرهولوگرام</span>
        </h2>
      </div>
      <div className={`${style.mainSizez} mt-4`}>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/هولوگرام`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage}  gap-3`}
              component="img"
              image={`/HomeImages/typeazar1.jpg`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                هولوگرام
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/لیبل‌های امنیتی`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage}  gap-3`}
              component="img"
              image={`/HomeImages/typeazar2.png`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                لیبل
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/برچسب‌های پلمپ`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage}  gap-3`}
              component="img"
              image={`/HomeImages/typeazar3.png`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                لیبل هولوگرام
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={`${style.fixCardStyle}`}>
          <Link className="text-decoration-none d-flex flex-column gap-2" href={`/اسکرچ`} passHref>
            <CardMedia
              className={`${style.fixRaiduisImage} `}
              component="img"
              image={`/HomeImages/typeazar4.png`}
              alt={`dsaw`}
            />

            <CardContent className={`${style.adjustContent} text-center`}>
              <Typography
                className={`QASize m-0`}
                gutterBottom
                variant="span"
                component="div"
              >
                اسکرچ
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </div>
    </section>
  );
}
