import React, { useState, useEffect } from "react";
// import mui
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
// import redux
import { useDispatch } from "react-redux";
import { fetchPrivateImage } from "@/app/Store/thunks";
// improt base Modal
import ZoomModal from "@/app/BaseComponent/ZoomModal";
// import icons
import FolderZipIcon from "@mui/icons-material/FolderZip";
import DoneIcon from "@mui/icons-material/Done";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import base component
import { downloadImage } from "@/app/utils/downloadImage";

import style from "../../../Styles/Profile/MakeOrderStyle/StepSixStyle.module.scss";

export default function StepSixComponent({
  finalFactor,
  handleNextStep,
  handlePreviousStep,
  setNavStep,
}) {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [finalPaymentImage, setFinalPaymentImage] = useState(null);

  const [zoomModal, setZoomModal] = useState(false);

  const handleCloseZoomModal = () => setZoomModal(false);


  useEffect(() => {
    const fetchFinalPayment = async () => {
      const gettingFinalImageAPI = await dispatch(
        fetchPrivateImage({ filename: finalFactor?.finalPayment })
      ).unwrap();
      setFinalPaymentImage(gettingFinalImageAPI);
    };
    fetchFinalPayment();
  }, [dispatch, finalFactor]);

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

  const handleSubmit = () => {
    try {
      handleNextStep();
      setNavStep(5);
    } catch (error) {
      console.error(error || "errorFetching");
    }
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
          <div className="d-flex flex-row justify-content-between mt-3 align-items-start">
            <div className="d-flex flex-column  gap-2 align-items-start">
              <button
                onClick={handleSubmit}
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
            <div className="d-flex flex-column  h-100  gap-2">
              <button
                className={style.SeeLastStepButton}
                onClick={handlePreviousStep}
              >
                مرحله‌ی قبلی
              </button>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className={`${style.downloadFactor} d-flex fwlex-row gap-2`}
                  onClick={() => {
                    const link = document.createElement("a");

                    // Check if finalPaymentImage is a blob or a base64 URL
                    let filename = "finalPayment.png"; // Default filename
                    if (finalPaymentImage.includes("data:image/png")) {
                      filename = "finalPayment.png";
                    } else if (
                      finalPaymentImage.includes("data:image/svg+xml")
                    ) {
                      filename = "finalPayment.svg";
                    }

                    link.href = finalPaymentImage;
                    link.download = filename; // Set filename with correct extension
                    link.click(); // Trigger the download
                  }}
                >
                  <svg
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1997 7.41797C17.1997 7.6763 18.4247 9.21797 18.4247 12.593V12.7013C18.4247 16.4263 16.9331 17.918 13.2081 17.918H7.78307C4.05807 17.918 2.56641 16.4263 2.56641 12.7013V12.593C2.56641 9.24297 3.77474 7.7013 6.72474 7.4263"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 1.66797V12.4013"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.2913 10.543L10.4997 13.3346L7.70801 10.543"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  دانلود فاکتور
                </button>
              </div>
            </div>
          </div>
        </div>
       

          {(finalFactor && finalFactor?.finalPaymentType === "zip") ||
          finalFactor?.finalPaymentType === "rar" ? (
            <>
              <div
                className={`${style.emptyBoxDonlowadDocument} ${style.factorImageStyle} d-flex position-relative`}
                onClick={() => {
                  if (finalPaymentImage) {
                    const date = new Date();
                    downloadImage(
                      finalPaymentImage,
                      `${date.toISOString()}.${finalFactor?.finalPaymentType}`
                    );
                  }
                }}
              >
                <>
                  <FolderZipIcon />
                </>
              </div>
            </>
          ) : finalFactor && finalFactor?.finalPaymentType === "pdf" ? (
            <>
              <div
                className={`${style.emptyBoxDonlowadDocument} ${style.factorImageStyle} d-flex position-relative`}
                onClick={() => {
                  if (finalPaymentImage) {
                    const date = new Date();
                    downloadImage(
                      finalPaymentImage,
                      `${date.toISOString()}.${finalFactor?.finalPaymentType}`
                    );
                  }
                }}
              >
                <>
                  <PictureAsPdfIcon />
                </>
              </div>
            </>
          ) : (
            <div className="w-100 h-100">
              <Box
                onClick={() => setZoomModal(true)}
                component="img"
                className={style.factorImageStyle}
                sx={{ width: "100%", height: "100%", cursor: "pointer" }}
                src={finalPaymentImage}
                alt="Factorimage"
              />
            </div>
          )}

          {/* {finalPaymentImage && (
            <div className="w-100 h-100">
              <Box
                onClick={() => setZoomModal(true)}
                component="img"
                className={style.factorImageStyle}
                sx={{ width: "100%", height: "100%", cursor: "pointer" }}
                src={finalPaymentImage}
                alt="Factorimage"
              />
            </div>
          )} */}
        
      </div>
      {/* modals */}
      {finalPaymentImage && (
        <ZoomModal
          open={zoomModal}
          onClose={handleCloseZoomModal}
          src={finalPaymentImage}
          alt={"FactorImage"}
        />
      )}
    </section>
  );
}
