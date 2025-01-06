import React, { useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Modal from "react-bootstrap/Modal";
import { Card, CardContent } from "@mui/material";
import style from "../../../Styles/Profile/MakeOrderStyle/StepFiveStyle.module.scss";
// import redux
import { useDispatch, useSelector } from "react-redux";
import { sendingAdressStep, increaseStep } from "@/app/Store/thunks";
import { phoneNumber } from "@/app/Store/slice";

export default function StepFiveComponent({
  handleNextStep,
  handlePreviousStep,
  disabelInputStep4,
  setDisabelInputStep4,
  code,
  step,
  data,
}) {
  const hasData = Object.keys(data).length > 0;

  const dispatch = useDispatch();

  const gettingPhoneNumber = useSelector(phoneNumber);

  const [value, setValue] = React.useState("تحویل حضوری از مرکز آذر هولوگرام");
  const [disableButton, setDisableButton] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    lastName: "",
    number: gettingPhoneNumber || "",
    companyName: "",
    postCode: "",
    city: "",
    town: "",
    addressText: "",
  });

  const [PostAdress, setPostAdress] = useState([]);

  const [PostAdress2, setPostAdress2] = useState([]);

  const [finalData, setFinalData] = useState([]);
  const [moveForward, setMoveForward] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (step > 4) {
      setMoveForward(true);
    }
  }, [step]);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editModal2, setEditModal2] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const [trackactiveAdress, setTrackActiveAdress] = useState(0);
  const [trackactiveAdress2, setTrackActiveAdress2] = useState(0);

  const handleModalClick = () => {
    if (!disabelInputStep4) {
      setShowModal(true);
    }
  };

  const handleModalClick2 = () => {
    if (!disabelInputStep4) {
      setShowModal2(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCloseModal2 = () => setShowModal2(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (!hasData) {
      if (value === "تحویل حضوری از مرکز آذر هولوگرام") {
        setDisableButton(false);
      } else if (PostAdress.length > 0 || PostAdress2.length > 0) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  }, [value, PostAdress, PostAdress2]);

  const handleAddAdress = async () => {
    // First, create the new address object
    const newAddress = {
      ...formState,
      type: "ارسال با پست",
    };
    if (PostAdress.length === 0) {
      setFinalData(newAddress);
    }
    setPostAdress((prevCards) => [...prevCards, newAddress]);
    setFormState({
      name: "",
      lastName: "",
      number: gettingPhoneNumber || "",
      companyName: "",
      postCode: "",
      city: "",
      town: "",
      addressText: "",
    });

    setShowModal(false);
  };

  const handleAddAdress2 = () => {
    const newAddress = {
      ...formState,
      type: "ارسال با باربری",
    };
    if (PostAdress2.length === 0) {
      setFinalData(newAddress);
    }
    setPostAdress2((prevCards) => [...prevCards, newAddress]);

    setFormState({
      name: "",
      lastName: "",
      number: gettingPhoneNumber || "",
      companyName: "",
      postCode: "",
      city: "",
      town: "",
      addressText: "",
    });
    setShowModal2(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(
        sendingAdressStep({ code: code, finalData: finalData })
      );

      if (response.payload.statusCode == 200) {
        const increseingStep = await dispatch(increaseStep({ code, step: 5 }));
        if (increseingStep.payload.message == "Success") {
          setDisabelInputStep4(true);
          handleNextStep();
        }
      }
    } catch (error) {
      alert("خطا در ارسال دیتا");
    }
  };

  const handleDisabelInput = () => {
    handleSubmit();
    // setDisabelInputStep4(true);
    // handleNextStep();
  };

  const handleDeleteAdress = (index) => {
    if (!disabelInputStep4) {
      setPostAdress(PostAdress.filter((_, i) => i !== index));
    }
  };

  const handleDeleteAdress2 = (index) => {
    if (!disabelInputStep4) {
      setPostAdress2(PostAdress2.filter((_, i) => i !== index));
    }
  };

  const handleEditAdress = (index) => {
    if (!disabelInputStep4) {
      setShowModal(true);
    }
    setEditModal(true);
    setEditIndex(index);
    const selectedAddress = PostAdress[index];
    const newFormState = {
      ...formState,
      name: selectedAddress?.name || "",
      lastName: selectedAddress?.lastName || "",
      number: selectedAddress?.number || "",
      companyName: selectedAddress?.companyName || "",
      postCode: selectedAddress?.postCode || "",
      city: selectedAddress?.city || "",
      town: selectedAddress?.town || "",
      addressText: selectedAddress?.addressText || "",
    };
    setFormState(newFormState);
  };

  const handleEditAdress2 = (index) => {
    if (!disabelInputStep4) {
      setShowModal2(true);
    }
    setEditModal2(true);
    setEditIndex(index);
    const selectedAddress = PostAdress2[index];
    const newFormState = {
      ...formState,
      name: selectedAddress?.name || "",
      lastName: selectedAddress?.lastName || "",
      number: selectedAddress?.number || "",
      companyName: selectedAddress?.companyName || "",
      postCode: selectedAddress?.postCode || "",
      city: selectedAddress?.city || "",
      town: selectedAddress?.town || "",
      addressText: selectedAddress?.addressText || "",
    };
    setFormState(newFormState);
  };

  const handleEditAdressSubmit = () => {
    if (editModal) {
      const newPostAdress = [...PostAdress];
      newPostAdress[editIndex] = formState;
      setPostAdress(newPostAdress);
    } else {
      setPostAdress((prevCards) => [...prevCards, formState]);
    }

    setFormState({});
    setShowModal(false);
    setEditModal(false);
  };

  const handleEditAdressSubmit2 = () => {
    if (editModal2) {
      const newPostAdress = [...PostAdress2];
      newPostAdress[editIndex] = formState;
      setPostAdress2(newPostAdress);
    } else {
      setPostAdress2((prevCards) => [...prevCards, formState]);
    }

    setFormState({});
    setShowModal2(false);
    setEditModal2(false);
  };

  const handleImageClick = (index) => {
    if (value === "ارسال با پست") {
      setFinalData(PostAdress[index]);
      setTrackActiveAdress(index);
    }
  };

  const handleImageClick2 = (index) => {
    if (value === "ارسال با باربری") {
      setFinalData(PostAdress2[index]);
      setTrackActiveAdress2(index);
    }
  };

  useEffect(() => {
    if (hasData) {
      setDisabelInputStep4(true);
      setDisableButton(true);
      setValue(data.type || "");
      if (data?.type == "ارسال با پست") {
        setPostAdress([data]);
      } else if (data?.type == "ارسال با باربری") {
        setPostAdress2([data]);
      }
    }
  }, [data, hasData]);

  useEffect(() => {
    if (value === "ارسال با پست") {
      setTrackActiveAdress2(null);
      setTrackActiveAdress(0);
      setFinalData(PostAdress[0]);
    } else if (value === "ارسال با باربری") {
      setTrackActiveAdress(null);
      setTrackActiveAdress2(0);
      setFinalData(PostAdress2[0]);
    } else if (value === "تحویل حضوری از مرکز آذر هولوگرام") {
      setTrackActiveAdress2(null);
      setTrackActiveAdress(null);
      setFinalData({ type: "تحویل حضوری از مرکز آذر هولوگرام" });
    }
  }, [value]);

  return (
    <>
      <div>
        <p className="NormalTextSizing mb-3">
          بعد از آماده سازی و تولید، دوست دارید بسته خود را چگونه تحویل بگیرید.{" "}
        </p>
        <FormControl
          disabled={disabelInputStep4}
          className={`w-100 ${style.customStyleMui}`}
        >
          <FormLabel
            className={style.resetfontLabel}
            id="demo-controlled-radio-buttons-group"
          ></FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              className={`${style.resetfontLabel} `}
              value="تحویل حضوری از مرکز آذر هولوگرام"
              control={<Radio />}
              label="تحویل حضوری از مرکز آذر هولوگرام"
            />

            {value === "تحویل حضوری از مرکز آذر هولوگرام" && (
              <div>
                <p className="discription me-4 mt-1 mb-1">
                  به آدرس: تهران، میدان فلسطین، خیابان فلسطین جنوبی، خیابان
                  بزرگمهر غربی، نبش کوچه حکمت، پلاک یک، طبقه ششم{" "}
                </p>
                <span>
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00033 13.168C9.23644 13.168 9.43435 13.0881 9.59408 12.9284C9.7538 12.7687 9.83366 12.5707 9.83366 12.3346C9.83366 12.0985 9.7538 11.9006 9.59408 11.7409C9.43435 11.5812 9.23644 11.5013 9.00033 11.5013C8.76421 11.5013 8.5663 11.5812 8.40658 11.7409C8.24685 11.9006 8.16699 12.0985 8.16699 12.3346C8.16699 12.5707 8.24685 12.7687 8.40658 12.9284C8.5663 13.0881 8.76421 13.168 9.00033 13.168ZM8.16699 9.83464H9.83366V4.83464H8.16699V9.83464ZM9.00033 17.3346C7.84755 17.3346 6.76421 17.1159 5.75033 16.6784C4.73644 16.2409 3.85449 15.6471 3.10449 14.8971C2.35449 14.1471 1.76074 13.2652 1.32324 12.2513C0.885742 11.2374 0.666992 10.1541 0.666992 9.0013C0.666992 7.84852 0.885742 6.76519 1.32324 5.7513C1.76074 4.73741 2.35449 3.85547 3.10449 3.10547C3.85449 2.35547 4.73644 1.76172 5.75033 1.32422C6.76421 0.886719 7.84755 0.667969 9.00033 0.667969C10.1531 0.667969 11.2364 0.886719 12.2503 1.32422C13.2642 1.76172 14.1462 2.35547 14.8962 3.10547C15.6462 3.85547 16.2399 4.73741 16.6774 5.7513C17.1149 6.76519 17.3337 7.84852 17.3337 9.0013C17.3337 10.1541 17.1149 11.2374 16.6774 12.2513C16.2399 13.2652 15.6462 14.1471 14.8962 14.8971C14.1462 15.6471 13.2642 16.2409 12.2503 16.6784C11.2364 17.1159 10.1531 17.3346 9.00033 17.3346Z"
                      fill="#FFC13D"
                    />
                  </svg>
                </span>
                <span className="discription me-2 mt-1 mb-1">
                  لطفاً توجه فرمایید، در صورت عدم حضور شخص ثبت‌کننده سفارش برای
                  تحویل حضوری، ارائه معرفی‌نامه الزامی است.
                </span>
              </div>
            )}

            <div className="d-flex flex-row justify-content-between align-items-center mt-2">
              <FormControlLabel
                className={`${style.resetfontLabel}`}
                value="ارسال با پست"
                control={<Radio />}
                label="ارسال با پست"
              />

              {PostAdress.length > 0 && (
                <div>
                  <button
                    onClick={handleModalClick}
                    className={style.butttonAddAdress}
                  >
                    <div className="d-flex flex-row gap-2">
                      <div>
                        <svg
                          width={13}
                          height={13}
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.125 6H7.875"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.5 7.375V4.625"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.30985 4.745C3.29485 0.415001 9.70986 0.420001 10.6899 4.75C11.2649 7.29 9.68486 9.44 8.29986 10.77C7.29486 11.74 5.70486 11.74 4.69486 10.77C3.31485 9.44 1.73485 7.285 2.30985 4.745Z"
                            stroke="#5695F6"
                          />
                        </svg>
                      </div>
                      <p className="NormalTextSizing">افزودن آدرس جدید </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {value === "ارسال با پست" && (
              <div>
                <p className="discription me-4 mt-1 mb-2">
                  پس از آماده شدن و تحویل به پست نهایت تا 48 ساعت بعد کد رهگیری
                  براتون پیامک میشود.
                </p>
              </div>
            )}

            {PostAdress.length === 0 ? (
              <div className="d-flex flex-column justify-content-center text-center">
                <div>
                  <svg
                    className={style.svgWidthHeightRe}
                    viewBox="0 0 65 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.5"
                      width={64}
                      height={64}
                      fill="url(#pattern0_1586_19501)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_1586_19501"
                        patternContentUnits="objectBoundingBox"
                        width={1}
                        height={1}
                      >
                        <use
                          xlinkHref="#image0_1586_19501"
                          transform="scale(0.00195312)"
                        />
                      </pattern>
                      <image
                        id="image0_1586_19501"
                        width={512}
                        height={512}
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                </div>
                <div>
                  <p className="discription mt-2">تاکنون آدرسی ثبت نکردین</p>
                </div>
                <div>
                  <button
                    onClick={handleModalClick}
                    className={style.butttonAddAdress}
                  >
                    <div className="d-flex flex-row gap-2">
                      <div>
                        <svg
                          width={13}
                          height={13}
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.125 6H7.875"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.5 7.375V4.625"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.30985 4.745C3.29485 0.415001 9.70986 0.420001 10.6899 4.75C11.2649 7.29 9.68486 9.44 8.29986 10.77C7.29486 11.74 5.70486 11.74 4.69486 10.77C3.31485 9.44 1.73485 7.285 2.30985 4.745Z"
                            stroke="#5695F6"
                          />
                        </svg>
                      </div>
                      <p className="NormalTextSizing">افزودن آدرس جدید </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={`${style.MakeProperForFlex}  mt-3`}>
                  {PostAdress.map((item, index) => (
                    <Card
                      key={index}
                      className={style.MainBOXCardStyle}
                      style={{
                        border:
                          trackactiveAdress === index && "1px solid #5695F6",
                      }}
                      onClick={() => handleImageClick(index)}
                    >
                      <CardContent className={`${style.reStyleCardContent}`}>
                        <div onClick={() => handleEditAdress(index)}>
                          <svg
                            width={19}
                            height={18}
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4445 2.70041L4.28702 9.21791C4.05452 9.46541 3.82952 9.95291 3.78452 10.2904L3.50702 12.7204C3.40952 13.5979 4.03952 14.1979 4.90952 14.0479L7.32452 13.6354C7.66202 13.5754 8.13452 13.3279 8.36702 13.0729L14.5245 6.55541C15.5895 5.43041 16.0695 4.14791 14.412 2.58041C12.762 1.02791 11.5095 1.57541 10.4445 2.70041Z"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.41797 3.78906C9.74047 5.85906 11.4205 7.44156 13.5055 7.65156"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.75 16.5H16.25"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div onClick={() => handleDeleteAdress(index)}>
                          <svg
                            width={19}
                            height={18}
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.25 4.48438C13.7525 4.23687 11.24 4.10938 8.735 4.10938C7.25 4.10938 5.765 4.18438 4.28 4.33438L2.75 4.48438"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.875 3.7275L7.04 2.745C7.16 2.0325 7.25 1.5 8.5175 1.5H10.4825C11.75 1.5 11.8475 2.0625 11.96 2.7525L12.125 3.7275"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.6373 6.85547L14.1498 14.408C14.0673 15.5855 13.9998 16.5005 11.9073 16.5005H7.0923C4.9998 16.5005 4.9323 15.5855 4.8498 14.408L4.3623 6.85547"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.24707 12.375H10.7446"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.625 9.375H11.375"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </CardContent>
                      <CardContent className={style.paddingLastChidMui}>
                        <div>
                          <span className="NormalTextSizing">
                            آدرس گیرنده :
                          </span>
                          <span className="NormalTextSizing">{item.name}</span>
                          <div>
                            <p className="NormalTextSizing mt-2">
                              {item.addressText}
                            </p>
                          </div>
                          <div className="d-flex flex-row justify-content-between mt-2 NormalTextSizing">
                            <div>
                              <span className="NormalTextSizing">
                                کد پستی:{" "}
                              </span>
                              <span className="NormalTextSizing">
                                {item.postCode}
                              </span>
                            </div>
                            <div>
                              <span className="NormalTextSizing">
                                شماره همراه:
                              </span>
                              <span className="NormalTextSizing">
                                {item.number}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            <div className="d-flex flex-row justify-content-between align-items-center mt-2">
              <FormControlLabel
                className={`${style.resetfontLabel} mt-2`}
                value="ارسال با باربری"
                control={<Radio />}
                label="ارسال با باربری"
              />
              {PostAdress2.length > 0 && (
                <div>
                  <button
                    onClick={handleModalClick2}
                    className={style.butttonAddAdress}
                  >
                    <div className="d-flex flex-row gap-2">
                      <div>
                        <svg
                          width={13}
                          height={13}
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.125 6H7.875"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.5 7.375V4.625"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.30985 4.745C3.29485 0.415001 9.70986 0.420001 10.6899 4.75C11.2649 7.29 9.68486 9.44 8.29986 10.77C7.29486 11.74 5.70486 11.74 4.69486 10.77C3.31485 9.44 1.73485 7.285 2.30985 4.745Z"
                            stroke="#5695F6"
                          />
                        </svg>
                      </div>
                      <p className="NormalTextSizing">افزودن آدرس جدید </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {PostAdress2.length === 0 ? (
              <div className="d-flex flex-column justify-content-center text-center">
                <div>
                  <svg
                    className={style.svgWidthHeightRe}
                    viewBox="0 0 65 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      x="0.5"
                      width={64}
                      height={64}
                      fill="url(#pattern0_1586_19501)"
                    />
                    <defs>
                      <pattern
                        id="pattern0_1586_19501"
                        patternContentUnits="objectBoundingBox"
                        width={1}
                        height={1}
                      >
                        <use
                          xlinkHref="#image0_1586_19501"
                          transform="scale(0.00195312)"
                        />
                      </pattern>
                      <image
                        id="image0_1586_19501"
                        width={512}
                        height={512}
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                </div>
                <div>
                  <p className="discription mt-2">تاکنون آدرسی ثبت نکردین</p>
                </div>
                <div>
                  <button
                    onClick={handleModalClick2}
                    className={style.butttonAddAdress}
                  >
                    <div className="d-flex flex-row gap-2">
                      <div>
                        <svg
                          width={13}
                          height={13}
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.125 6H7.875"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.5 7.375V4.625"
                            stroke="#5695F6"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.30985 4.745C3.29485 0.415001 9.70986 0.420001 10.6899 4.75C11.2649 7.29 9.68486 9.44 8.29986 10.77C7.29486 11.74 5.70486 11.74 4.69486 10.77C3.31485 9.44 1.73485 7.285 2.30985 4.745Z"
                            stroke="#5695F6"
                          />
                        </svg>
                      </div>
                      <p className="NormalTextSizing">افزودن آدرس جدید </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={`${style.MakeProperForFlex}  mt-3`}>
                  {PostAdress2.map((item, index) => (
                    <Card
                      key={index}
                      className={style.MainBOXCardStyle}
                      style={{
                        border:
                          trackactiveAdress2 === index && "1px solid #5695F6",
                      }}
                      onClick={() => handleImageClick2(index)}
                    >
                      <CardContent className={`${style.reStyleCardContent}`}>
                        <div onClick={() => handleEditAdress2(index)}>
                          <svg
                            width={19}
                            height={18}
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.4445 2.70041L4.28702 9.21791C4.05452 9.46541 3.82952 9.95291 3.78452 10.2904L3.50702 12.7204C3.40952 13.5979 4.03952 14.1979 4.90952 14.0479L7.32452 13.6354C7.66202 13.5754 8.13452 13.3279 8.36702 13.0729L14.5245 6.55541C15.5895 5.43041 16.0695 4.14791 14.412 2.58041C12.762 1.02791 11.5095 1.57541 10.4445 2.70041Z"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.41797 3.78906C9.74047 5.85906 11.4205 7.44156 13.5055 7.65156"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.75 16.5H16.25"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div onClick={() => handleDeleteAdress2(index)}>
                          <svg
                            width={19}
                            height={18}
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.25 4.48438C13.7525 4.23687 11.24 4.10938 8.735 4.10938C7.25 4.10938 5.765 4.18438 4.28 4.33438L2.75 4.48438"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.875 3.7275L7.04 2.745C7.16 2.0325 7.25 1.5 8.5175 1.5H10.4825C11.75 1.5 11.8475 2.0625 11.96 2.7525L12.125 3.7275"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.6373 6.85547L14.1498 14.408C14.0673 15.5855 13.9998 16.5005 11.9073 16.5005H7.0923C4.9998 16.5005 4.9323 15.5855 4.8498 14.408L4.3623 6.85547"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.24707 12.375H10.7446"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.625 9.375H11.375"
                              stroke="#333333"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </CardContent>
                      <CardContent className={style.paddingLastChidMui}>
                        <div>
                          <span className="NormalTextSizing">
                            آدرس گیرنده :
                          </span>
                          <span className="NormalTextSizing">{item.name}</span>
                          <div>
                            <p className="NormalTextSizing mt-2">
                              {item.addressText}
                            </p>
                          </div>
                          <div className="d-flex flex-row justify-content-between mt-2 NormalTextSizing">
                            <div>
                              <span className="NormalTextSizing">
                                کد پستی:{" "}
                              </span>
                              <span className="NormalTextSizing">
                                {item.postCode}
                              </span>
                            </div>
                            <div>
                              <span className="NormalTextSizing">
                                شماره همراه:
                              </span>
                              <span className="NormalTextSizing">
                                {item.number}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </RadioGroup>
        </FormControl>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between mt-3">
        <div className="d-flex flex-row gap-2 ">
          <button
            onClick={handleDisabelInput}
            className={`${style.continueButton}`}
            disabled={disableButton}
            style={{
              backgroundColor: disableButton && "#868686",
              cursor: disableButton ? "not-allowed" : "pointer",
            }}
          >
            تایید
          </button>
          <button
            className={style.SeeLastStepButton}
            onClick={handlePreviousStep}
          >
            مرحله‌ی قبلی
          </button>
        </div>
        <div>
          {moveForward && (
            <button
              type="button"
              onClick={handleNextStep}
              className={`${style.continueButton}`}
            >
             مرحله بعدی
            </button>
          )}
        </div>
      </div>

      {/* Bootstrap Modal for displaying image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className={style.ModalHeadStyle}>
          <Modal.Title className="sometext">افزودن آدرس جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBodyResetStyle}>
          <h4 className="VodeoDisSizing mb-2 mt-1">
            اطلاعات شخصی تحویل گیرنده
          </h4>

          <div className={`${style.resizingTheInputmodal} d-flex flex-row`}>
            <div className="w-50">
              <label htmlFor="name" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">نام</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50">
              <label htmlFor="lastName" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">نام خانوادگی</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-3">
              <label htmlFor="number" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">شماره همراه</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                dir="ltr"
                type="number"
                id="number"
                name="number"
                value={formState.number}
                className={`${style.inputTextCompanyName} discription`}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <h4 className="mt-3 mb-2 VodeoDisSizing">اطلاعات ارسال</h4>
          <div className={`${style.resizingTheInputmodal} d-flex flex-row`}>
            <div className="w-50">
              <label htmlFor="companyName" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">اسم شرکت</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-50">
              <label htmlFor="postCode" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">کد پستی</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                placeholder="کد پستی را وارد کنید"
                type="number"
                id="postCode"
                name="postCode"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.postCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-2">
              <label htmlFor="city" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">استان</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-2">
              <label htmlFor="town" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">شهر</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="town"
                name="town"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.town}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-2">
              <label htmlFor="addressText" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">آدرس پستی</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <textarea
                id="addressText"
                name="addressText"
                className={`${style.inputTextCompanyName} ${style.SetMaxHeightToTextArea} discription`}
                value={formState.addressText}
                onChange={handleInputChange}
                placeholder="اسم خیابان، اسم کوچه، اسم بن بست"
                rows="4" // Number of visible text lines
                cols="50" // Number of visible character columns
                required
              />
            </div>
          </div>
          <button
            className={style.SubmitModalAdress}
            onClick={editModal ? handleEditAdressSubmit : handleAddAdress}
            type="button"
          >
            تایید
          </button>
        </Modal.Body>
      </Modal>

      {/* Bootstrap Modal for displaying image */}
      <Modal show={showModal2} onHide={handleCloseModal2} centered>
        <Modal.Header closeButton className={style.ModalHeadStyle}>
          <Modal.Title className="sometext">افزودن آدرس جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBodyResetStyle}>
          <h4 className="VodeoDisSizing mb-2 mt-1">
            اطلاعات شخصی تحویل گیرنده
          </h4>

          <div className={`${style.resizingTheInputmodal} d-flex flex-row`}>
            <div className="w-50">
              <label htmlFor="name" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">نام</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50">
              <label htmlFor="lastName" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">نام خانوادگی</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-3">
              <label htmlFor="number" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">شماره همراه</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                dir="ltr"
                type="number"
                id="number"
                name="number"
                value={formState.number}
                className={`${style.inputTextCompanyName} discription`}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <h4 className="mt-3 mb-2 VodeoDisSizing">اطلاعات ارسال</h4>
          <div className={`${style.resizingTheInputmodal} d-flex flex-row`}>
            <div className="w-50">
              <label htmlFor="companyName" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">اسم شرکت</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-50">
              <label htmlFor="postCode" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">کد پستی</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                placeholder="کد پستی را وارد کنید"
                type="number"
                id="postCode"
                name="postCode"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.postCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-2">
              <label htmlFor="city" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">استان</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-2">
              <label htmlFor="town" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">شهر</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <input
                type="text"
                id="town"
                name="town"
                className={`${style.inputTextCompanyName} discription`}
                value={formState.town}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-50 mt-2">
              <label htmlFor="addressText" className="d-flex flex-row gap-1">
                <span className="NormalTextSizing">آدرس پستی</span>
                <span className={style.StarFixReq}>*</span>
              </label>
              <textarea
                id="addressText"
                name="addressText"
                className={`${style.inputTextCompanyName} ${style.SetMaxHeightToTextArea} discription`}
                value={formState.addressText}
                onChange={handleInputChange}
                placeholder="اسم خیابان، اسم کوچه، اسم بن بست"
                rows="4" // Number of visible text lines
                cols="50" // Number of visible character columns
                required
              />
            </div>
          </div>
          <button
            className={style.SubmitModalAdress}
            onClick={editModal2 ? handleEditAdressSubmit2 : handleAddAdress2}
            type="button"
          >
            تایید
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
