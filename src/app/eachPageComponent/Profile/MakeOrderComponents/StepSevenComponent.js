import React from "react";

import { useDispatch } from "react-redux";
import { setChildValue  } from "../../../Store/slice";

import { Tooltip } from "@mui/material";
import style from "../../../Styles/Profile/MakeOrderStyle/StepSevenStyle.module.scss";

export default function StepSevenComponent() {

  const dispatch = useDispatch();

  const handelNavigate = (value) => {
    dispatch(setChildValue(value));
  }


  const copyUrlToClipboard = async (number) => {
    try {
      const url = number;
      await navigator.clipboard.writeText(url);
      alert("کپی موفق امیز بود");
    } catch (err) {
      alert("کپی ناموفق بود" + err);
    }
  };

  return (
    <section className={style.stepContent}>
      <div className={style.InnerDiv}>
        <div className="d-flex flex-column">
          <div className="text-center">
            <svg
              width={64}
              height={64}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.9997 58.6654C46.6663 58.6654 58.6663 46.6654 58.6663 31.9987C58.6663 17.332 46.6663 5.33203 31.9997 5.33203C17.333 5.33203 5.33301 17.332 5.33301 31.9987C5.33301 46.6654 17.333 58.6654 31.9997 58.6654Z"
                fill="#71BC1C"
                stroke="#71BC1C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.667 31.9998L28.2137 39.5465L43.3337 24.4531"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="text-center mt-1 NormalTextSizing">
              <p className={`${style.changeTheColor} VodeoDisSizing`}>سفارشتون ثبت شد</p>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p className={style.changeTheColor}>نام کالا:</p>
              </div>
              <div>
                <p className="NormalTextSizing">اسم محصول پایه</p>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p className={style.changeTheColor}>تاریخ:</p>
              </div>
              <div>
                <p className="NormalTextSizing">23 اردیبهشت</p>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p className={style.changeTheColor}>ساعت:</p>
              </div>
              <div>
                <p className="NormalTextSizing">20:15</p>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p className={style.changeTheColor}>کد رهگیری:</p>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <Tooltip title="کپی کد رهگیری">
                  <span
                    className={`${style.CopySvgButton} d-flex`}
                    onClick={() =>
                      copyUrlToClipboard("15385025181722497417038")
                    }
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

                <span className={style.CopyTextRahgir}>
                  15385025181722497417038
                </span>
              </div>

            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p className={style.changeTheColor}>نوع تحویل:</p>
              </div>
              <div>
                <p className="NormalTextSizing">تحویل به پست</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="discription">شما میتوانید سفارش خود را در صفحه پیگیری سفارش مشاهده کنید و پس از آماده شدن و تحویل به پست نهایت تا 48 ساعت بعد کد رهگیری براتون پیامک میشود.</p>
            </div>
            <div className="d-flex justify-content-center">
              <button onClick={() => handelNavigate('seeOrder')} type="button" className={style.buttonNavigatePeigiri}>انتقال به صفحه پیگیری سفارش (12)</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
