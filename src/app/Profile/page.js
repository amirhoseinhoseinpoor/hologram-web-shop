// src/components/Profile.js

"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
// Import Redux
import { childValue } from "../Store/slice";
import { firstName, lastName, phoneNumber } from "../Store/slice";
import { useDispatch, useSelector } from "react-redux";
import { getUserProduct, list } from "@/app/Store/thunks";
import { productListData, userOrdersData } from "@/app/Store/slice";

import { useSearchParams } from "next/navigation";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Hoc from "../Components/HOCcomponent";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load the components
const MakeOrder = dynamic(
  () => import("../eachPageComponent/Profile/MakeOrderComponents/MakeOrder"),
  {
    ssr: false,
    loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
  }
);

const SeeOrder = dynamic(
  () => import("../eachPageComponent/Profile/seeOrderComponents/seeOrder"),
  {
    ssr: false,
    loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
  }
);

const UserInfo = dynamic(
  () => import("../eachPageComponent/Profile/UserInfoComponents/userInfo"),
  {
    ssr: false,
    loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
  }
);

const Message = dynamic(
  () => import("../eachPageComponent/Profile/messageComponents/message"),
  {
    ssr: false,
    loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
  }
);

const Favorite = dynamic(
  () => import("../eachPageComponent/Profile/FavoriteComponents/favorite"),
  {
    ssr: false,
    loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
  }
);

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import style from "../Styles/Profile/ProfileStyle.module.scss";

// Component that uses useSearchParams
const ProfileTabs = ({ setActiveTab, activeTab, storeLastVisitedPage , setUpdateData }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type, setActiveTab]);



  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      id="Profile-tabs"
      className={style.sidebarMain}
    >
      <Tab
        eventKey="makeOrder"
        title={
          <Link
          className={style.DisableLinkStyle}
            href={`/Profile?type=${encodeURIComponent("makeOrder")}`}
            onClick={storeLastVisitedPage}
          >
            <p className="VodeoDisSizing">ثبت سفارش</p>
          </Link>
        }
      ></Tab>
      <Tab
        eventKey="SeeOrder"
        title={
          <Link
          className={style.DisableLinkStyle}
            href={`/Profile?type=${encodeURIComponent("SeeOrder")}`}
            onClick={() => {
              storeLastVisitedPage()
              setUpdateData(true)
            }}
          >
            <p className="VodeoDisSizing">پیگیری سفارش</p>
          </Link>
        }
        
      ></Tab>
      <Tab
        eventKey="userInfo"
        title={
          <Link
          className={style.DisableLinkStyle}
            href={`/Profile?type=${encodeURIComponent("userInfo")}`}
            onClick={storeLastVisitedPage}
          >
            <p className="VodeoDisSizing">اطلاعات کاربری</p>
          </Link>
        }
       
      ></Tab>
      <Tab
        eventKey="message"
        title={
          <Link
          className={style.DisableLinkStyle}
            href={`/Profile?type=${encodeURIComponent("message")}`}
            onClick={storeLastVisitedPage}
          >
            <p className="VodeoDisSizing">پیغام ها</p>
          </Link>
        }
        
      ></Tab>
      <Tab
        eventKey="favorite"
        title={
          <Link
            className={style.DisableLinkStyle}
            href={`/Profile?type=${encodeURIComponent("favorite")}`}
            onClick={storeLastVisitedPage}
          >
            <p className="VodeoDisSizing">لیست‌های مورد علاقه</p>
          </Link>
        }
       
      ></Tab>
    </Tabs>
  );
};

const Profile = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("makeOrder");
  const [lastPage, setLastPage] = useState("/");
  const [currentOrder, setCurrentorder] = useState("");
  const [updateData, setUpdateData] = useState(false);

  const childValue2 = useSelector(childValue);

  const firstname = useSelector(firstName);
  const lastname = useSelector(lastName);
  const phonenumber = useSelector(phoneNumber);

  const checkData = useSelector(userOrdersData);

  const products = useSelector(productListData);

  const [newFinalData, setNewFinalData] = useState([]);

  const storeLastVisitedPage = () => {
    const lastPage = window.location.pathname;
    if (lastPage !== "/Profile") {
      sessionStorage.setItem("lastPage", lastPage);
    }
  };

  // Consolidated useEffect for fetching data when updateData is true
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserProduct());
        await dispatch(list());
        setUpdateData(false);
      } catch (error) {
        console.error("Error during dispatch:", error);
      }
    };

    if (updateData) {
      fetchData();
    }
  }, [dispatch, updateData]);

  // Initial data fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      try {
        await dispatch(getUserProduct());
        await dispatch(list());
      } catch (error) {
        console.error("Error during initial fetch:", error);
      }
    };
    initialFetch();
  }, [dispatch]);

  // Synchronize newFinalData and currentOrder
  useEffect(() => {
    const productImageMap = products?.reduce((acc, item) => {
      const imageSrc =
        item.info.imgData.find((image) => image.type === "1")?.src || null;
      if (item.name && imageSrc) {
        acc[item.name.trim().toLowerCase()] = imageSrc; // Ensure the key is lowercase and trimmed
      }
      return acc;
    }, {});

    // Add the corresponding image src to each item in checkData
    const updatedCheckData = checkData?.map((item) => {
      const productName = (item?.request?.prodName ?? item?.request?.[0]?.name)
        ?.trim()
        .toLowerCase();
      const imageSrc =
        productImageMap && productImageMap[productName]
          ? productImageMap[productName]
          : null; // Find the corresponding image src
      return {
        ...item,
        imageSrc, // Add new property
      };
    });
    setNewFinalData(updatedCheckData || []);
  }, [checkData, products]);

  // Update activeTab based on childValue2 from Redux
  useEffect(() => {
    if (childValue2 !== null) {
      setActiveTab(childValue2);
    }
  }, [childValue2]);

  // Retrieve lastPage from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastPage = sessionStorage.getItem("lastPage") || "/";
      setLastPage(lastPage);
    }
  }, []);

  // Synchronize currentOrder with updated newFinalData
  useEffect(() => {
    if (currentOrder) {
      const updatedOrder = newFinalData.find(
        (order) => order.code === currentOrder.code
      );
      if (updatedOrder) {
        setCurrentorder(updatedOrder);
      }
    }
  }, [newFinalData, currentOrder]);

  return (
    <div className={style.page}>
      <Header />
      <section className={style.adminPanel}>
        <div className={`${style.flexSideBarContent} container`}>
          <aside className={`${style.sidebar} h-100`}>
            <div className={style.userinfoInSidebar}>
              <div className="d-flex flex-column">
                <p>
                  {firstname} {lastname}
                </p>
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
            <Suspense fallback={<div className="az-spinner" />}>
              <ProfileTabs
                setUpdateData={setUpdateData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                storeLastVisitedPage={storeLastVisitedPage}
              />
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
                  <p className="QASize">بازگشت</p>
                </div>
              </Link>
            </div>
            {activeTab === "makeOrder" && (
              <MakeOrder
                setUpdateData={setUpdateData}
                setActiveTab={setActiveTab}
                currentOrder={currentOrder}
              />
            )}
            {activeTab === "SeeOrder" && (
              <SeeOrder
                setUpdateData={setUpdateData}
                newFinalData={newFinalData}
                setActiveTab={setActiveTab}
                setCurrentorder={setCurrentorder}
              />
            )}
            {activeTab === "userInfo" && <UserInfo />}
            {activeTab === "message" && <Message />}
            {activeTab === "favorite" && <Favorite />}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

Profile.displayName = "Profile";

export default Hoc(Profile);
