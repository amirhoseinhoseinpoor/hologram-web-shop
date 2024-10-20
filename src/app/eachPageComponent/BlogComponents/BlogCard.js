import style from "../../Styles/BlogStyle/BlogCard.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import blogs from "/public/json/BlogPage.json";
import { formatPersianDate } from "@/app/utils/persionDateUtils";

async function fetchBlogs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/blogs/list`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const honors = await response.json();
    return honors;
  } catch (error) {
    console.error("Fetch failed:", error);
    return []; // Return fallback data if fetch fails
  }
}

export default async function BlogCard() {
  
  const honors = await fetchBlogs();

  if (honors.length === 0) {
    return <p>No honors data available at the moment. Please try again later.</p>;
  }

  const dataFillterd = honors.filter((item) => item.content.priority === true);

  const findData = dataFillterd.slice(0, 2);

  const findSecontImportant = dataFillterd.slice(2, 5);

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
      <div className={`${style.MainDiv} container gap-2`}>
        {findData?.map((blog) => (
          <>
            <Card className={`${style.mainCardStyle} ${style.morpriority}`}>
              <Link
                className="text-decoration-none"
                href={`/Blog/${blog.content.title}`}
                passHref
              >
                <CardMedia
                  className={`${style.fixBoxSize} gap-3`}
                  component="img"
                  image={blog.content.imageSrc}
                  alt={blog.content.title}
                />

                <CardContent className={style.adjustContent}>
                  <Typography
                    className={`${style.dateTime} discription`}
                    gutterBottom
                    variant="span"
                    component="div"
                  >
                    {blog.content.time} | {formatPersianDate(blog.date)}
                  </Typography>
                  <Typography
                    className="subitem"
                    gutterBottom
                    variant="p"
                    component="div"
                  >
                    {fixTitleSize(blog.content.title)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </>
        ))}
      </div>

      <div className={`${style.MainDiv} container gap-2`}>
        {findSecontImportant?.map((blog) => (
          <>
            <Card className={`${style.mainCardStyle} ${style.adjustpriority}`}>
              <Link
                className="text-decoration-none"
                href={`/Blog/${blog.content.title}`}
                passHref
              >
                <CardMedia
                  className={`${style.fixBoxSize} gap-3`}
                  component="img"
                  image={blog.content.imageSrc}
                  alt={blog.content.title}
                />

                <CardContent className={style.adjustContent}>
                  <Typography
                    className={`${style.dateTime} discription`}
                    gutterBottom
                    variant="span"
                    component="div"
                  >
                    {blog.content.time} | {formatPersianDate(blog.date)}
                  </Typography>
                  <Typography
                    className="subitem"
                    gutterBottom
                    variant="p"
                    component="div"
                  >
                    {fixTitleSize(blog.content.title)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
