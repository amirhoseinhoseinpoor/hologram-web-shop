"use client";
// import data ( remove it later )

import mainItems from "/public/json/Header.json";

import style from "../Styles/MainStyle/Header.module.scss";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Offcanvas,
} from "react-bootstrap";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CallIcon from "@mui/icons-material/Call";
import { usePathname } from "next/navigation";

// import redux
import { useSelector } from "react-redux";
import Link from "next/link";

const renderSubItems = (subItems, depth = 1) => {
  return subItems.map((subItem) => {
    if (subItem.subItems && subItem.subItems.length > 0) {
      return (
        <div
          className="me-2 mb-2"
          style={{ lineHeight: "28px" }}
          key={subItem.id}
        >
          <Link href={subItem.link}>
            <div
              className={style.colornav}
              key={subItem.id}
              title={subItem.title}
            >
              {subItem.title}
            </div>
          </Link>
          {renderSubItems(subItem.subItems, depth + 1)}
        </div>
      );
    } else {
      return (
        <Nav.Link key={subItem.id} href={subItem.link}>
          {subItem.title}
        </Nav.Link>
      );
    }
  });
};

export default function Header() {
  const pathname = usePathname();
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const getBasePath = (path) => {
    // This will capture the first segment of the path after the initial '/'
    const match = path.match(/^\/([^\/]*)/);
    return match ? `/${match[1]}` : "/";
  };

  // State to manage visibility of all off-canvas elements dynamically
  const [visibility, setVisibility] = useState({});

  // Function to toggle visibility
  const toggleShow = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Function to close a specific off-canvas
  const handleClose = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: false }));
  };

  // const mainItems = [
  //   { link: "/", title: "خانه", subItems: [] },
  //   {
  //     link: "#test2",
  //     title: "محصولات",
  //     subItems: [
  //       {
  //         link: "#awdwa",
  //         title: "هولوگرام",
  //         subItems: [
  //           {
  //             link: "#1324",
  //             title: "هولوگرام‌های تخریب شونده",
  //             subItems: [],
  //           },
  //           {
  //             link: "#ggg",
  //             title: "هولوگرام‌های شفاف",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "هولوگرام کارت‌های پی وی سی",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "بارکد هولوگرام",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "هولوگرام‌های رنگی",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "هولوگرام با تخریب اختصاصی",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "نوار هولوگرام",
  //             subItems: [],
  //           },
  //         ],
  //       },
  //       {
  //         link: "#2",
  //         title: "لیبل‌های امنیتی",
  //         subItems: [
  //           {
  //             link: "#sss",
  //             title: "لیبل با نوار هولوگرام",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "لیبل با چاپ امنیتی و نوار هولوگرام",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "لیبل‌های هولوگرافیک",
  //             subItems: [],
  //           },
  //         ],
  //       },
  //       {
  //         link: "#2",
  //         title: "برچسب‌های پلمپ",
  //         subItems: [
  //           {
  //             link: "#sss",
  //             title: "لیبل پلمپ با تخریب عمومی",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "لیبل پلمپ با تخریب اختصاصی",
  //             subItems: [],
  //           },
  //         ],
  //       },
  //       {
  //         link: "#2",
  //         title: "اسکرچ",
  //         subItems: [
  //           {
  //             link: "#sss",
  //             title: "انواع اسکرچ زبرا",
  //             subItems: [],
  //           },
  //           {
  //             link: "#sss",
  //             title: "هولو اسکرچ",
  //             subItems: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   { link: "#test3", title: "معرفی هولگرام‌ها", subItems: [] },
  //   { link: "#test4", title: "ثبت سفارش", subItems: [] },
  //   { link: "/Blog", title: "مقالات", subItems: [] },
  //   { link: "/ContactUs", title: "ارتباط با ما", subItems: [] },
  //   { link: "/AboutUs", title: "درباره‌ی ما", subItems: [] },
  // ];

  const addKeys = (items) => {
    return items.map((item, index) => ({
      ...item,
      id: index,
      subItems: item.subItems ? addKeys(item.subItems) : [],
    }));
  };

  const mainItemObject = addKeys(mainItems);

  return (
    <section
      className={`${style.headermainbackground}  ${style.sectionheaderfix}`}
    >
      <Navbar
        expand="lg"
        collapseOnSelect
        className={`${style.adjustNavPadding} bg-body-tertiary`}
      >
        <Container className={style.headerresponsivemain}>
          <div className="d-flex flex-row justify-content-between">
            <Navbar.Brand href="#">
              <p className="ms-4">لوگو</p>
            </Navbar.Brand>
            {/* phone number descktop div */}
            <div
              className={`d-none ${style.phonenumbercall} d-flex flex-row align-items-center`}
            >
              <p>
                <span>۰۲۱-</span>۶۶۹۷۱۴۰۲-۵
              </p>
              <div className={style.phonecallheadericon}>
                <CallIcon></CallIcon>
              </div>
            </div>
            {/* navbar descktop */}
            <div
              className={`d-lg-block d-none justify-content-between ${style.navbaritemheader}`}
            >
              <Nav className="align-items-center ">
                {mainItemObject.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.subItems.length > 0 ? (
                      <NavDropdown
                        className={`${
                          getBasePath(pathname) === item.link
                            ? style.active
                            : style.noneactive
                        } ${style.navDropDown}`}
                        key={item.id}
                        title={
                          <React.Fragment key={item.id}>
                            {item.title}
                            <KeyboardArrowDownIcon key={item.id} />
                          </React.Fragment>
                        }
                        id={`basic-nav-dropdown-${item.id}`}
                      >
                        <div className={style.fixcolumn}>
                          {renderSubItems(item.subItems)}
                        </div>
                      </NavDropdown>
                    ) : (
                      <Nav.Link
                        className={`${
                          getBasePath(pathname) === item.link
                            ? style.active
                            : style.noneactive
                        }`}
                        key={item.id}
                        href={item.link}
                      >
                        {item.title}
                      </Nav.Link>
                    )}
                  </React.Fragment>
                ))}
              </Nav>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between d-block d-lg-none">
            <div className="d-lg-none">
              <Navbar.Toggle
                onClick={() => toggleShow("main")}
                className="basic-navbar-nav"
                aria-controls="basic-navbar-nav"
              />
            </div>

            <div className="d-lg-none">
              {token ? (
                <NavDropdown
                  title={
                    <>
                      <Box
                        component="img"
                        sx={{
                          maxHeight: 16,
                          objectFit: "cover",
                          aspectRatio: 1.7,
                        }}
                        alt="iran"
                        src="/HomeImages/iran-logo.png"
                      />
                      <KeyboardArrowDownIcon className="mb-2"></KeyboardArrowDownIcon>
                    </>
                  }
                  id="basic-nav-dropdown"
                ></NavDropdown>
              ) : (
                <Link className="text-decoration-none" href="/Login" passHref>
                  <div
                    className={`${style.headerIconPersonDiv} d-flex flex-row`}
                  >
                    <div>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 10.0003C12.3012 10.0003 14.1667 8.13485 14.1667 5.83366C14.1667 3.53247 12.3012 1.66699 10 1.66699C7.69885 1.66699 5.83337 3.53247 5.83337 5.83366C5.83337 8.13485 7.69885 10.0003 10 10.0003Z"
                          stroke="#333333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
                          stroke="#333333"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="me-1">
                      <p>حساب کاربری</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* navbar responsive */}
          <div className="d-lg-none d-block">
            <Navbar.Offcanvas
              placement="end"
              className={`me-5 ${style.navbaritemheader}`}
              show={visibility["main"]}
              onHide={() => handleClose("main")}
              id="basic-navbar-nav"
            >
              <Offcanvas.Header
                className={`${style.offcanvasheader} ${style.nextoffcanvas}`}
                closeButton
              >
                <Offcanvas.Title>لوگو</Offcanvas.Title>
              </Offcanvas.Header>

              <Nav className="align-items-center me-2">
                {mainItemObject.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.subItems.length > 0 ? (
                      <React.Fragment key={item.id}>
                        <Navbar.Toggle
                          className="text-end"
                          aria-controls={`offcanvas-${item.id}`}
                          onClick={() => toggleShow(item.id)}
                        >
                          <React.Fragment key={item.id}>
                            {item.title}
                            <KeyboardArrowDownIcon
                              key={item.id}
                            ></KeyboardArrowDownIcon>
                          </React.Fragment>
                        </Navbar.Toggle>

                        <Navbar.Offcanvas
                          placement="end"
                          key={item.id}
                          show={visibility[item.id]}
                          onHide={() => handleClose(item.id)}
                          id={`offcanvas-${item.id}`}
                        >
                          <Offcanvas.Header className={style.offcanvasheader}>
                            <button
                              className={style.innnerstyle}
                              onClick={() => handleClose(item.id)}
                            >
                              <ArrowForwardIcon />
                              <Offcanvas.Title>{item.title}</Offcanvas.Title>
                            </button>
                          </Offcanvas.Header>
                          {renderSubItems(item.subItems)}
                        </Navbar.Offcanvas>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={item.id}>
                        <Nav.Link key={item.id} href={item.link}>
                          {item.title}
                        </Nav.Link>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
                {/* phone number */}
                <div
                  className={`d-none ${style.phonenumbercall} d-flex flex-row align-items-center mt-3`}
                >
                  <p>
                    <span>۰۲۱-</span>۶۶۹۷۱۴۰۲-۵
                  </p>
                  <div className={style.phonecallheadericon}>
                    <CallIcon></CallIcon>
                  </div>
                </div>
              </Nav>
            </Navbar.Offcanvas>
          </div>

          <div className="d-lg-block d-none">
            {token ? (
              <NavDropdown
                title={
                  <>
                    <Box
                      component="img"
                      sx={{
                        maxHeight: 16,
                        objectFit: "cover",
                        aspectRatio: 1.7,
                      }}
                      alt="iran"
                      src="/HomeImages/iran-logo.png"
                    />
                    <KeyboardArrowDownIcon className="mb-2"></KeyboardArrowDownIcon>
                  </>
                }
                id="basic-nav-dropdown"
              ></NavDropdown>
            ) : (
              <Link className="text-decoration-none" href="/Login" passHref>
                <div className={`${style.headerIconPersonDiv} d-flex flex-row`}>
                  <div>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 10.0003C12.3012 10.0003 14.1667 8.13485 14.1667 5.83366C14.1667 3.53247 12.3012 1.66699 10 1.66699C7.69885 1.66699 5.83337 3.53247 5.83337 5.83366C5.83337 8.13485 7.69885 10.0003 10 10.0003Z"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="me-1">
                    <p>حساب کاربری</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
    </section>
  );
}
