import fs from "fs";
import path from "path";

import style from "../../Styles/BlogStyle/BlogDynamicContent.module.scss";
import Box from "@mui/material/Box";
import CopyLinkButton from "../../Components/CopyLinkButton";
import ShowRoute from "@/app/Components/ShowRoute";
import BlogInnerSearch from "@/app/eachPageComponent/BlogComponents/BlogInnerSearch";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";

function getBlogPostById(id) {
  const filePath2 = path.join(
    process.cwd(),
    "public",
    "json",
    "BlogContent.json"
  );
  const jsonData2 = fs.readFileSync(filePath2, "utf8");

  // const blogs = JSON.parse(jsonData);
  const blogs2 = JSON.parse(jsonData2);
  const found = blogs2.find((card) => card.id === id);
  if (found) {
    return found;
  }

  return null;
}

export default function BlogPostPage({ params }) {
  const { id } = params;

  const blogPost = getBlogPostById(id);

  if (!blogPost) {
    return <div>Blog post not found.</div>;
  }

  return (
    <>
      <Header />
      <section className="container">
        <ShowRoute />
        <div className={`${style.MainDiv} d-flex flex-row`}>
          <div className={`${style.textContent} d-flex flex-column`}>
            <h3 className="title mt-3 mb-1">{blogPost.title}</h3>
            <p className={`${style.discriptionColor} discription mb-3`}>
              {blogPost.time} | {blogPost.date}
            </p>
            <div>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                  aspectRatio: 1.3,
                  borderRadius: "4px",
                }}
                alt={blogPost.title}
                src={blogPost.imageSrc}
              />
            </div>
            <div className={`${style.seasonMaindiv}`}>
              <p className="sometext">سرفصل‌ها</p>
              <ul className={`${style.discriptionColor} mt-2 subitem`}>
                <li className="mb-2">
                  <a href={`#${blogPost.title2}`}>{blogPost.title2}</a>
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <p>{blogPost.content1}</p>
            </div>
            <div className={`${style.boldContentStyle} mt-2 mb-2 purchesSize`}>
              <p>{blogPost.boldContent}</p>
            </div>
            <div className="mt-2 mb-2">
              <h3 id={blogPost.title2} className="purchesSize">
                {blogPost.title2}
              </h3>
            </div>
            <div>
              <p>{blogPost.content2}</p>
            </div>
            <div
              className={`${style.restylethePositiveNegetive} d-flex flex-row gap-3`}
            >
              <div className={`${style.positiveMaindiv} d-flex flex-column`}>
                <p className={style.posetivestyle}>نقاط مثبت</p>
                <ul>
                  <li>نقطه 1</li>
                  <li>نقطه 1</li>
                  <li>نقطه 1</li>
                  <li>نقطه 1</li>
                </ul>
              </div>
              <div className={`${style.positiveMaindiv} d-flex flex-column`}>
                <p className={style.negetive}>نقاط منفی</p>
                <ul>
                  <li>نقطه 1</li>
                  <li>نقطه 1</li>
                  <li>نقطه 1</li>
                  <li>نقطه 1</li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-column mt-4">
              <Box
                component="img"
                sx={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                  aspectRatio: 1.5,
                  borderRadius: "4px",
                }}
                alt={blogPost.title}
                src={blogPost.imageSrc2}
              />
              <p
                className={`${style.imageDiscription} text-center mt-1 discription`}
              >
                {blogPost.imagediscription}
              </p>
            </div>
            <div className="mt-3">
              <p>{blogPost.content3}</p>
            </div>
            <div className={`${style.advertismentBox} d-flex flex-row mt-3`}>
              {blogPost.product.map((item) => (
                <>
                  <Box
                    component="img"
                    sx={{
                      width: "30%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      aspectRatio: 1.5,
                      borderRadius: "4px",
                    }}
                    alt={item.title}
                    src={item.src}
                  />
                  <div
                    className={`${style.contenttextButton} d-flex flex-column`}
                  >
                    <p className="subitem">{item.title}</p>
                    <button>ثبت سفارش</button>
                  </div>
                </>
              ))}
            </div>
            <div className="mt-4">
              <p>{blogPost.content4}</p>
            </div>
            <div
              className={`${style.socialMediaIcon} d-flex flex-row mt-3 gap-3`}
            >
              <CopyLinkButton />
              <a href="#">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6 2.3C12.1 0.8 10.1 0 8 0C3.6 0 0 3.6 0 8C0 9.4 0.400006 10.8 1.10001 12L0 16L4.20001 14.9C5.40001 15.5 6.7 15.9 8 15.9C12.4 15.9 16 12.3 16 7.9C16 5.8 15.1 3.8 13.6 2.3ZM8 14.6C6.8 14.6 5.60001 14.3 4.60001 13.7L4.39999 13.6L1.89999 14.3L2.60001 11.9L2.39999 11.6C1.69999 10.5 1.39999 9.3 1.39999 8.1C1.39999 4.5 4.4 1.5 8 1.5C9.8 1.5 11.4 2.2 12.7 3.4C14 4.7 14.6 6.3 14.6 8.1C14.6 11.6 11.7 14.6 8 14.6ZM11.6 9.6C11.4 9.5 10.4 9 10.2 9C10 8.9 9.89999 8.9 9.79999 9.1C9.69999 9.3 9.30001 9.7 9.20001 9.9C9.10001 10 8.99999 10 8.79999 10C8.59999 9.9 8.00001 9.7 7.20001 9C6.60001 8.5 6.20001 7.8 6.10001 7.6C6.00001 7.4 6.10001 7.3 6.20001 7.2C6.30001 7.1 6.4 7 6.5 6.9C6.6 6.8 6.60001 6.7 6.70001 6.6C6.80001 6.5 6.70001 6.4 6.70001 6.3C6.70001 6.2 6.30001 5.2 6.10001 4.8C6.00001 4.5 5.80001 4.5 5.70001 4.5C5.60001 4.5 5.49999 4.5 5.29999 4.5C5.19999 4.5 4.99999 4.5 4.79999 4.7C4.59999 4.9 4.10001 5.4 4.10001 6.4C4.10001 7.4 4.79999 8.3 4.89999 8.5C4.99999 8.6 6.29999 10.7 8.29999 11.5C9.99999 12.2 10.3 12 10.7 12C11.1 12 11.9 11.5 12 11.1C12.2 10.6 12.2 10.2 12.1 10.2C12 9.7 11.8 9.7 11.6 9.6Z"
                      fill="#333333"
                    />
                  </svg>
                </Box>
              </a>
              <a href="#">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <svg
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.09992 5.7083C5.39487 3.83705 8.25885 2.60341 9.69185 2.00738C13.7834 0.30558 14.6335 0.00996026 15.1877 9.46359e-05C15.3095 -0.00194823 15.582 0.0282562 15.7586 0.171489C15.9076 0.292432 15.9486 0.455809 15.9683 0.570476C15.9879 0.685143 16.0123 0.946358 15.9929 1.15046C15.7712 3.48009 14.8118 9.13349 14.3237 11.7427C14.1172 12.8468 13.7105 13.217 13.3168 13.2532C12.4613 13.3319 11.8116 12.6878 10.9829 12.1446C9.68624 11.2946 8.95369 10.7654 7.69503 9.936C6.24042 8.97744 7.18338 8.4506 8.01236 7.58959C8.22931 7.36426 11.999 3.93546 12.0719 3.62441C12.0811 3.58551 12.0895 3.44051 12.0034 3.36394C11.9172 3.28737 11.7901 3.31355 11.6983 3.33438C11.5683 3.36389 9.4968 4.73307 5.48389 7.4419C4.89591 7.84565 4.36333 8.04237 3.88616 8.03207C3.36012 8.0207 2.34822 7.73463 1.59598 7.49011C0.673328 7.19019 -0.0599784 7.03162 0.00387615 6.52227C0.0371355 6.25697 0.402482 5.98564 1.09992 5.7083Z"
                      fill="#333333"
                    />
                  </svg>
                </Box>
              </a>
              <a href="#">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1,
                  }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.60001 16H0.199997V5.3H3.60001V16ZM1.9 3.8C0.800002 3.8 0 3 0 1.9C0 0.8 0.900002 0 1.9 0C3 0 3.8 0.8 3.8 1.9C3.8 3 3 3.8 1.9 3.8ZM16 16H12.6V10.2C12.6 8.5 11.9 8 10.9 8C9.89999 8 8.89999 8.8 8.89999 10.3V16H5.5V5.3H8.7V6.8C9 6.1 10.2 5 11.9 5C13.8 5 15.8 6.1 15.8 9.4V16H16Z"
                      fill="#333333"
                    />
                  </svg>
                </Box>
              </a>
            </div>
            <div className="mt-3">
              <ul className={`${style.tagsStyle} d-flex flex-row gap-3`}>
                {blogPost.tags.split(",").map((tag) => (
                  <>
                    <li>{tag.trim()}</li>
                  </>
                ))}
              </ul>
            </div>
            <section className="mb-5 mt-4 container">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <span className="title">مقالات مرتبط</span>
                </div>
              </div>
              <div
                className={`${style.responsiveFirstBox} d-flex flex-row gap-3 mt-4 justify-content-center`}
              >
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
                      src="/HomeImages/coin.png"
                    />
                  </div>

                  <div>
                    <p
                      className={`${style.studingtimetext} mt-2 mb-2 discription`}
                    >
                      مطالعه: 5دقیقه
                    </p>
                  </div>
                  <div>
                    <p className="subitem">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </div>
                <div
                  className={`${style.boxBackgroundMain} d-flex flex-column d-none d-lg-block d-md-block`}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/cube-coin.png"
                  />
                  <p
                    className={`${style.studingtimetext} mt-2 mb-2 discription`}
                  >
                    مطالعه: 5دقیقه
                  </p>
                  <p className="subitem">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                  </p>
                </div>
                <div
                  className={`${style.boxBackgroundMain} d-flex flex-column d-none d-lg-block d-md-block d-xl-block`}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/text.png"
                  />
                  <p
                    className={`${style.studingtimetext} mt-2 mb-2 discription`}
                  >
                    مطالعه: 5دقیقه
                  </p>
                  <p className="subitem">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* second part */}
          <div className={`${style.inputContent} d-flex flex-column`}>
            <BlogInnerSearch />
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
