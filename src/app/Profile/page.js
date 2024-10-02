"use client"

import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { childValue } from "../Store/slice";
import { firstName , lastName , phoneNumber } from "../Store/slice";
import { useSearchParams } from "next/navigation";

import Header from "../Components/Header";
import Hoc from "../Components/HOCcomponent";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load the MakeOrder component
const MakeOrder = dynamic(
  () => import("../eachPageComponent/Profile/MakeOrderComponents/MakeOrder"),
  {
    ssr: false, // Disable SSR if it's a client-side component
    loading: () => <p>Loading...</p>, // Fallback content while loading
  }
);

const SeeOrder = dynamic(
  () => import("../eachPageComponent/Profile/seeOrderComponents/seeOrder"),
  {
    ssr: false, // Disable SSR if it's a client-side component
    loading: () => <p>Loading...</p>, // Fallback content while loading
  }
);

const UserInfo = dynamic(
  () => import("../eachPageComponent/Profile/UserInfoComponents/userInfo"),
  {
    ssr: false, // Disable SSR if it's a client-side component
    loading: () => <p>Loading...</p>, // Fallback content while loading
  }
);

const Message = dynamic(
  () => import("../eachPageComponent/Profile/messageComponents/message"),
  {
    ssr: false, // Disable SSR if it's a client-side component
    loading: () => <p>Loading...</p>, // Fallback content while loading
  }
);

const Favorite = dynamic(
  () => import("../eachPageComponent/Profile/FavoriteComponents/favorite"),
  {
    ssr: false, // Disable SSR if it's a client-side component
    loading: () => <p>Loading...</p>, // Fallback content while loading
  }
);

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import style from "../Styles/Profile/ProfileStyle.module.scss";

// Component that uses useSearchParams
const ProfileTabs = ({ setActiveTab, activeTab }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      id="Profile-tabs"
      className={style.sidebarMain}
    >
      <Tab eventKey="makeOrder" title="ثبت سفارش"></Tab>
      <Tab eventKey="seeOrder" title="پیگیری سفارش"></Tab>
      <Tab eventKey="userInfo" title="اطلاعات کاربری"></Tab>
      <Tab eventKey="message" title="پیغام ها"></Tab>
      <Tab eventKey="favorite" title="لیست‌های مورد علاقه"></Tab>
    </Tabs>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("makeOrder");
  const [lastPage, setLastPage] = useState("/");

  const childValue2 = useSelector(childValue);

  const firstname = useSelector(firstName);
  const lastname = useSelector(lastName);
  const phonenumber = useSelector(phoneNumber);

  useEffect(() => {
    if (childValue2 !== null) {
      setActiveTab(childValue2);
    }
  }, [childValue2]);

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastPage = sessionStorage.getItem("lastPage") || "/";
      setLastPage(lastPage);
    }
  }, []);

  return (
    <>
      <Header />
      <section className={` ${style.adminPanel}`}>
        <div className={`${style.flexSideBarContent} container`}>
          <aside className={`${style.sidebar} h-100`}>
            <div className={style.userinfoInSidebar}>
              <div className="d-flex flex-column">
                <p>{firstname} {lastname}</p>
                <p>{phonenumber}</p>
              </div>
              <div
                onClick={() => setActiveTab("userInfo")}
                className={style.EditBtnSvg}
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
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </Suspense>
          </aside>
          <div className={style.content}>
            <div className="d-lg-none d-block mt-2 mb-3 me-3">
              <Link href={lastPage} className={style.linkFortheNavigateBack}>
                <div className="d-flex flex-row align-items-center gap-2">
                  <div>
                    <svg
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0254 5.44141L17.0837 10.4997L12.0254 15.5581"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.91699 10.5H16.942"
                        stroke="#333333"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="QASize">باگشت به پروفایل</p>
                </div>
              </Link>
            </div>
            {activeTab === "makeOrder" && <MakeOrder />}
            {activeTab === "seeOrder" && <SeeOrder />}
            {activeTab === "userInfo" && <UserInfo />}
            {activeTab === "message" && <Message />}
            {activeTab === "favorite" && <Favorite />}
          </div>
        </div>
      </section>
    </>
  );
};

Profile.displayName = "Profile";



export default Hoc(Profile);
