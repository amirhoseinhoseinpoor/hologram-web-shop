import React from "react";
import blogs from '/public/json/BlogPage.json'
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import style from '../Styles/BlogStyle/BlogCard.module.scss'

export default function Blog() {
  

  return (
    <div className={`${style.MainDiv} container gap-2`}>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          priority={blog.priority}
          morpriority={blog.morpriority}
          imageSrc={blog.imageSrc}
          time={blog.time}
          date={blog.date}
          title={blog.title}
        />
      ))}
    </div>
  );
}
