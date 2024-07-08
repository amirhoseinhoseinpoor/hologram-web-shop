import style from "../../Styles/BlogStyle/BlogCard.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import blogs from "/public/json/BlogPage.json";

function BlogCard() {
  return (
    <>
      <div className={`${style.MainDiv} container gap-2`}>
        {blogs.map((blog) => (
          <>
            
              {blog.card.map((cards) => (
                <>
                  {/* render more priority blog */}
                  {cards.morpriority && (
                    <Card
                      className={`${style.mainCardStyle} ${style.morpriority}`}
                    >
                      <Link
                        className="text-decoration-none"
                        href={`/Blog/${cards.id}`}
                        passHref
                      >
                        <CardMedia
                          className={`${style.fixBoxSize} gap-3`}
                          component="img"
                          image={cards.imageSrc}
                          alt={cards.title}
                        />

                        <CardContent className={style.adjustContent}>
                          <Typography
                            className={`${style.dateTime} discription`}
                            gutterBottom
                            variant="span"
                            component="div"
                          >
                            {cards.time} | {cards.date}
                          </Typography>
                          <Typography
                            className="subitem"
                            gutterBottom
                            variant="p"
                            component="div"
                          >
                            {cards.title}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  )}
                </>
              ))}
            
            </>
          ))}
          </div>


         <div className={`${style.MainDiv} container gap-2`}>
          {blogs.map((blog) => (<>
              {blog.card.map((cards) => (
                <>
                  {/* render priority blog */}
                  {cards.priority && (
                    <Card
                      className={`${style.mainCardStyle} ${style.adjustpriority}`}
                    >
                      <Link
                        className="text-decoration-none"
                        href={`/Blog/${cards.id}`}
                        passHref
                      >
                        <CardMedia
                          className={`${style.fixBoxSize} gap-3`}
                          component="img"
                          image={cards.imageSrc}
                          alt={cards.title}
                        />

                        <CardContent className={style.adjustContent}>
                          <Typography
                            className={`${style.dateTime} discription`}
                            gutterBottom
                            variant="span"
                            component="div"
                          >
                            {cards.time} | {cards.date}
                          </Typography>
                          <Typography
                            className="subitem"
                            gutterBottom
                            variant="p"
                            component="div"
                          >
                            {cards.title}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  )}
                </>
              ))}
            
          </>))}
          </div>
           

     
    </>
  );
}

export default BlogCard;
