"use client";

import { useSearchParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import style from "../../Styles/BlogStyle/BlogRegular.module.scss";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import blogs from "/public/json/BlogPage.json";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Box } from "@mui/material";

export default function BlogRegular() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  
  

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(type || "هولوگرام");
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  function fixTitleSize(text) {
    var shortTitle;
    if (text.length > 60) {
      shortTitle = text.slice(0, 60) + "...";
      return shortTitle;
    } else {
      return text;
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  const filteredBlogs = blogs.map((blog) => ({
    ...blog,
    card: blog.card.filter((cards) => {
      const normalizedTitle = cards.title ? normalizeString(cards.title) : "";
      const normalizeddate = cards.date ? normalizeString(cards.date) : "";
      const normalizedSearchTerm = normalizeString(searchTerm);
      return (
        normalizedTitle.includes(normalizedSearchTerm) ||
        normalizeddate.includes(normalizedSearchTerm)
      );
    }),
  }));

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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
        {filteredBlogs[0].card.length > 0 ? (
          <>
            <Tabs
              id="controlled-tab-example"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className={`${style.buttonsTabbed}`}
            >
              {filteredBlogs.map((blog, index) => (
                <Tab key={index} eventKey={blog.type} title={blog.type}>
                  {blog.card.map((cards, index) => (
                    <React.Fragment key={index}>
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
                              {fixTitleSize(cards.title)}
                            </Typography>
                          </CardContent>
                        </Link>
                      </Card>
                    </React.Fragment>
                  ))}
                </Tab>
              ))}
            </Tabs>
          </>
        ) : (
          <>
            <div className=" mt-5 ">
              <p className="text-center subtitle">نوشته‌ایی پیدا نشد</p>
              <p className="text-center mt-3">
                متاسفانه، نوشته‌ای مرتبط با عبارت {searchTerm} پیدا نشد. لطفا
                عبارت خود را تغیر داده و مجددا تلاش نمایید.
              </p>
              <div className="text-center mt-3">
                <svg
                  className={style.searchBigSvg}
                  
                  viewBox="0 0 213 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M137.254 96.8223L143.434 99.9123L142.787 101.441L136.758 98.425L137.254 96.8223Z"
                    fill="#FFCC01"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M107.177 180.527C105.679 181.277 93.0781 187.783 93.0781 187.783V192.655L146.677 219.601L156.019 219.698L212.276 191.682V188.312L206.644 185.496L107.177 180.527Z"
                    fill="#333333"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M168.111 123.352C166.923 122.784 166.156 121.358 166.156 119.321C166.156 115.786 168.455 111.748 171.286 110.31C172.971 109.455 175.01 110.345 176.366 111.021L195.371 120.524L189.265 133.928L168.113 123.352H168.111Z"
                    fill="url(#paint0_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M196.206 129.101C197.965 125.436 197.59 121.601 195.369 120.536C193.148 119.47 189.923 121.578 188.164 125.243C186.406 128.908 186.781 132.743 189.002 133.808C191.222 134.874 194.448 132.766 196.206 129.101Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M195.922 129.084C197.016 126.804 196.783 124.418 195.401 123.755C194.019 123.092 192.012 124.403 190.918 126.684C189.824 128.964 190.058 131.35 191.439 132.013C192.821 132.676 194.828 131.365 195.922 129.084Z"
                    fill="#FFCC01"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M183.024 47.5508C184.048 47.5505 185.063 47.7523 186.009 48.1446C186.956 48.5369 187.816 49.112 188.54 49.8369C189.264 50.5619 189.838 51.4226 190.229 52.3696C190.62 53.3167 190.82 54.3315 190.819 55.3561V85.6381C190.819 86.2442 190.6 86.8299 190.201 87.2861L188.932 88.7425C188.532 89.1987 188.313 89.7844 188.314 90.3905V116.8C188.313 117.154 188.222 117.502 188.049 117.812C187.876 118.121 187.627 118.381 187.325 118.567C187.023 118.752 186.679 118.858 186.325 118.873C185.971 118.888 185.619 118.813 185.302 118.654C182.391 117.197 178.133 115.063 176.114 114.048C175.77 113.876 175.48 113.611 175.277 113.284C175.074 112.956 174.966 112.579 174.965 112.194V55.3561C174.964 54.3322 175.166 53.3182 175.557 52.3721C175.949 51.426 176.523 50.5664 177.247 49.8423C177.971 49.1182 178.83 48.5438 179.776 48.152C180.722 47.7603 181.736 47.5588 182.76 47.559L183.024 47.5508Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M174.998 68.8715L174.953 55.3517C174.952 54.3278 175.153 53.3138 175.545 52.3677C175.936 51.4216 176.51 50.5619 177.234 49.8379C177.958 49.1139 178.818 48.5398 179.764 48.1483C180.71 47.7569 181.724 47.5558 182.748 47.5566H183.012C184.823 47.5552 186.579 48.1853 187.976 49.3384C189.373 50.4916 190.325 52.0957 190.667 53.8747C189.14 61.6326 181.17 61.818 181.17 61.818L174.998 68.8715Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M180.432 58.688C184.78 58.688 188.305 55.163 188.305 50.8147C188.305 46.4664 184.78 42.9414 180.432 42.9414C176.084 42.9414 172.559 46.4664 172.559 50.8147C172.559 55.163 176.084 58.688 180.432 58.688Z"
                    fill="url(#paint1_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M116.142 137.888C116.142 138.055 116.142 138.221 116.142 138.39C116.142 157.064 90.7067 172.22 59.3803 172.22C28.0538 172.22 2.62109 157.064 2.62109 138.39C2.62215 136.582 2.86039 134.781 3.32973 133.034L17.9042 45.4473H102.428L115.076 131.815C115.726 133.76 116.085 135.79 116.139 137.84V137.882L116.142 137.888Z"
                    fill="url(#paint2_linear_1409_1265)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M107.729 133.58C107.729 133.718 107.729 133.86 107.729 134.007C107.729 149.912 86.0657 162.82 59.3866 162.82C32.7076 162.82 11.0508 149.91 11.0508 134.007C11.0527 132.469 11.2557 130.938 11.6544 129.452L24.0679 54.8555H96.0505L106.822 128.414C107.376 130.07 107.68 131.8 107.727 133.545V133.58H107.729Z"
                    fill="url(#paint3_linear_1409_1265)"
                  />
                  <path
                    d="M59.9136 176.157C91.2619 176.157 116.675 161.011 116.675 142.327C116.675 123.644 91.2619 108.498 59.9136 108.498C28.5652 108.498 3.15234 123.644 3.15234 142.327C3.15234 161.011 28.5652 176.157 59.9136 176.157Z"
                    fill="#333333"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M97.5234 184.105V179.001L149.952 149.934L155.795 149.812L207.997 175.987V184.616L155.756 210.737H148.368L97.5234 184.105Z"
                    fill="url(#paint4_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M148.406 205.645V210.737L155.664 210.778L155.725 205.645H148.406Z"
                    fill="#5BA9FD"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M97.5241 179.073L97.5117 176.15L150.19 149.812H155.785L207.987 175.987V179.514L155.725 205.643H148.406L97.5241 179.073Z"
                    fill="url(#paint5_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M102.778 176.434C102.809 176.372 102.853 176.318 102.908 176.276C102.964 176.235 103.028 176.207 103.096 176.195L105.294 175.797C105.385 175.782 105.479 175.795 105.564 175.834L106.929 176.493C106.982 176.518 107.028 176.553 107.067 176.597C107.105 176.64 107.135 176.69 107.154 176.745C107.192 176.855 107.186 176.975 107.135 177.081C107.01 177.334 106.855 177.653 106.756 177.855C106.726 177.918 106.682 177.972 106.627 178.014C106.572 178.056 106.507 178.084 106.439 178.096L104.239 178.494C104.147 178.509 104.053 178.496 103.969 178.457L102.605 177.799C102.553 177.774 102.506 177.739 102.468 177.696C102.429 177.653 102.399 177.602 102.38 177.548C102.361 177.493 102.353 177.435 102.356 177.377C102.359 177.319 102.374 177.262 102.399 177.21C102.523 176.955 102.673 176.638 102.778 176.434Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M151.263 200.677C151.293 200.615 151.337 200.562 151.392 200.52C151.447 200.479 151.51 200.451 151.578 200.438C152.091 200.343 153.356 200.117 153.778 200.04C153.87 200.024 153.964 200.037 154.048 200.077L155.414 200.735C155.518 200.786 155.599 200.876 155.638 200.986C155.675 201.097 155.667 201.218 155.618 201.324C155.494 201.577 155.339 201.896 155.238 202.098C155.209 202.161 155.165 202.216 155.109 202.258C155.054 202.3 154.99 202.328 154.921 202.339L152.731 202.737C152.64 202.753 152.546 202.74 152.462 202.7L151.098 202.043C150.992 201.991 150.911 201.9 150.871 201.789C150.852 201.735 150.845 201.677 150.849 201.619C150.853 201.561 150.868 201.505 150.894 201.454C151.007 201.204 151.162 200.879 151.263 200.677Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M150.761 152.445C150.792 152.383 150.836 152.329 150.891 152.287C150.946 152.245 151.01 152.216 151.078 152.203L153.276 151.808C153.368 151.791 153.462 151.804 153.546 151.845L154.912 152.502C155.017 152.553 155.098 152.643 155.136 152.754C155.174 152.864 155.167 152.986 155.116 153.091C154.992 153.345 154.838 153.664 154.737 153.866C154.707 153.928 154.663 153.983 154.607 154.025C154.552 154.067 154.488 154.095 154.419 154.107L152.221 154.502C152.13 154.519 152.035 154.506 151.952 154.465L150.588 153.808C150.535 153.784 150.488 153.749 150.449 153.706C150.41 153.664 150.38 153.613 150.36 153.558C150.341 153.504 150.333 153.446 150.337 153.388C150.341 153.33 150.356 153.273 150.382 153.221C150.505 152.966 150.67 152.646 150.761 152.445Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M200.351 177.237C200.382 177.176 200.427 177.122 200.482 177.081C200.537 177.039 200.6 177.011 200.668 176.999L202.868 176.601C202.96 176.584 203.054 176.597 203.138 176.638L204.504 177.297C204.556 177.322 204.602 177.357 204.64 177.4C204.679 177.444 204.708 177.494 204.726 177.549C204.765 177.659 204.758 177.779 204.708 177.884L204.329 178.659C204.299 178.722 204.255 178.776 204.2 178.818C204.144 178.86 204.08 178.888 204.012 178.9C203.499 178.993 202.234 179.219 201.814 179.297C201.721 179.313 201.626 179.3 201.542 179.26L200.18 178.603C200.074 178.552 199.993 178.461 199.953 178.35C199.916 178.24 199.923 178.119 199.974 178.014L200.351 177.237Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M191.59 187.711L190.943 190.76L174.319 199.28L172.383 197.317L191.59 187.711Z"
                    fill="#333333"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.73438 53.3697V41.6153H4.14045C11.3711 26.9708 34.0496 16.2773 60.8749 16.2773C87.7002 16.2773 110.381 26.9749 117.609 41.6153H120.015V53.3697H119.947C118.411 72.0724 92.5248 86.9745 60.8564 86.9745C29.188 86.9745 3.25877 72.1837 1.73438 53.4809V53.3697Z"
                    fill="url(#paint6_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M107.592 69.1321L169.211 99.9415L160.062 104.515L103.647 76.3092C98.4684 73.7239 102.42 66.827 107.592 69.1321Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M117.651 75.8591C118.78 74.814 120.202 74.138 121.725 73.9212C123.249 73.7044 124.803 73.9572 126.179 74.6458L174.544 98.8219C175.705 99.4025 176.682 100.295 177.365 101.4C178.048 102.504 178.41 103.777 178.41 105.076C178.41 106.375 178.048 107.648 177.365 108.752C176.682 109.857 175.705 110.75 174.544 111.33L174.031 111.594C172.907 112.156 171.668 112.448 170.411 112.448C169.155 112.448 167.916 112.156 166.792 111.594L117.478 86.9357C116.62 86.5066 115.88 85.876 115.32 85.0979C114.76 84.3199 114.397 83.4177 114.262 82.4686C114.127 81.5196 114.224 80.552 114.546 79.6487C114.867 78.7455 115.402 77.9336 116.106 77.2826C116.631 76.7964 117.152 76.3164 117.651 75.8591Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M117.269 81.0938C116.573 82.6429 118.017 85.0078 119.644 85.8317C119.644 85.8317 154.926 103.476 167.436 109.728C168.671 110.345 170.077 110.528 171.428 110.246C172.78 109.965 173.996 109.235 174.881 108.177C175.39 107.57 175.754 106.856 175.947 106.089C176.14 105.321 176.157 104.52 175.996 103.745C175.834 102.971 175.5 102.242 175.017 101.615C174.534 100.989 173.915 100.479 173.207 100.126C166.52 96.7827 156.131 91.5874 152.732 89.892C152.004 89.526 151.187 89.3739 150.376 89.4532L137.943 90.6892C137.132 90.7685 136.316 90.6171 135.587 90.2525C131.454 88.1884 117.269 81.0938 117.269 81.0938Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M60.8671 78.0882C93.5295 78.0882 120.008 61.0553 120.008 40.0441C120.008 19.0329 93.5295 2 60.8671 2C28.2047 2 1.72656 19.0329 1.72656 40.0441C1.72656 61.0553 28.2047 78.0882 60.8671 78.0882Z"
                    fill="url(#paint7_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M60.862 72.008C89.3945 72.008 112.525 57.6976 112.525 40.045C112.525 22.3923 89.3945 8.08203 60.862 8.08203C32.3294 8.08203 9.19922 22.3923 9.19922 40.045C9.19922 57.6976 32.3294 72.008 60.862 72.008Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M149.375 82.428L169.433 49.0107C170.408 47.3879 171.958 46.1924 173.776 45.6631C175.593 45.1338 177.543 45.3097 179.237 46.1556C180.271 46.6734 181.174 47.4184 181.879 48.3348C182.584 49.2513 183.073 50.3154 183.309 51.4474C183.544 52.5795 183.521 53.7502 183.24 54.8718C182.959 55.9935 182.428 57.037 181.686 57.9243L157.699 86.5892L149.375 82.428Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M152.202 77.8203L161.192 82.3173L159.057 84.9047L150.496 80.6652L152.202 77.8203Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M139.488 81.2949L140.302 80.3144C141.307 79.1054 142.692 78.2719 144.231 77.9492C145.77 77.6265 147.372 77.8335 148.779 78.5366L162.861 85.5777C163.446 85.8702 163.961 86.2865 164.369 86.7978C164.777 87.309 165.069 87.903 165.225 88.5384C165.38 89.1738 165.396 89.8354 165.27 90.4774C165.144 91.1194 164.88 91.7264 164.497 92.2562L163.673 93.3892L139.488 81.2949Z"
                    fill="url(#paint8_linear_1409_1265)"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M163.251 93.1538C155.614 93.4525 152.238 98.2049 152.73 104.56L151.031 104.972L148.176 102.271C147.183 96.8268 152.22 89.4994 159.178 91.1062L162.874 91.6954C162.874 91.6954 163.199 93.1559 163.251 93.1538Z"
                    fill="#FFCC01"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M145.546 84.2998C137.916 84.6088 134.532 89.3468 135.016 95.706L133.316 96.118L130.461 93.4194C129.468 87.9728 134.505 80.6474 141.463 82.2522L145.159 82.8434C145.159 82.8434 145.493 84.3039 145.546 84.2998Z"
                    fill="#FFCC01"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M162.875 91.7066C154.029 92.0527 150.463 97.6023 151.03 104.981L146.069 102.509C145.863 96.4096 150.278 87.9347 158.04 89.2985L162.875 91.7148"
                    fill="white"
                  />
                  <path
                    d="M162.875 91.7066C154.029 92.0527 150.463 97.6023 151.03 104.981L146.069 102.509C145.863 96.4096 150.278 87.9347 158.04 89.2985L162.875 91.7148"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M145.167 82.8534C136.321 83.2015 132.755 88.7491 133.322 96.128L128.361 93.656C127.393 86.4233 133.099 78.7993 140.332 80.4452L145.167 82.8616"
                    fill="white"
                  />
                  <path
                    d="M145.167 82.8534C136.321 83.2015 132.755 88.7491 133.322 96.128L128.361 93.656C127.393 86.4233 133.099 78.7993 140.332 80.4452L145.167 82.8616"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M63.7052 150.783L57.1462 147.479L67.7531 142.175L61.1859 138.879L66.4883 136.227L59.921 132.931L44.0034 140.871L50.5707 144.167L39.9637 149.477L26.8292 142.869L32.1337 140.228L25.5664 136.932L52.0827 123.674L58.65 126.97L63.9442 124.308L77.087 130.917L71.7846 133.568L78.3498 136.864L73.0473 139.515L79.6146 142.811L63.7052 150.783ZM76.8377 157.392L70.2705 154.096L86.1922 146.132L92.7595 149.428L76.8377 157.392Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M131.406 175.326C132.024 170.514 136.128 164.892 140.903 162.455C143.342 161.219 145.513 161.025 147.083 161.724L174.526 175.454L159.076 189.177L131.406 175.326Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M171.61 125.102L184.099 131.345L164.391 172.014L158.914 173.483L146.871 167.459L171.61 125.102Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M172.384 147.956L178.152 143.646L164.451 171.982L158.914 173.484L172.384 147.956Z"
                    fill="#FFCC01"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M159.086 189.17C159.704 184.355 163.807 178.734 168.583 176.297C173.424 173.825 177.212 175.522 177.292 180.064C177.115 181.578 176.639 182.386 175.984 182.775L166.43 187.552C164.144 188.663 161.627 189.217 159.086 189.17Z"
                    fill="#999999"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M166.422 187.548C166.749 185.022 168.894 182.072 171.407 180.793C173.947 179.495 175.939 180.381 175.976 182.771L166.422 187.548Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M143.438 99.9141L145.545 100.969C144.721 101.881 143.776 101.793 142.789 101.438L143.438 99.9141Z"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50.4688 25.3477V55.5926"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M71.9297 23.1895V57.7542"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.9922 84.7042L41.5763 81.4082C53.5902 83.8802 65.6062 84.2572 77.6263 81.435L79.0683 85.2583C73.0685 86.4063 66.9728 86.9789 60.8641 86.9682C53.8445 86.987 46.8445 86.2277 39.9922 84.7042Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M169.469 124.035L171.047 120.986L182.75 126.839L183.536 131.066"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M184.824 46.4297C184.824 46.4297 187.902 48.7307 186.118 52.7312"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M155.496 164.588L173.725 132.619"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M173.725 134.101C174.545 134.101 175.209 133.437 175.209 132.618C175.209 131.799 174.545 131.135 173.725 131.135C172.906 131.135 172.242 131.799 172.242 132.618C172.242 133.437 172.906 134.101 173.725 134.101Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M155.491 166.07C156.31 166.07 156.974 165.406 156.974 164.587C156.974 163.768 156.31 163.104 155.491 163.104C154.672 163.104 154.008 163.768 154.008 164.587C154.008 165.406 154.672 166.07 155.491 166.07Z"
                    fill="#333333"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1409_1265"
                      x1="166.156"
                      y1="121.943"
                      x2="195.369"
                      y2="121.943"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3892F3" />
                      <stop offset={1} stopColor="#55A4FA" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1409_1265"
                      x1="172.561"
                      y1="50.8147"
                      x2="188.305"
                      y2="50.8147"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3892F3" />
                      <stop offset={1} stopColor="#55A4FA" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1409_1265"
                      x1="59.4189"
                      y1="39.1131"
                      x2="59.4189"
                      y2="138.496"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3892F3" />
                      <stop offset={1} stopColor="#3892F3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1409_1265"
                      x1="65.6839"
                      y1="16.8326"
                      x2="61.0319"
                      y2="120.435"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3892F3" />
                      <stop offset={1} stopColor="#3892F3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_1409_1265"
                      x1="145.553"
                      y1={166}
                      x2="183.025"
                      y2="211.67"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3790EF" />
                      <stop offset={1} stopColor="#5BA9FD" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_1409_1265"
                      x1="145.139"
                      y1="166.459"
                      x2="171.657"
                      y2="214.029"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#EFEFEF" />
                      <stop offset="0.61" stopColor="#E3E3E3" />
                      <stop offset="0.82" stopColor="#C6C6C6" />
                      <stop offset={1} stopColor="#A6A6A6" />
                    </linearGradient>
                    <linearGradient
                      id="paint6_linear_1409_1265"
                      x1="27.2842"
                      y1="33.4711"
                      x2="108.935"
                      y2="80.907"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3892F3" />
                      <stop offset={1} stopColor="#55A4FA" />
                    </linearGradient>
                    <linearGradient
                      id="paint7_linear_1409_1265"
                      x1="60.727"
                      y1="6.65752"
                      x2="69.745"
                      y2="81.7781"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset={1} stopColor="#B3B3B3" />
                    </linearGradient>
                    <linearGradient
                      id="paint8_linear_1409_1265"
                      x1="139.488"
                      y1="85.5962"
                      x2="165.354"
                      y2="85.5962"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3892F3" />
                      <stop offset={1} stopColor="#55A4FA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
