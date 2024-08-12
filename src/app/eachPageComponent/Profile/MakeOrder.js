"use client";

import React, { useState } from "react";
import style from "../../Styles/Profile/MakeOrder.module.scss";
import ProcessTracker from "./ProcessTracker";
import { Card, CardMedia, CardContent } from "@mui/material";
import data from "/public/json/ProfileFirstStepEffect.json";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function MakeOrder() {
  const [step, setStep] = useState(1);
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Function to go to the next step
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Function to render the content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={style.stepContent}>
            <div className="d-flex flex-column">
              <h4 className="VodeoDisSizing">
                برای محصول انتخابی شما این افکت ها مناسب هستند. میتوانید از بین
                آنها افکت های مد نظر خود را انتخاب کنید. همچنین اگر نیاز به
                پشتیبانی داشتید میتوانید از چت آنلایت و یا شماره تماس زیر تماس
                بگیرید.
              </h4>
              <div className="d-flex flex-row align-items-center gap-2 mt-1 mb-1">
                <span
                  className={`${style.numberColorForcall} NormalTextSizing`}
                >
                  ۰۲۱-۶۶۹۷۱۴۰۲-۵
                </span>
                <span>
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4775 13.7475C16.4775 14.0175 16.4175 14.295 16.29 14.565C16.1625 14.835 15.9975 15.09 15.78 15.33C15.4125 15.735 15.0075 16.0275 14.55 16.215C14.1 16.4025 13.6125 16.5 13.0875 16.5C12.3225 16.5 11.505 16.32 10.6425 15.9525C9.78 15.585 8.9175 15.09 8.0625 14.4675C7.2 13.8375 6.3825 13.14 5.6025 12.3675C4.83 11.5875 4.1325 10.77 3.51 9.915C2.895 9.06 2.4 8.205 2.04 7.3575C1.68 6.5025 1.5 5.685 1.5 4.905C1.5 4.395 1.59 3.9075 1.77 3.4575C1.95 3 2.235 2.58 2.6325 2.205C3.1125 1.7325 3.6375 1.5 4.1925 1.5C4.4025 1.5 4.6125 1.545 4.8 1.635C4.995 1.725 5.1675 1.86 5.3025 2.055L7.0425 4.5075C7.1775 4.695 7.275 4.8675 7.3425 5.0325C7.41 5.19 7.4475 5.3475 7.4475 5.49C7.4475 5.67 7.395 5.85 7.29 6.0225C7.1925 6.195 7.05 6.375 6.87 6.555L6.3 7.1475C6.2175 7.23 6.18 7.3275 6.18 7.4475C6.18 7.5075 6.1875 7.56 6.2025 7.62C6.225 7.68 6.2475 7.725 6.2625 7.77C6.3975 8.0175 6.63 8.34 6.96 8.73C7.2975 9.12 7.6575 9.5175 8.0475 9.915C8.4525 10.3125 8.8425 10.68 9.24 11.0175C9.63 11.3475 9.9525 11.5725 10.2075 11.7075C10.245 11.7225 10.29 11.745 10.3425 11.7675C10.4025 11.79 10.4625 11.7975 10.53 11.7975C10.6575 11.7975 10.755 11.7525 10.8375 11.67L11.4075 11.1075C11.595 10.92 11.775 10.7775 11.9475 10.6875C12.12 10.5825 12.2925 10.53 12.48 10.53C12.6225 10.53 12.7725 10.56 12.9375 10.6275C13.1025 10.695 13.275 10.7925 13.4625 10.92L15.945 12.6825C16.14 12.8175 16.275 12.975 16.3575 13.1625C16.4325 13.35 16.4775 13.5375 16.4775 13.7475Z"
                      stroke="#F3802C"
                      strokeWidth="1.5"
                      strokeMiterlimit={10}
                    />
                  </svg>
                </span>
              </div>
              <div className={style.effectMainDivStyle}>
                {data.map((item, index) => (
                  <Card
                    key={index}
                    className={style.MainBOXCardStyle}
                    // onClick={() => handleImageClick(item.src)}
                  >
                    <div className="d-flex flex-column gap-2">
                      <CardContent className={`${style.resetPaddingMui}`}>
                        <div
                          className={`${style.widthFitForTheInput} control-group`}
                        >
                          <label
                            className={`${style.control} ${style.controlCheckbox}`}
                          >
                            <input type="checkbox" />
                            <div className={style.controlindicator} />
                          </label>
                        </div>
                      </CardContent>
                      <div>
                        <CardMedia
                          component="img"
                          src={item.src}
                          alt={item.title}
                          sx={{
                            borderRadius: "4px",
                            height: "100%",
                            padding: "0 7px",
                          }}
                        />
                      </div>
                      <CardContent
                        className={`${style.resetPaddingMuiBelowContent}`}
                      >
                        <div dir="rtl" className={`${style.titleStyle}`}>
                          <p className="NormalTextSizing">{item.title}</p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className={`${style.continueButton} mt-3 mb-2`}
            >
              ثبت و ادامه
            </button>
          </div>
        );
      case 2:
        return (
          <div className={style.stepContent}>
            <p className="VodeoDisSizing">
              یه عنوان اینجاست که برای کاربر توضیح میده چرا باید مدارک رو اپلود
              کنند و یک سری توضیحات تکمیلی که در اینجا قرار میگیره
            </p>

            <div className="d-flex flex-row gap-5 mt-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row gap-2 align-items-center">
                  <span className="NormalTextSizing">لوگو شرکت</span>
                  <span className={style.StarFixReq}>*</span>
                </div>
                <div className="mt-2">
                  <label
                    className={style.labelInsteadOfInput}
                    htmlFor="fileUpload"
                  >
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
                      <p
                        className={`${style.colorTheInputFile} NormalTextSizing`}
                      >
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
              <div>
                
              </div>

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
          </div>
        );
      case 3:
        return (
          <div className={style.stepContent}>
            <h2>Step 3: Review Order</h2>
            {/* Your order review component goes here */}
            <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button>
            <button onClick={handleNextStep} className={style.continueButton}>
              ارسال مدارک
            </button>
          </div>
        );
      case 4:
        return (
          <div className={style.stepContent}>
            <h2>Step 4: Confirm and Pay</h2>
            {/* Your payment form or confirmation screen goes here */}
            <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button>
            <button onClick={handleNextStep} className={style.continueButton}>
              Continue
            </button>
          </div>
        );
      case 5:
        return (
          <div className={style.stepContent}>
            <h2>Step 4: Confirm and Pay</h2>
            {/* Your payment form or confirmation screen goes here */}
            <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button>
            <button onClick={handleNextStep} className={style.continueButton}>
              Continue
            </button>
          </div>
        );
      case 6:
        return (
          <div className={style.stepContent}>
            <h2>Step 4: Confirm and Pay</h2>
            {/* Your payment form or confirmation screen goes here */}
            <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button>
            <button onClick={handleNextStep} className={style.continueButton}>
              Continue
            </button>
          </div>
        );
      case 7:
        return (
          <div className={style.stepContent}>
            <h2>Step 4: Confirm and Pay</h2>
            {/* Your payment form or confirmation screen goes here */}
            <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <section>
      <ProcessTracker currentStep={step} />
      {renderStepContent()}
    </section>
  );
}
