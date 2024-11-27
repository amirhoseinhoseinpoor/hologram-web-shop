import React, { useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";

import style from "../../../Styles/Profile/MakeOrderStyle/StepSixStyle.module.scss";

export default function StepSixComponent({
  handleNextStep,
  handlePreviousStep,
}) {
  const [value, setValue] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setIsButtonDisabled(value === "" || value === "آپلود فیش");
  }, [value]);

  useEffect(() => {
    if (value === "آپلود فیش" && selectedFile !== null) {
      setIsButtonDisabled(false);
    }
  }, [selectedFile, value]);

  const copyUrlToClipboard = async (number) => {
    try {
      const url = number;
      await navigator.clipboard.writeText(url);
      alert("کپی موفق امیز بود");
    } catch (err) {
      alert("کپی ناموفق بود" + err);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <section>
      <div
        className={`${style.makeTheResponsivePerfect} d-flex flex-row gap-3`}
      >
        <div
          className={`${style.SectionStyle} ${style.adjustTheRightWidht} mb-3 mt-2 `}
        >
          <p className="NormalTextSizing">
            شما میتوانید با یکی از روش های زیر تسویه حساب خود را انجام دهید.
          </p>
          <div>
            <FormControl>
              <FormLabel
                className={`${style.resetfontLabel}`}
                id="demo-controlled-radio-buttons-group"
              ></FormLabel>
              <RadioGroup
                className={style.FormGroupForRaidio}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  className={`${style.resetfontLabel} mt-2 mb-1`}
                  value="درگاه پرداخت"
                  control={<Radio />}
                  label="درگاه پرداخت"
                />
                <FormControlLabel
                  className={`${style.resetfontLabel} mt-1 mb-1`}
                  value="آپلود فیش"
                  control={<Radio />}
                  label="آپلود فیش"
                />
                {value === "آپلود فیش" && (
                  <>
                    <p className="discription me-2 mb-2">
                      لطفاً توجه فرمایید، بعد از پرداخت حداکثر تا 48 ساعت بعد
                      سفارش شما ثبت میشود و فیش شما باید توسط همکارها بررسی شود.
                    </p>
                    <div
                      className={`${style.backgroundForCheckAndPay} d-flex flex-column mt-1`}
                    >
                      <div className="d-flex flex-row justify-content-between NormalTextSizing">
                        <div>
                          <p
                            className={`${style.ShabaColorNumber} NormalTextSizing`}
                          >
                            شماره شبا:
                          </p>
                        </div>
                        <div className="d-flex flex-row align-items-center gap-2">
                          <Tooltip title="کپی شبا">
                            <span
                              onClick={() =>
                                copyUrlToClipboard("IR700170000000350872070007")
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
                          <span className="NormalTextSizing">
                            IR 700170000000350872070007
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-between NormalTextSizing mt-3">
                        <div>
                          <p
                            className={`${style.ShabaColorNumber} NormalTextSizing`}
                          >
                            شماره کارت:
                          </p>
                        </div>
                        <div className="d-flex flex-row align-items-center gap-2">
                          <Tooltip title="کپی شماره حساب">
                            <span
                              onClick={() =>
                                copyUrlToClipboard("6037997539713371")
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
                          <span className="NormalTextSizing">
                            6037997539713371
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="NormalTextSizing mt-2">
                      <p>بارگذاری فیش</p>
                      <div className="mt-3 mb-2">
                        <label
                          htmlFor="residopload"
                          className={`${style.LabelinputFile} NormalTextSizing w-100 text-center`}
                        >
                          <div>
                            <span>
                              <svg
                                width={21}
                                height={20}
                                viewBox="0 0 19 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.75 11.25C2.75 13.3713 2.75 14.432 3.40901 15.091C4.06802 15.75 5.12868 15.75 7.25 15.75H11.75C13.8713 15.75 14.932 15.75 15.591 15.091C16.25 14.432 16.25 13.3713 16.25 11.25"
                                  stroke="#404040"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.5 12V2.25M9.5 2.25L12.5 5.53125M9.5 2.25L6.5 5.53125"
                                  stroke="#404040"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span style={{ color: "#404040" }} className="me-2">
                              بارگذاری فایل .png یا .pdf
                            </span>
                            <p className="discription mt-1">
                              حداکثر تا 5 مگابایت
                            </p>
                          </div>
                        </label>
                        <input
                          onChange={handleFileChange}
                          id="residopload"
                          name="residopload"
                          type="file"
                          className={style.fileInputStyle}
                        />
                      </div>
                    </div>
                  </>
                )}
                <FormControlLabel
                  className={style.resetfontLabel}
                  value="چک"
                  control={<Radio />}
                  label="چک"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3 align-items-center">
            <div className="d-flex flex-row  gap-4 align-items-center">
              <button
                onClick={handleNextStep}
                className={style.continueButton}
                disabled={isButtonDisabled}
                style={{
                  backgroundColor: isButtonDisabled ? "#868686" : "#007bff",
                  cursor: isButtonDisabled ? "not-allowed" : "pointer",
                }}
              >
                پرداخت
              </button>
              <div className="d-flex flex-row">
                <span className="NormalTextSizing">40.000.000</span>
                <span className="NormalTextSizing"> ریال </span>
              </div>
            </div>
            <div>
              <button
                className={style.SeeLastStepButton}
                onClick={handlePreviousStep}
              >
                مرحله‌ی قبلی
              </button>
            </div>
          </div>
        </div>
        <div>
          {/* <Box
            onClick={() => handleOpen(FactorImage)}
            component="img"
            className={style.factorImageStyle}
            src={FactorImage?.imageUrl}
            alt="Factorimage"
          /> */}
        </div>
        {/* <div
          className={`${style.SectionStyle} ${style.adjustTheLeftWidht} mt-2`}
        >
          <p className={`${style.changingopacity} text-center VodeoDisSizing`}>
            فاکتور نهایی
          </p>
          <div className="d-flex flex-column mt-2">
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p>عنوان:</p>
              </div>
              <div>
                <span className="VodeoDisSizing">20.000.000.000</span>
                <span className="me-1 VodeoDisSizing">ریال</span>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p>عنوان:</p>
              </div>
              <div>
                <span className="VodeoDisSizing">20.000.000.000</span>
                <span className="me-1 VodeoDisSizing">ریال</span>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p>عنوان:</p>
              </div>
              <div>
                <span className="VodeoDisSizing">20.000.000.000</span>
                <span className="me-1 VodeoDisSizing">ریال</span>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p>عنوان:</p>
              </div>
              <div>
                <span className="VodeoDisSizing">20.000.000.000</span>
                <span className="me-1 VodeoDisSizing">ریال</span>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between mt-3">
              <div>
                <p>عنوان:</p>
              </div>
              <div>
                <span className="VodeoDisSizing">20.000.000.000</span>
                <span className="me-1 VodeoDisSizing">ریال</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-5 fs-2">
            <p>.لوگو</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
