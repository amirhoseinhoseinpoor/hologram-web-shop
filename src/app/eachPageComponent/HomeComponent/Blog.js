import Link from "next/link";
import style from "../../Styles/HomeStyle/Blog.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import React from "react";

export default async function Magazine() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/blogs/list`
  );
  let honors = await response.json();

  const dataFillterd = honors.filter((item) => item.content.priority === true);

  const findData = dataFillterd.slice(0, 3);


  return (
    <section
      style={{ marginTop: "90px", marginBottom: "90px" }}
      className=" container"
    >
      <div className="d-flex flex-row justify-content-between">
        <div>
          <span className="title">مجله آذر هولگرام </span>
          <span className={`${style.slidernexttext} pe-1  title`}>
            برای مطالعه بیشتر...
          </span>
        </div>
        <div className={style.arrowbacklink}>
          <Link href="/Blog">
            مطالعه بیشتر <ArrowBackIcon></ArrowBackIcon>
          </Link>
        </div>
      </div>

      <div
        className={`${style.responsiveFirstBox} d-flex flex-row gap-3 mt-4 justify-content-center`}
      >
        {findData &&
          findData.map((item, index) => (
            <React.Fragment key={index}>
              <Link style={{textDecoration: "none" , color: "unset"}} passHref href={`/Blog/${item.content.title}`}>
                <div
                  className={`${style.boxBackgroundMain} d-flex flex-column justify-content-center`}
                >
                  <div className={style.mobilePictureResponsiveBlog}>
                    <Box
                      component="img"
                      sx={{
                        width: "100%",
                        maxHeight: 300,
                        objectFit: "cover",
                        aspectRatio: 1.48,
                      }}
                      alt="image."
                      src={item.content.imageSrc}
                    />
                  </div>

                  <div>
                    <p
                      className={`${style.studingtimetext} mt-2 mb-2 discription`}
                    >
                      {item.content.time}
                    </p>
                  </div>
                  <div>
                    <p className="VodeoDisSizing">{item.content.title}</p>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
      </div>
    </section>
  );
}
