"use client";

import React, { useState, useEffect } from "react";
// redux import
import { useDispatch } from "react-redux";
import { uploadFile } from "@/app/Store/thunks";
import { deleteOrder } from "@/app/Store/thunks";
import { fetchPrivateImage } from "@/app/Store/thunks";

import Tooltip from "@mui/material/Tooltip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";
import { sendingSecondStep } from "@/app/Store/thunks";
import ErrorModal from "@/app/BaseComponent/ErrorModal";
import ConfirmModal from "@/app/BaseComponent/ConfirmingModal";
import ZoomModal from "@/app/BaseComponent/ZoomModal";
import AreYouShureModal from "@/app/BaseComponent/AreYouSureModal";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  p: 0,
};

import style from "../../../Styles/Profile/MakeOrderStyle/StepTwoStyle.module.scss";

export default function StepTwoComponent({
  dataFactor,
  data,
  code,
  setActiveTab,
  step,
  handleNextStep,
  handlePreviousStep,
  setDisabelInputStep2,
  disabelInputStep2,
}) {
  var hasData = Object.keys(data).length > 0;

  console.log(disabelInputStep2);

  const dispatch = useDispatch();

  const [value, setValue] = useState("خصوصی");
  const [paying, setPaying] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  console.log(uploadedFiles);

  const [logo, setLogo] = useState(null);
  const [FactorImage, setFactorImage] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [statusTraking, setStatusTraking] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [moveForward, setMoveForward] = useState(false);
  const [loadingDeleteOrder, setLoadingDeleteOrder] = useState(false);
  const [newDisableInput, setNewDisableInput] = useState(false);

  useEffect(() => {
    if (step > 2) {
      setMoveForward(true);
    }
  }, [step]);

  // modal
  const handleOpen = (fileObj) => {
    setZoomedImage(fileObj);
  };

  const handleClose = () => {
    setZoomedImage(null);
  };

  const [openmodal, setOpenmodal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const closeModal = () => setOpenmodal(false);
  const closeModal2 = () => setOpenModal2(false);
  const closeModal3 = () => setOpenModal3(false);
  const [disablenextStep, setDisableNextStep] = useState(true);
  const [messageToDeleteIndex, setMessageToDeleteIndex] = useState(null);

  const handleAreYouSureFunc = (code) => {
    setOpenmodal(true);
    setMessageToDeleteIndex(code);
  };

  useEffect(() => {
    setIsButtonDisabled(paying === "" || paying === "آپلود فیش");
  }, [paying]);

  useEffect(() => {
    if (paying === "آپلود فیش") {
      setIsButtonDisabled(false);
    }
  }, [paying]);

  useEffect(() => {
    if (data) {
      setValue(data.value);
      const fetchDocumentImages = async () => {
        if (data.preparedData && data.preparedData.length > 0) {
          const imageFetchPromises = data.preparedData.map(async (item) => {
            const fetchedImage = await dispatch(
              fetchPrivateImage({ filename: item.file })
            ).unwrap();
  
            return {
              imageUrl: fetchedImage,
              title: item.title || "",
              file: item.file, // Ensure 'file' holds the file ID
              isFixed: true,
            };
          });
  
          const fetchedDocuments = await Promise.all(imageFetchPromises);
  
          setUploadedFiles(fetchedDocuments);
        } else {
          setUploadedFiles([]);
        }
      };
      fetchDocumentImages();
  
      const fetchImage = async () => {
        if (data?.uploadLogo) {
          const gettingPrivatelogo = await dispatch(
            fetchPrivateImage({ filename: data?.uploadLogo })
          ).unwrap();
          setLogo({ imageUrl: gettingPrivatelogo || null });
        } else {
          setLogo(null);
        }
      };
      fetchImage();
  
      const fetchFactorImage = async () => {
        const gettingPrivateImageFactor = await dispatch(
          fetchPrivateImage({ filename: dataFactor.paymentImage })
        ).unwrap();
        setFactorImage({ imageUrl: gettingPrivateImageFactor || null });
      };
      fetchFactorImage();
  
      setCompanyName(data.companyName || "");
      if (hasData) {
        setStatusTraking(true);
        setDisabelInputStep2(true);
      } else {
        setDisabelInputStep2(false);
      }
    }
  }, [data]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleComanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handlePayingChange = (event) => {
    setPaying(event.target.value);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ["image/png", "image/jpeg"];

    const newFiles = files
      .filter((file) => validImageTypes.includes(file.type)) // Only accept PNG and JPG
      .map((file) => ({
        imageUrl: URL.createObjectURL(file),
        file: file, // New files have the File object
        title: "",
        isFixed: false, // New files are not fixed
      }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setLogo({
      imageUrl,
      file,
    });
  };

  const handleDeleteLogo = () => {
    setLogo(null);
  };

  const handleDeleteImage = (index) => {
    if (!uploadedFiles[index].isFixed) {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handleTitleChange = (index, event) => {
    const newTitle = event.target.value;
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index].title = newTitle;
      return updatedFiles;
    });
  };

  const handleDisabelInput = () => {
    // setDisabelInputStep2(true);
    handleSubmit();
    // handleNextStep();
  };

  function closeModalOnTimeout() {
    setTimeout(() => {
      setOpenModal2(false);
      setActiveTab("SeeOrder");
    }, 3000);
  }

  const handleDelete = async (code) => {
    try {
      setLoadingDeleteOrder(true);
      const fetchData = await dispatch(deleteOrder({ code })).unwrap();
      if (
        fetchData.firstData.statusCode == 200 &&
        fetchData.secondData.statusCode == 200
      ) {
        setOpenModal2(true);
        closeModalOnTimeout();
      }
    } catch (error) {
      setOpenModal3(true);
    } finally {
      setLoadingDeleteOrder(false);
    }
  };

  useEffect(() => {
    if (!hasData) {
      checkAllFieldsFilled();
    } else {
      checkAllFieldsFilled();
    }
  }, [companyName, logo, value, uploadedFiles]);

  const checkAllFieldsFilled = () => {
    const hasNewFiles = uploadedFiles.some((file) => !file.isFixed);
    const isFilled =
      companyName !== "" &&
      logo !== null &&
      uploadedFiles.length > 0 &&
      value !== "" &&
      hasNewFiles;
    setDisableNextStep(!isFilled);
  };

  const handleSubmit = async () => {
    setDisableNextStep(true);
    try {
      let uploadLogo;
      if (logo && logo.file) {
        // Upload new logo if a new file is selected
        uploadLogo = await dispatch(
          uploadFile({
            file: logo.file,
            tag: "لوگو کاربر",
            type: 1,
            isPublic: false,
          })
        ).unwrap();
      } else if (data?.uploadLogo) {
        // Use existing logo ID if no new logo is uploaded
        uploadLogo = data.uploadLogo;
      } else {
        // Handle case where no logo is present
        throw new Error("لوگو الزامی است.");
      }
  
      // Separate fixed and new files
      const fixedFiles = uploadedFiles.filter((file) => file.isFixed);
      const newFiles = uploadedFiles.filter((file) => !file.isFixed);
  
      // Upload new files
      const uploadDocumentimage = await Promise.all(
        newFiles.map(async (item) => {
          const fileId = await dispatch(
            uploadFile({
              file: item.file,
              tag: "مدارک کاربر",
              type: 1,
              isPublic: false,
            })
          ).unwrap();
  
          return {
            file: fileId,
            title: item.title,
          };
        })
      );
  
      // Prepare existing fixed files
      const existingPreparedData = fixedFiles.map((file) => ({
        file: file.file, // existing file ID
        title: file.title,
      }));
  
      // Combine existing and new files
      const preparedData = [...existingPreparedData, ...uploadDocumentimage];
  
      const sendingFinalData = {
        uploadLogo,
        paying,
        companyName,
        value,
        preparedData,
      };
  
      const finalDataDispatch = await dispatch(
        sendingSecondStep({ code, sendingFinalData })
      ).unwrap();
  
      if (finalDataDispatch.statusCode === 200) {
        // **Replace local file objects with server file IDs and mark as fixed**
        const updatedNewFiles = newFiles.map((file, idx) => ({
          ...file,
          file: uploadDocumentimage[idx].file, // Replace with server file ID
          isFixed: true,
        }));
  
        const allFiles = [...fixedFiles, ...updatedNewFiles];
        setUploadedFiles(allFiles);
        setDisabelInputStep2(true);
        setStatusTraking(true);
      }
    } catch (error) {
      console.error(error);
      setOpenModal3(true);
    }
  };

  return (
    <>
      <div className={`${style.resizeNewresponsive} d-flex flex-row gap-3`}>
        <div className={`${style.fixNewSizes} d-flex flex-column`}>
          <div className={style.stepContent}>
            {dataFactor && <p className="discription">{dataFactor.docInfo}</p>}

            <div
              className={`${style.makeTheFormResponsive} d-flex flex-row gap-5 mt-3`}
            >
              <div className="d-flex flex-column">
                <div className="d-flex flex-row gap-2 align-items-center">
                  <span className="NormalTextSizing">لوگو شرکت</span>
                  <span className={style.StarFixReq}>*</span>
                </div>
                <div className="mt-2">
                  {logo ? (
                    <div
                      className={`${style.onlyFitContentWidth} position-relative`}
                    >
                      <Box
                        onClick={() => handleOpen(logo)}
                        component="img"
                        src={logo.imageUrl}
                        alt="UserLogo"
                        className={style.LogoReplaceStyle}
                      />
                      {!disabelInputStep2 && (
                        <button
                          onClick={handleDeleteLogo}
                          className={style.deleteButton}
                        >
                          <svg
                            width={17}
                            height={17}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.5 2.98828C8.835 2.82328 7.16 2.73828 5.49 2.73828C4.5 2.73828 3.51 2.78828 2.52 2.88828L1.5 2.98828"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.25 2.485L4.36 1.83C4.44 1.355 4.5 1 5.345 1H6.655C7.5 1 7.565 1.375 7.64 1.835L7.75 2.485"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.4252 4.57031L9.1002 9.60531C9.0452 10.3903 9.0002 11.0003 7.6052 11.0003H4.3952C3.0002 11.0003 2.9552 10.3903 2.9002 9.60531L2.5752 4.57031"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.16504 8.25H6.83004"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.75 6.25H7.25"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <label
                        className={style.labelInsteadOfInput}
                        htmlFor="logoUpload"
                      >
                        <div className="d-flex flex-column text-center p-1">
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
                            className={`${style.colorTheInputFile} discription`}
                          >
                            بارگذاری فایل .png یا .jpg
                          </p>
                          <p
                            className={`${style.colorTheInputFile} discription`}
                          >
                            حداکثر تا 5 مگابایت
                          </p>
                        </div>
                      </label>
                      <input
                        className={style.displayNoneTheInput}
                        id="logoUpload"
                        accept={`${process.env.NEXT_PUBLIC_INPUT_IMAGE_FORMAT}`}
                        type="file"
                        onChange={handleLogoChange}
                        disabled={disabelInputStep2}
                      />
                    </>
                  )}
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
                    value={companyName}
                    placeholder="اسم شرکت را بنویسید"
                    onChange={handleComanyNameChange}
                    className={`${style.inputTextCompanyName} discription`}
                    disabled={disabelInputStep2}
                  />
                </div>

                <FormControl disabled={disabelInputStep2}>
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

            <div className="d-flex flex-column">
              <div className="d-flex flex-row gap-2 align-items-center">
                <span className="NormalTextSizing">آپلود مدارک</span>
                <span className={style.StarFixReq}>*</span>
              </div>
              <div className={`mt-2 ${style.gridOfDocument}`}>
                <div>
                  <label
                    className={style.labelInsteadOfInput}
                    style={{ cursor: "pointer" }}
                    htmlFor="fileUpload"
                  >
                    <div className="d-flex flex-column text-center p-1">
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
                      <p className={`${style.colorTheInputFile} discription`}>
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
                    accept={`${process.env.NEXT_PUBLIC_INPUT_IMAGE_FORMAT}`}
                    multiple
                    onChange={handleFileUpload}
                    // disabled={disabelInputStep2}
                  />
                </div>
                {uploadedFiles?.map((fileObj, index) => (
                  <div
                    key={index}
                    className={`${style.imagesContainerForDoucument}`}
                  >
                    <div className="position-relative">
                      <Box
                        onClick={() => handleOpen(fileObj)}
                        component="img"
                        src={fileObj.imageUrl}
                        alt={`uploaded ${index}`}
                        className={style.uploadedImage}
                      />

                      {!fileObj.isFixed && (
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className={style.deleteButton}
                        >
                          <svg
                            width={17}
                            height={17}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.5 2.98828C8.835 2.82328 7.16 2.73828 5.49 2.73828C4.5 2.73828 3.51 2.78828 2.52 2.88828L1.5 2.98828"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.25 2.485L4.36 1.83C4.44 1.355 4.5 1 5.345 1H6.655C7.5 1 7.565 1.375 7.64 1.835L7.75 2.485"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.4252 4.57031L9.1002 9.60531C9.0452 10.3903 9.0002 11.0003 7.6052 11.0003H4.3952C3.0002 11.0003 2.9552 10.3903 2.9002 9.60531L2.5752 4.57031"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.16504 8.25H6.83004"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.75 6.25H7.25"
                              stroke="#FF4F3F"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="عنوان مدرک را بنویسید"
                      value={fileObj.title}
                      onChange={(e) => handleTitleChange(index, e)}
                      className={`${style.imageTitleInputForDocument} discription`}
                      disabled={fileObj.isFixed && disabelInputStep2}
                    />
                  </div>
                ))}
              </div>
            </div>

            {!statusTraking ? (
              <h4 className="discription mt-3 mb-3">
                پس از ثبت درخواست مدارک شما برسی و توسط کارشناسان ما با شما تماس
                حاصل میشود
              </h4>
            ) : (
              <h4 className="discription mt-3 mb-3">
                مدارک شما با موفقیت ثبت شدند پس از برسی به مرحله طراحی خواهید
                رفت
              </h4>
            )}

            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row gap-2  mt-3">
                <button
                  onClick={handleDisabelInput}
                  disabled={disablenextStep}
                  style={{
                    cursor: disablenextStep ? "not-allowed" : "pointer",
                    backgroundColor: disablenextStep && "#868686",
                  }}
                  className={`${style.continueButton}`}
                >
                  ارسال مدارک
                </button>
                <button
                  className={style.SeeLastStepButton}
                  onClick={handlePreviousStep}
                >
                  مرحله‌ی قبلی
                </button>
              </div>

              {moveForward ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`${style.continueButton} mt-3`}
                >
                  طراحی سفارش
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAreYouSureFunc(code)}
                  className={`${style.cancelOrder} mt-3`}
                >
                  لغو سفارش
                </button>
              )}
            </div>
          </div>
          <div
            className={`${style.stepContent}  ${style.resizingWebInResponsive} mt-3`}
          >
            <p className="discription">
              در صورت نیاز و یا هرگونه مشکل می‌توانید با شماره‌ی زیر نیز
              مستقیماً در ارتباط باشید.
            </p>
            <div className="d-flex flex-row align-items-center gap-2 mt-1 mb-1">
              <span className={`${style.numberColorForcall} NormalTextSizing`}>
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
            <div className="mt-2 mb-2">
              <p className="NormalTextSizing">روش پرداخت</p>
            </div>
            <FormControl disabled={disabelInputStep2}>
              <FormLabel
                className={`${style.resetfontLabel}`}
                id="demo-controlled-radio-buttons-group"
              ></FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={paying}
                onChange={handlePayingChange}
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
                {paying === "آپلود فیش" && (
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
                        {/* <input
                        onChange={handleFileChange}
                        id="residopload"
                        name="residopload"
                        type="file"
                        className={style.fileInputStyle}
                      /> */}
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

            <div className="d-flex flex-row mt-3 gap-4 align-items-center">
              <button
                className={style.continueButtonpaying}
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
          </div>
        </div>

        <div>
          {dataFactor && (
            <Box
              onClick={() => handleOpen(FactorImage)}
              component="img"
              className={style.factorImageStyle}
              src={FactorImage?.imageUrl}
              alt="Factorimage"
            />
          )}
        </div>
        {/* modals */}
        {zoomedImage && (
          <ZoomModal
            open={!!zoomedImage}
            onClose={handleClose}
            src={zoomedImage.imageUrl}
            alt={zoomedImage.title || `uploaded image`}
          />
        )}
      </div>
      <ErrorModal
        open={openModal3}
        onClose={closeModal3}
        text={"خطا لطفا بعدا دوباره تلاش فرمایید"}
      />
      <ConfirmModal
        open={openModal2}
        onClose={closeModal2}
        text={"سفارش با موفقیت حذف شد"}
      />
      <AreYouShureModal
        open={openmodal}
        onClose={closeModal}
        text={`از لغو سفارش مطمئن هستید؟`}
        func={() => handleDelete(messageToDeleteIndex)}
        loading={loadingDeleteOrder}
      />
    </>
  );
}
