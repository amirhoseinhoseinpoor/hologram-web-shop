import React from "react";
import { Suspense } from "react";
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Blog() {
  return (
    <>
      <Header />
      <BlogCard />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogRegular />
      </Suspense>
      <Footer />
    </>
  );
}
