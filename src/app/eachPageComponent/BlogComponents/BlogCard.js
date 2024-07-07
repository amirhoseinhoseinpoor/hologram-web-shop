import style from "../../Styles/BlogStyle/BlogCard.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function BlogCard({ id, imageSrc, title, priority = false, morpriority =false, time, date }) {
  
  const renderMorPriority = morpriority && !priority;
  const renderpriority = priority && !morpriority;

  return (
    <>
    {/* render more priority blog */}
      {renderMorPriority && (
        <Card className={`${style.mainCardStyle} ${style.morpriority}`}>
          <Link className="text-decoration-none" href={`/Blog/${id}`} passHref>
            <CardMedia
              className={`${style.fixBoxSize} gap-3`}
              component="img"
              image={imageSrc}
              alt={title}
            />

            <CardContent className={style.adjustContent}>
              <Typography
                className={`${style.dateTime} discription`}
                gutterBottom
                variant="span"
                component="div"
              >
                {time} | {date}
              </Typography>
              <Typography
                className="subitem"
                gutterBottom
                variant="p"
                component="div"
              >
                {title}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      )}

      {/* render priority blog */}
      {renderpriority &&   (
        <Card className={`${style.mainCardStyle} ${style.adjustpriority}`}>
          <Link className="text-decoration-none" href={`/Blog/${id}`} passHref>
            <CardMedia
              className={`${style.fixBoxSize} gap-3`}
              component="img"
              image={imageSrc}
              alt={title}
            />

            <CardContent className={style.adjustContent}>
              <Typography
                className={`${style.dateTime} discription`}
                gutterBottom
                variant="span"
                component="div"
              >
                {time} | {date}
              </Typography>
              <Typography
                className="subitem"
                gutterBottom
                variant="p"
                component="div"
              >
                {title}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      )}
    </>
  );
}

export default BlogCard;
