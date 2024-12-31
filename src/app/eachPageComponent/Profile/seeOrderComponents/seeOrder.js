// src/components/SeeOrder.js

import React from "react";
import { Card, CardMedia, CardContent } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import style from "/src/app/Styles/Profile/SeeOrderStyle/SeeOrder.module.scss";
import { formatPersianDate } from "@/app/utils/persionDateUtils";

export default function SeeOrder({
  setActiveTab,
  setCurrentorder,
  newFinalData,
}) {
  const copyUrlToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("کپی موفق آمیز بود");
    } catch (err) {
      alert("کپی ناموفق بود: " + err);
    }
  };

  const handelOrderClick = (item) => {
    setActiveTab("makeOrder");
    setCurrentorder(item);
  };

  // Function to convert status number to text
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "درحال برسی";
      case 2:
        return "درحال تولید";
      case 3:
        return "درحال ارسال";
      case 4:
        return "تحویل داده شده";
      case 5:
        return "لغو شده";
      default:
        return "Unknown Status";
    }
  };

  // Function to get corresponding CSS class based on the status number
  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return style.pendingStatus; // Class for pending status
      case 2:
        return style.inProductionStatus; // Class for in production status
      case 3:
        return style.inDeliveryStatus; // Class for in delivery status
      case 4:
        return style.deliveredStatus; // Class for delivered status
      case 5:
        return style.canceledStatus; // Class for canceled status
      default:
        return style.defaultStatus; // Class for unknown status
    }
  };

  return (
    <section>
      <div>
        <div className={style.EachDivStyle}>
          {newFinalData?.map((item, index) => (
            <Card key={index} className={style.MainBOXCardStyle}>
              <div
                className={`${style.MakeTheContentResponsive} d-flex flex-row`}
              >
                {item.imageSrc && (
                  <div>
                    <CardMedia
                      component="img"
                      src={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${item.imageSrc}`}
                      alt={item.title || "Order Image"}
                      sx={{
                        borderRadius: "14px",
                        maxHeight: "190px",
                        maxWidth: "220px",
                        padding: "10px",
                      }}
                    />
                  </div>
                )}

                <CardContent className={`${style.resetPaddingMui}`}>
                  <div dir="rtl">
                    <p className="seeOrderFont">
                      {item?.request?.prodName || "محصول پایه"}
                    </p>

                    <div className="d-flex flex-row gap-2">
                      <p
                        className={`${style.coloredTitle} discription mt-1 mb-1`}
                      >
                        تاریخ ثبت سفارش:
                      </p>
                      <p className="discription mt-1 mb-1">
                        {formatPersianDate(item.createdAt)}
                      </p>
                    </div>
                    <div className="d-flex flex-row gap-2 align-items-center mt-1 mb-1">
                      <p className={`${style.coloredTitle} discription `}>
                        کد رهگیری:
                      </p>
                      <p className={`${style.trackCode} discription`}>
                        {item.code}
                      </p>
                      <Tooltip title="کپی کد رهگیری">
                        <span
                          onClick={() => copyUrlToClipboard(item.code)}
                          className={`${style.CopySvgButton} d-flex`}
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 7.33203C4 5.44641 4 4.5036 4.58579 3.91782C5.17157 3.33203 6.11438 3.33203 8 3.33203H10C11.8856 3.33203 12.8284 3.33203 13.4142 3.91782C14 4.5036 14 5.44641 14 7.33203V10.6654C14 12.551 14 13.4938 13.4142 14.0796C12.8284 14.6654 11.8856 14.6654 10 14.6654H8C6.11438 14.6654 5.17157 14.6654 4.58579 14.0796C4 13.4938 4 12.551 4 10.6654V7.33203Z"
                              stroke="#5695F6"
                            />
                            <path
                              d="M4 12.6654C2.89543 12.6654 2 11.7699 2 10.6654V6.66536C2 4.15121 2 2.89413 2.78105 2.11308C3.5621 1.33203 4.81918 1.33203 7.33333 1.33203H10C11.1046 1.33203 12 2.22746 12 3.33203"
                              stroke="#5695F6"
                            />
                          </svg>
                        </span>
                      </Tooltip>
                    </div>
                    <div className="d-flex flex-row gap-2">
                      <p
                        className={`${style.coloredTitle} discription mt-1 mb-1`}
                      >
                        نوع تحویل:
                      </p>
                      {item.delivery.type ? (
                        <p className="discription mt-1 mb-1">
                          {item.delivery.type}
                        </p>
                      ) : (
                        <p className="discription mt-1 mb-1">
                          نوع تحویل هنوز مشخص نشده
                        </p>
                      )}
                    </div>
                    {item.status === 1 && (
                      <div>
                        <button
                          onClick={() => handelOrderClick(item)}
                          className={style.seeOrderButton}
                          type="button"
                        >
                          مشاهده سفارش
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
              <div className={style.situationSatus}>
                <div
                  className={`${
                    style.situationMainDiv
                  }  d-flex flex-row align-items-center gap-2 ${getStatusClass(
                    item.status
                  )}`}
                >
                  <svg
                    width={6}
                    height={6}
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx={3} cy={3} r={3} className={style.dotText} />
                  </svg>
                  <span className="discription">
                    {getStatusText(item.status)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
          {newFinalData?.length === 0 && (
            <>
              <p>سفارشی ثبت نشده</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
