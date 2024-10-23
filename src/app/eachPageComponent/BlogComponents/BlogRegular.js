"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import style from "../../Styles/BlogStyle/BlogRegular.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";
import { homePageBlogList } from "@/app/Store/thunks";
import { formatPersianDate } from "@/app/utils/persionDateUtils";

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default function BlogRegular() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(type);
  const [dataCome, setDataCome] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Fixed number of blogs per page

  // Fetch data for the current page
  const fetchData = async (page) => {
    const dataResponse = await dispatch(homePageBlogList({ page, limit })).unwrap();
    setDataCome(dataResponse.data); // Set blogs data
    setTotalPages(dataResponse.pageCount); // Set total page count
    setCurrentPage(dataResponse.page); // Set current page
  };

  // Fetch data on initial load and when the page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, dispatch]);



  // Handle search term input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  // Filtering and grouping logic
  const groupedBlogs = dataCome
    .filter((blog) => {
      // Filter based on search term matching the blog's content fields (e.g., title or time)
      const normalizedTitle = blog.content?.title ? normalizeString(blog.content.title) : "";
      const normalizedDate = blog.content?.time ? normalizeString(blog.content.time) : "";
      const normalizedSearchTerm = normalizeString(searchTerm);

      // Check if either title or time includes the search term
      return (
        normalizedTitle.includes(normalizedSearchTerm) ||
        normalizedDate.includes(normalizedSearchTerm)
      );
    })
    .reduce((acc, blog) => {
      // Group blogs by their type
      const blogType = blog.content?.type || "غیره";
      if (!acc[blogType]) {
        acc[blogType] = [];
      }
      acc[blogType].push({
        id: blog.id,
        title: blog.content?.title || "Untitled",
        date: blog.date,
        time: blog.content?.time || "No time provided",
        imageSrc: blog.content?.imageSrc || "/default-image.jpg",
      });
      return acc;
    }, {});

  // Get the keys (blog types) to create the tabs
  const blogTypes = Object.keys(groupedBlogs);

  useEffect(() => {
    if (blogTypes.length > 0 && !activeTab) {
      setActiveTab(blogTypes[0]); // Set the first tab as active
    }
  }, [blogTypes, activeTab]);

  return (
    <section className="container">
      <div className={style.inputStyle}>
        <div>
          <input
            type="text"
            placeholder="جست و جو"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={style.searchIconposition}>
          <Box
            sx={{
              width: 37,
              height: 37,
              display: "flex",
              alignItems: "center",
              padding: 1,
              marginRight: "-15px",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </div>
      </div>

      <div className={style.test}>
        {blogTypes.length > 0 ? (
          <>
            <Tabs
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className={`${style.buttonsTabbed}`}
            >
              {blogTypes.map((blogType, index) => (
                <Tab key={index} eventKey={blogType} title={blogType}>
                  {groupedBlogs[blogType].map((blog, index) => (
                    <Card key={index} className={`${style.mainCardStyle} ${style.adjustpriority}`}>
                      <Link className="text-decoration-none" href={`/Blog/${blog.title}`} passHref>
                        <CardMedia
                          className={`${style.fixBoxSize} gap-3`}
                          component="img"
                          image={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${blog.imageSrc}`}
                          alt={blog.title}
                        />
                        <CardContent className={style.adjustContent}>
                          <Typography
                            className={`${style.dateTime} discription`}
                            gutterBottom
                            variant="span"
                            component="div"
                          >
                            {blog.time} | {formatPersianDate(blog.date)}
                          </Typography>
                          <Typography
                            className="subitem"
                            gutterBottom
                            variant="p"
                            component="div"
                          >
                            {blog.title.length > 60 ? blog.title.slice(0, 60) + "..." : blog.title}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </Tab>
              ))}
            </Tabs>
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <div className="mt-5">
            <p className="text-center subtitle">نوشته‌ایی پیدا نشد</p>
            <p className="text-center mt-3">
              متاسفانه، نوشته‌ای مرتبط با عبارت {searchTerm} پیدا نشد. لطفا
              عبارت خود را تغیر داده و مجددا تلاش نمایید.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
