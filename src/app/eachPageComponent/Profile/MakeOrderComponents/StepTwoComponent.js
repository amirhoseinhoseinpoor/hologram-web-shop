"use client";

import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import style from "../../../Styles/Profile/MakeOrderStyle/StepTwoStyle.module.scss";

export default function StepTwoComponent({ handleNextStep }) {
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <p className="VodeoDisSizing">
        یه عنوان اینجاست که برای کاربر توضیح میده چرا باید مدارک رو اپلود کنند و
        یک سری توضیحات تکمیلی که در اینجا قرار میگیره
      </p>

      <div className="d-flex flex-row gap-5 mt-3">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row gap-2 align-items-center">
            <span className="NormalTextSizing">لوگو شرکت</span>
            <span className={style.StarFixReq}>*</span>
          </div>
          <div className="mt-2">
            <label className={style.labelInsteadOfInput} htmlFor="fileUpload">
              <div className="d-flex flex-column text-center">
                <div>
                  <svg
                    width={21}
                    height={21}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 11.25C2.25 13.3713 2.25 14.432 2.90901 15.091C3.56802 15.75 4.62868 15.75 6.75 15.75H11.25C13.3713 15.75 14.432 15.75 15.091 15.091C15.75 14.432 15.75 13.3713 15.75 11.25"
                      stroke="#404040"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12V2.25M9 2.25L12 5.53125M9 2.25L6 5.53125"
                      stroke="#404040"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className={`${style.colorTheInputFile} NormalTextSizing`}>
                  بارگذاری فایل .png یا .jpg
                </p>
                <p className={`${style.colorTheInputFile} discription`}>
                  حداکثر تا 5 مگابایت
                </p>
              </div>
            </label>
            <input
              className={style.displayNoneTheInput}
              id="fileUpload"
              type="file"
            />
          </div>
        </div>
        <div className="d-flex flex-column">
          <div>
            <label
              htmlFor="CompanyName"
              className="d-flex flex-row gap-2 align-items-center"
            >
              <span className="NormalTextSizing">اسم شرکت</span>
              <span className={style.StarFixReq}>*</span>
            </label>
          </div>
          <div className="mt-2">
            <input
              type="text"
              id="CompanyName"
              placeholder="اسم شرکت را بنویسید"
              className={`${style.inputTextCompanyName} discription`}
            />
          </div>
          {/* <div className="mt-4">
                  <label htmlFor="CompanyType" className="d-flex flex-row gap-2 align-items-center">
                    <span className="NormalTextSizing">نوع شرکت</span>
                    <span className={style.StarFixReq}>*</span>
                  </label>
                </div>
                <div className="mt-2">
                  <input name="CompanyType" type="radio" id="CompanyType"  className={`${style.inputTextCompanyName} discription`} />
                  <input name="CompanyType" type="radio" className={`${style.inputTextCompanyName} discription`} />
                </div> */}

          <FormControl>
            <FormLabel
              className={style.resetfontLabel}
              id="demo-controlled-radio-buttons-group"
            >
              <div className="d-flex flex-row gap-2 align-items-center mt-2">
                <span className="NormalTextSizing">نوع شرکت</span>
                <span className={style.StarFixReq}>*</span>
              </div>
            </FormLabel>
            <RadioGroup
              className={style.FormGroupForRaidio}
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                className={`${style.resetfontLabel} m-0`}
                value="دولتی"
                control={<Radio />}
                label="دولتی"
              />
              <FormControlLabel
                className={style.resetfontLabel}
                value="خصوصی"
                control={<Radio />}
                label="خصوصی"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="d-flex flex-row">
        <div></div>
      </div>

      {/* <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button> */}
      <button
        onClick={handleNextStep}
        className={`${style.continueButton} mt-3`}
      >
        ارسال مدارک
      </button>
    </>
  );
}
