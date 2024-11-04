import React, { useState, useEffect } from "react";
import data from "/public/json/seeOrder.json";
import { Card, CardMedia, CardContent } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import style from "/src/app/Styles/Profile/SeeOrderStyle/SeeOrder.module.scss";
import { formatPersianDate } from "@/app/utils/persionDateUtils";
// import redux
import { useDispatch, useSelector } from "react-redux";
import { getUserProduct } from "@/app/Store/thunks";
import { userOrdersData } from "@/app/Store/slice";

export default function seeOrder() {
  const dispatch = useDispatch();

  const checkData = useSelector(userOrdersData);
  console.log(checkData);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!checkData) {
          await dispatch(getUserProduct());
        }
      } catch (error) {
        console.error("Error during dispatch:", error);
      }
    };

    fetchData();
  }, [dispatch, checkData]);

  const copyUrlToClipboard = async (number) => {
    try {
      const url = number;
      await navigator.clipboard.writeText(url);
      alert("کپی موفق امیز بود");
    } catch (err) {
      alert("کپی ناموفق بود" + err);
    }
  };

  // Function to convert status number to text
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "معلق";
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

  return (
    <section>
      <div>
        <div className={style.EachDivStyle}>
          {checkData?.map((item, index) => (
            <Card
              key={index}
              className={style.MainBOXCardStyle}
              //   onClick={() => handleImageClick(item.src)}
            >
              <div
                className={`${style.MakeTheContentResponsive} d-flex flex-row`}
              >
                <div>
                  <CardMedia
                    component="img"
                    src={item.src}
                    alt={item.title}
                    sx={{
                      borderRadius: "4px",
                      maxHeight: "210px",
                      height: "100%",
                      width: "100%",
                      aspectRatio: "1.1",
                      padding: "10px",
                      borderRadius: "14px",
                    }}
                  />
                </div>
                <CardContent className={`${style.resetPaddingMui}`}>
                  <div dir="rtl">
                    <p className="seeOrderFont">{item?.prodName}</p>
                    {/* <p className="NormalTextSizing mt-2 mb-1">{item.effects}</p> */}
                    {/* <div className="d-flex flex-row gap-2">
                      <p
                        className={`${style.coloredTitle} discription mt-1 mb-1`}
                      >
                        تاریخ ثبت سفارش:
                      </p>
                      <p className="discription mt-1 mb-1">{item.typeOfPay}</p>
                    </div> */}
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
                      <Tooltip title="کپی شبا">
                        <span
                          onClick={() =>
                            copyUrlToClipboard("15385025181722497417038")
                          }
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
                      <p className="discription mt-1 mb-1">{item.howToGetIT}</p>
                    </div>
                  </div>
                </CardContent>
              </div>
              <div className={style.situationSatus}>
                <div
                  className={`${style.situationMainDiv} d-flex flex-row align-items-center gap-2`}
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
                  <span className="discription">{getStatusText(item.status)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
