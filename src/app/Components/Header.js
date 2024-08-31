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
import Profile from "../Profile/page";
import { token } from "../Store/slice";

const renderSubItems = (subItems, depth = 1) => {
  return subItems.map((subItem) => {
    if (subItem.subItems && subItem.subItems.length > 0) {
      return (
        <div
          className="me-2 mb-2"
          style={{ lineHeight: "28px" }}
          key={subItem.id}
        >
          <Link
            href={subItem.link}
            className="NormalTextSizing"
            style={{ textDecoration: "none", color: "#333333" }}
          >
            <div
              className={`${style.colornav} NormalTextSizing`}
              key={subItem.id}
              title={subItem.title}
            >
              {subItem.title}
            </div>
          </Link>
          <div className="d-flex flex-column gap-3 NormalTextSizing">
            {renderSubItems(subItem.subItems, depth + 1)}
          </div>
        </div>
      );
    } else {
      return (
        <Link
          style={{ textDecoration: "none", color: "#333333" }}
          key={subItem.id}
          href={subItem.link}
          className="NormalTextSizing"
        >
          {subItem.title}
        </Link>
      );
    }
  });
};

export default function Header() {
  const pathname = usePathname();
  const token2 = useSelector(token);
  console.log(token2);

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

  const addKeys = (items) => {
    return items.map((item, index) => ({
      ...item,
      id: index,
      subItems: item.subItems ? addKeys(item.subItems) : [],
    }));
  };

  const mainItemObject = addKeys(mainItems);

  // store the url
  const storeLastVisitedPage = () => {
    const lastPage = window.location.pathname;
    if (lastPage !== "/Profile") {
      sessionStorage.setItem("lastPage", lastPage);
    }
    
  };

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
              className={`d-lg-block d-none justify-content-between m-auto ${style.navbaritemheader}`}
            >
              <Nav className="align-items-center gap-3">
                {mainItemObject.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.subItems.length > 0 ? (
                      <NavDropdown
                        className={`${
                          getBasePath(pathname) === item.link
                            ? style.active
                            : style.noneactive
                        } ${style.navDropDown} NormalTextSizing`}
                        key={item.id}
                        title={
                          <React.Fragment key={item.id}>
                            {item.title}
                            <KeyboardArrowDownIcon key={item.id} />
                          </React.Fragment>
                        }
                        id={`basic-nav-dropdown-${item.id}`}
                      >
                        <div>
                          <div className={`${style.fixcolumn} `}>
                            {renderSubItems(item.subItems)}
                          </div>
                        </div>
                      </NavDropdown>
                    ) : (
                      <Link
                        style={{ textDecoration: "none" }}
                        className={`${
                          getBasePath(pathname) === item.link
                            ? style.active
                            : style.noneactive
                        } NormalTextSizing`}
                        key={item.id}
                        href={item.link}
                      >
                        {item.title}
                      </Link>
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
              {token2 ? (
                <NavDropdown
                  className={style.DropDownForUserInfo}
                  title={
                    <>
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
                        <div className="me-1 d-flex flex-row align-items-center">
                          <p className="NormalTextSizing align-items-center">
                            اسم کاربر اینجا
                          </p>
                          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                        </div>
                      </div>
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <div className={style.userinfoInSidebar}>
                    <div className="d-flex flex-column">
                      <p className="VodeoDisSizing mb-1">بهار رستمی نیا</p>
                      <p className="discription">091286568542</p>
                    </div>
                    <div
                      // onClick={() => setActiveTab("userInfo")}
                      className={style.EditBtnSvg}
                    >
                      <Link
                       onClick={storeLastVisitedPage}
                        href={`/Profile?type=${encodeURIComponent(
                          "userInfo"
                        )}`}
                        passHref
                      >
                        <svg
                          width={20}
                          height={21}
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.9455 3.19992L3.788 9.71742C3.5555 9.96492 3.3305 10.4524 3.2855 10.7899L3.008 13.2199C2.9105 14.0974 3.5405 14.6974 4.4105 14.5474L6.8255 14.1349C7.163 14.0749 7.6355 13.8274 7.868 13.5724L14.0255 7.05492C15.0905 5.92992 15.5705 4.64742 13.913 3.07992C12.263 1.52742 11.0105 2.07492 9.9455 3.19992Z"
                            stroke="#F3802C"
                            strokeWidth="1.5"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.91797 4.2876C9.24047 6.3576 10.9205 7.9401 13.0055 8.1501"
                            stroke="#F3802C"
                            strokeWidth="1.5"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.25 17H15.75"
                            stroke="#F3802C"
                            strokeWidth="1.5"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 me-1 mb-3 d-flex flex-column gap-2">
                    <Link
                      onClick={storeLastVisitedPage}
                      className={style.LinkOfprofile}
                      href={`/Profile?type=${encodeURIComponent("makeOrder")}`}
                    >
                      <p className="VodeoDisSizing">ثبت سفارش</p>
                    </Link>
                    <Link
                      onClick={storeLastVisitedPage}
                      className={style.LinkOfprofile}
                      href={`/Profile?type=${encodeURIComponent("seeOrder")}`}
                    >
                      <p className="VodeoDisSizing">پیگیری سفارش</p>
                    </Link>
                    <Link
                       onClick={storeLastVisitedPage}
                      className={style.LinkOfprofile}
                      href={`/Profile?type=${encodeURIComponent("userInfo")}`}
                    >
                      <p className="VodeoDisSizing">اطلاعات کاربری</p>
                    </Link>
                    <Link
                     onClick={storeLastVisitedPage}
                      className={style.LinkOfprofile}
                      href={`/Profile?type=${encodeURIComponent("message")}`}
                    >
                      <p className="VodeoDisSizing">پیغام ها</p>
                    </Link>
                    <Link
                     onClick={storeLastVisitedPage}
                      className={`${style.LinkOfprofile}`}
                      href={`/Profile?type=${encodeURIComponent("favorite")}`}
                    >
                      <p className="VodeoDisSizing">لیست‌های مورد علاقه</p>
                    </Link>
                  </div>
                </NavDropdown>
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-decoration-none"
                  href="/Login"
                  passHref
                >
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
                      <p className="NormalTextSizing">ورود | ثبت نام</p>
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

              <Nav className="align-items-center me-2 gap-3">
                {mainItemObject.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.subItems.length > 0 ? (
                      <React.Fragment key={item.id}>
                        <Navbar.Toggle
                          className="text-end m-0"
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
                          className={style.ofcanvasInnerCreateScrool}
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
                        <Link
                          style={{ textDecoration: "none", color: "#333333" }}
                          key={item.id}
                          href={item.link}
                        >
                          {item.title}
                        </Link>
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
            {token2 ? (
              <NavDropdown
                className={style.DropDownForUserInfo}
                title={
                  <>
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
                      <div className="me-1 d-flex flex-row ">
                        <p className="NormalTextSizing">اسم کاربر اینجا</p>
                        <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                      </div>
                    </div>
                  </>
                }
                id="basic-nav-dropdown"
              >
                <div className={style.userinfoInSidebar}>
                  <div className="d-flex flex-column">
                    <p className="VodeoDisSizing mb-1">بهار رستمی نیا</p>
                    <p className="discription">091286568542</p>
                  </div>
                  <div
                    // onClick={() => setActiveTab("userInfo")}
                    className={style.EditBtnSvg}
                  >
                    <Link
                      href={`/Profile?type=${encodeURIComponent("userInfo")}`}
                      passHref
                    >
                      <svg
                        width={20}
                        height={21}
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.9455 3.19992L3.788 9.71742C3.5555 9.96492 3.3305 10.4524 3.2855 10.7899L3.008 13.2199C2.9105 14.0974 3.5405 14.6974 4.4105 14.5474L6.8255 14.1349C7.163 14.0749 7.6355 13.8274 7.868 13.5724L14.0255 7.05492C15.0905 5.92992 15.5705 4.64742 13.913 3.07992C12.263 1.52742 11.0105 2.07492 9.9455 3.19992Z"
                          stroke="#F3802C"
                          strokeWidth="1.5"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.91797 4.2876C9.24047 6.3576 10.9205 7.9401 13.0055 8.1501"
                          stroke="#F3802C"
                          strokeWidth="1.5"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.25 17H15.75"
                          stroke="#F3802C"
                          strokeWidth="1.5"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="mt-2 me-1 mb-3 d-flex flex-column gap-2">
                  <Link
                   onClick={storeLastVisitedPage}
                    className={style.LinkOfprofile}
                    href={`/Profile?type=${encodeURIComponent("makeOrder")}`}
                  >
                    <p className="VodeoDisSizing">ثبت سفارش</p>
                  </Link>
                  <Link
                   onClick={storeLastVisitedPage}
                    className={style.LinkOfprofile}
                    href={`/Profile?type=${encodeURIComponent("seeOrder")}`}
                  >
                    <p className="VodeoDisSizing">پیگیری سفارش</p>
                  </Link>
                  <Link
                   onClick={storeLastVisitedPage}
                    className={style.LinkOfprofile}
                    href={`/Profile?type=${encodeURIComponent("userInfo")}`}
                  >
                    <p className="VodeoDisSizing">اطلاعات کاربری</p>
                  </Link>
                  <Link
                   onClick={storeLastVisitedPage}
                    className={style.LinkOfprofile}
                    href={`/Profile?type=${encodeURIComponent("message")}`}
                  >
                    <p className="VodeoDisSizing">پیغام ها</p>
                  </Link>
                  <Link
                   onClick={storeLastVisitedPage}
                    className={`${style.LinkOfprofile}`}
                    href={`/Profile?type=${encodeURIComponent("favorite")}`}
                  >
                    <p className="VodeoDisSizing">لیست‌های مورد علاقه</p>
                  </Link>
                </div>
              </NavDropdown>
            ) : (
              <Link
                onClick={storeLastVisitedPage}
                className="text-decoration-none"
                href="/Login"
                passHref
              >
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
                    <p className="NormalTextSizing">ورود | ثبت نام</p>
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
