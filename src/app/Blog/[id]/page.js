import fs from "fs";
import path from "path";

import style from "../../Styles/BlogStyle/BlogDynamicContent.module.scss";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Tooltip from "@mui/material/Tooltip";
import CopyLinkButton  from "../../Components/CopyLinkButton"


function getBlogPostById(id) {
  // const filePath = path.join(process.cwd(), 'public', 'json', 'BlogPage.json');
  // const jsonData = fs.readFileSync(filePath, 'utf8');

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

  //   for (const entry of blogs2) {
  //     const found = entry.find(card => card.id === id); // Make sure 'id' comparison works (string vs number)
  //     if (found) {
  //         return found;
  //     }
  // }

  return null;
}

export default function BlogPostPage({ params }) {
  const { id } = params;


 
  const blogPost = getBlogPostById(id);

  if (!blogPost) {
    return <div>Blog post not found.</div>;
  }

  return (
    <section className="container">
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
              <li className="mb-2">سرفصل اول</li>
              <li className="mt-2 mb-2">سرفصل دوم</li>
              <li className="mt-2 mb-2">سرفصل سوم</li>
              <li className="mt-2 mb-2">سرفصل چهارم</li>
              <li className="mt-2">سرفصل پنجم</li>
            </ul>
          </div>
          <div className="mt-4">
            <p>{blogPost.content1}</p>
          </div>
          <div className={`${style.boldContentStyle} mt-2 mb-2 purchesSize`}>
            <p>{blogPost.boldContent}</p>
          </div>
          <div className="mt-2 mb-2">
            <h3 className="purchesSize">{blogPost.title2}</h3>
          </div>
          <div>
            <p>{blogPost.content2}</p>
          </div>
          <div className={`${style.restylethePositiveNegetive} d-flex flex-row gap-3`}>
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
            <CopyLinkButton/>
            <a href="#">
              <WhatsAppIcon />
            </a>
            <a href="#">
              <TelegramIcon />
            </a>
            <a href="#">
              <LinkedInIcon />
            </a>
          </div>
          <div className="mt-3">
            <ul className={`${style.tagsStyle} d-flex flex-row gap-3`}>
             {blogPost.tags.split(',').map((tag) => (<><li>{tag.trim()}</li></>))}
            </ul>
          </div>
          <section className="mb-5 mt-4 container">
            <div className="d-flex flex-row justify-content-between">
                <div>
                  <span className="title">مقالات مرتبط</span>
                </div>
                
            </div>
            <div className={`${style.responsiveFirstBox} d-flex flex-row gap-3 mt-4 justify-content-center`}>
                <div className={`${style.boxBackgroundMain} d-flex flex-column justify-content-center`}>
                    <div className={style.mobilePictureResponsiveBlog}>
                      <Box
                       component="img"
                       sx={{
                        width: '100%', 
                        maxHeight: 300, 
                        objectFit: 'cover',
                        aspectRatio : 1.48,
                      }}
                        alt="image."
                        src="/HomeImages/coin.png"
                      />     
                    </div>

                    <div>
                        <p className={`${style.studingtimetext} mt-2 mb-2 discription`}>مطالعه: 5دقیقه</p>
                    </div>
                    <div>
                        <p className="subitem">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                    </div>
                    
                </div>
                <div className={`${style.boxBackgroundMain} d-flex flex-column d-none d-lg-block d-md-block`}>
                  <Box
                    component="img"
                    sx={{
                        width: '100%', 
                        maxHeight: 300, 
                        objectFit: 'cover',
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/cube-coin.png"
                  />
                  <p className={`${style.studingtimetext} mt-2 mb-2 discription`}>مطالعه: 5دقیقه</p>
                  <p className="subitem">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
                <div className={`${style.boxBackgroundMain} d-flex flex-column d-none d-lg-block d-md-block d-xl-block`}>
                  <Box
                    component="img"
                    sx={{
                        width: '100%', // Ensures responsiveness
                        maxHeight: 300, // Set a maximum height (optional)
                        objectFit: 'cover',
                    }}
                    alt="The house from the offer."
                    src="/HomeImages/text.png"
                  />
                 <p className={`${style.studingtimetext} mt-2 mb-2 discription`}>مطالعه: 5دقیقه</p>
                 <p className="subitem">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                </div>
            </div>
        </section>
        </div>
        <div className={`${style.inputContent} d-flex flex-column`}>
          <div className={style.inputStyle}>
            <div>
              <input type="text" placeholder="جست و جو در همه مقاله‌ها" />
            </div>
            <div className={style.searchIconposition}>
              <SearchIcon />
            </div>
          </div>

          <div className="d-flex flex-column">
            <p className="subitem mt-2 mb-1">دسته بندی</p>
            <ul>
              <li
                className={`${style.borderbuttom} d-flex flex-row justify-content-between pb-2 pt-2`}
              >
                <p>هولوگرام</p>
                <p>2</p>
              </li>
              <li
                className={`${style.borderbuttom} d-flex flex-row justify-content-between pb-2 pt-2`}
              >
                <p>لیبل هولوگرام</p>
                <p>6</p>
              </li>
              <li
                className={`${style.borderbuttom} d-flex flex-row justify-content-between pb-2 pt-2`}
              >
                <p>لیبل</p>
                <p>24</p>
              </li>
              <li
                className={`${style.borderbuttom} d-flex flex-row justify-content-between pb-2 pt-2`}
              >
                <p>اسکرچ</p>
                <p>16</p>
              </li>
              <li
                className={`${style.borderbuttom} d-flex flex-row justify-content-between pb-2 pt-2`}
              >
                <p>فرایند ثبت سفارش</p>
                <p>12</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
