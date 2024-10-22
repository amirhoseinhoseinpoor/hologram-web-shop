import Link from "next/link";
import style from "../../Styles/HomeStyle/Blog.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import React from "react";

async function fetchBlogs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/blogs/list`);

    if (!response.ok) {
      console.log("Failed to fetch data");
    }

    const honors = await response.json();
    return honors;
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}


export default async function Magazine() {
  const honors = await fetchBlogs();

  if (honors.length === 0) {
    return <p>No honors data available at the moment. Please try again later.</p>;
  }

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
