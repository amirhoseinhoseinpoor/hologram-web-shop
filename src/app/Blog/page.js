import React from "react";
import { Suspense } from 'react';
import BlogCard from "../eachPageComponent/BlogComponents/BlogCard";
import BlogRegular from "../eachPageComponent/BlogComponents/BlogRegular";
export default function Blog() {

  return (
     <>
      <BlogCard/>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogRegular/>
      </Suspense>
     </>
  );
}
