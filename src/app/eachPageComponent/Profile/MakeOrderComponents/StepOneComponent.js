import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// import redux
import { useDispatch } from "react-redux";
import { sendFirstStep, ProductGetByCode } from "@/app/Store/thunks";

import style from "../../../Styles/Profile/MakeOrderStyle/StepOneStyle.module.scss";
import ErrorModal from "@/app/BaseComponent/ErrorModal";

export default function SteponeComponent({
  data,
  step,
  handleNextStep,
  setDisabelInput,
  disabelInput,
}) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const code = searchParams.get("code");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedShape, setSelectedShape] = useState("");
  const [serialtype, setSerialtype] = useState(false);
  const [disablenextStep, setDisableNextStep] = useState(true);
  const [statusTraking, setStatusTraking] = useState(false);
  const [moveForward, setMoveForward] = useState(false);
  const [prodFiled, setProdFiled] = useState([]);
  console.log(prodFiled);

  const [formData, setFormData] = useState({
    feature: "",
    color: "",
    stick: "",
    howItWork: "",
    chosenEffect: "",
    selectedSize: "",
    selectedShape: "",
    serialtype: false,
    useCase: "",
    serial: "",
    information: "",
    prodName: name || "",
    prodCode: code || "",
  });

  useEffect(() => {
    if (step > 1) {
      setMoveForward(true);
    }
  }, [step]);

  // modal state
  const [openModal3, setOpenModal3] = useState(false);
  // Close modal
  const closeModal3 = () => setOpenModal3(false);

  useEffect(() => {
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data,
      }));
      setSelectedSize(data.selectedSize || "");
      setSelectedShape(data.selectedShape || "");
      setSerialtype(data.serialtype || false);
      setDisabelInput(true);
      setStatusTraking(true);
    }
  }, [data, setDisabelInput]);

  const handleDisabelInput = () => {
    setDisabelInput(true);
    handleSubmit();
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setFormData((prev) => ({ ...prev, selectedSize: size }));
    checkAllFieldsFilled();
  };

  const handleShapeChange = (shape) => {
    setSelectedShape(shape);
    setFormData((prev) => ({ ...prev, selectedShape: shape }));
    checkAllFieldsFilled();
  };

  const handleRadioChange = (event) => {
    const value = event.target.value === "true";
    setSerialtype(value);
    setFormData((prev) => ({ ...prev, serialtype: value }));
    checkAllFieldsFilled();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    checkAllFieldsFilled();
  };

  const checkAllFieldsFilled = () => {
    const isFilled =
      formData.selectedSize !== "" &&
      formData.feature !== "" &&
      formData.color !== "" &&
      formData.stick !== "" &&
      formData.howItWork !== "" &&
      formData.chosenEffect !== "" &&
      formData.selectedShape !== "";

    setDisableNextStep(!isFilled);
  };

  const handleSubmit = async () => {
    setDisableNextStep(true);
    try {
      const updatedData = { request: { ...formData } };

      const resultAction = await dispatch(sendFirstStep(updatedData));

      if (sendFirstStep.fulfilled.match(resultAction)) {
        console.log("Success:", resultAction.payload);
        setStatusTraking(true);
      } else {
        console.error("Error:", resultAction.payload);
        alert(resultAction.payload);
      }
    } catch (error) {
      console.error("Error:", error);
      setOpenModal3(true);
    }
  };

  const fetchRef = useRef(false);

  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;

    const getCodeProduct = sessionStorage.getItem("PRODCODE");
    const PGetCodeProduct = getCodeProduct ? getCodeProduct.split(",") : [];

    if (PGetCodeProduct.length > 0) {
      PGetCodeProduct.forEach(async (item) => {
        console.log(item);

        try {
          const getApiResponse = await dispatch(
            ProductGetByCode(item)
          ).unwrap();

          if (getApiResponse?.filedOrder) {
            // Include the name with the filedOrder
            setProdFiled((prev) => [
              ...prev,
              {
                name: getApiResponse?.name || "Unknown Name",
                filedOrder: getApiResponse.filedOrder,
              },
            ]);
          }
        } catch (error) {
          console.error("Error fetching product by code:", error);
        }
      });
    }
  }, [dispatch]);

  return (
    <>
      {prodFiled && prodFiled?.length > 0 ? (
        <div>
          {prodFiled.map((inProd, index) => (
            <div key={index}>
              <p>{inProd?.name}</p>

              {inProd?.filedOrder?.map((item, index) => (
                <div key={index}>
                  {item?.type == "text" && (
                    <div className="d-flex flex-column">
                      <label
                        htmlFor={`text-${index}`}
                        className="mt-1 mb-1 discription d-flex flex-row gap-2 align-items-center"
                      >
                        <span>{item?.name}</span>
                        <span className={style.redStarStyle}>*</span>
                      </label>
                      <input
                        type="text"
                        className={`${style.formInputNumber} form-control discription`}
                        id={`text-${index}`}
                        name="feature"
                        value={formData.feature}
                        
                        onChange={handleInputChange}
                        disabled={disabelInput}
                        required
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={`${style.adjustPhoneSize} d-flex flex-row gap-4`}>
            <div className={`${style.adjustWidthRight} d-flex flex-column `}>
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <label
                    htmlFor="feature"
                    className="mt-1 mb-1 discription d-flex flex-row gap-2 align-items-center"
                  >
                    <span>تعداد یا تیراژ</span>
                    <span className={style.redStarStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`${style.formInputNumber} form-control discription`}
                    id="feature"
                    name="feature"
                    value={formData.feature}
                    placeholder="حداقل 2000"
                    onChange={handleInputChange}
                    disabled={disabelInput}
                    required
                  />
                </div>
                <h3 className="mb-3 mt-3 discription d-flex flex-row gap-2 align-items-center">
                  <span>سایز</span>
                  <span className={style.redStarStyle}>*</span>
                </h3>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["2:4", "2:5", "3:5", "3:11"].map((size) => (
                    <div
                      key={size}
                      className={style.SizezInput}
                      style={{
                        border:
                          selectedSize === size ? "1.5px solid #404756" : "",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={
                        disabelInput ? undefined : () => handleSizeChange(size)
                      }
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column">
                  <label
                    htmlFor="color"
                    className="mt-3 mb-1 discription d-flex flex-row gap-2 align-items-center"
                  >
                    <span>رنگ</span>
                    <span className={style.redStarStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`${style.formInputNumber} form-control discription`}
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    disabled={disabelInput}
                    required
                  />
                </div>
                <div className="d-flex flex-column">
                  <label
                    htmlFor="stick"
                    className="mt-2 mb-2 discription d-flex flex-row gap-2 align-items-center"
                  >
                    <span>قالب برچسب</span>
                    <span className={style.redStarStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`${style.formInputNumber} form-control discription`}
                    id="stick"
                    name="stick"
                    value={formData.stick}
                    onChange={handleInputChange}
                    disabled={disabelInput}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label
                    htmlFor="howItWork"
                    className="mt-2 mb-2 discription d-flex flex-row gap-2 align-items-center"
                  >
                    <span>نوع اثرگذاری</span>
                    <span className={style.redStarStyle}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`${style.formInputNumber} form-control discription`}
                    id="howItWork"
                    name="howItWork"
                    value={formData.howItWork}
                    onChange={handleInputChange}
                    disabled={disabelInput}
                  />
                </div>
              </div>
            </div>
            <div className={`${style.adjustWithLeft} d-flex flex-column`}>
              <div className="d-flex flex-column">
                <label
                  htmlFor="chosenEffect"
                  className="mt-1 mb-1 discription d-flex flex-row gap-2 align-items-center"
                >
                  <span>افکت مورد نظر</span>
                  <span className={style.redStarStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={`${style.formInputNumber} form-control discription`}
                  id="chosenEffect"
                  name="chosenEffect"
                  value={formData.chosenEffect}
                  disabled={disabelInput}
                  onChange={handleInputChange}
                />
              </div>

              <h3 className="mb-3 mt-3 discription d-flex flex-row gap-2 align-items-center">
                <span>شکل هولوگرام</span>
                <span className={style.redStarStyle}>*</span>
              </h3>
              <div className="d-flex flex-row gap-1">
                {[
                  {
                    label: "مربع",
                    value: "مربع",
                    className: style.SizezInputFirst,
                  },
                  {
                    label: "دایره",
                    value: "دایره",
                    className: style.SizezInputSecond,
                  },
                  {
                    label: "مستطیل",
                    value: "مستطیل",
                    className: style.SizezInputThird,
                  },
                  {
                    label: "بیضی",
                    value: "بیضی",
                    className: style.SizezInputForth,
                  },
                ].map((shape) => (
                  <div
                    key={shape.value}
                    className={shape.className}
                    style={{
                      border:
                        selectedShape === shape.value
                          ? "1.5px solid #404756"
                          : "",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={
                      disabelInput
                        ? undefined
                        : () => handleShapeChange(shape.value)
                    }
                  >
                    {shape.label}
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column">
                <label
                  htmlFor="useCase"
                  className="mt-3 mb-1 discription d-flex flex-row gap-2 align-items-center"
                >
                  <span>موارد مصرف</span>
                  <span className={style.redStarStyle}>*</span>
                </label>
                <input
                  type="text"
                  className={`${style.formInputNumber} form-control discription`}
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  disabled={disabelInput}
                  onChange={handleInputChange}
                />
                <p className={`${style.discriptionStyle} discription`}>
                  سطحی که قرار است روی ان چسبیده شود (پلاستیک . کاغذ)
                </p>
              </div>
              <div className="d-flex flex-row gap-1  mt-2 mb-2">
                <input
                  name="serial"
                  id="withOutSerial"
                  type="radio"
                  onChange={handleRadioChange}
                  value="false"
                  checked={serialtype === false}
                  disabled={disabelInput}
                />
                <label htmlFor="withOutSerial" className="ms-2">
                  بدون سریال
                </label>
                <input
                  name="serial"
                  id="withSerial"
                  type="radio"
                  onChange={handleRadioChange}
                  value="true"
                  checked={serialtype === true}
                  disabled={disabelInput}
                />
                <label htmlFor="withSerial">باسریال</label>
              </div>
              <div className="mt-1 mb-1">
                {serialtype && (
                  <div className="d-flex flex-column">
                    <label htmlFor="serial" className=" mb-1 discription">
                      نوع سریال
                    </label>
                    <input
                      type="text"
                      className={`${style.formInputNumber} form-control discription`}
                      id="serial"
                      name="serial"
                      value={formData.serial}
                      onChange={handleInputChange}
                      disabled={disabelInput}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex flex-column">
                <label
                  htmlFor="information"
                  className=" mb-1 discription d-flex flex-row gap-2 align-items-center"
                >
                  <span>توضیحات</span>
                  <span className={style.redStarStyle}>*</span>
                </label>
                <textarea
                  className={`${style.formInputNumber} form-control discription`}
                  id="information"
                  name="information"
                  value={formData.information}
                  style={{ maxHeight: "200px" }}
                  onChange={handleInputChange}
                  disabled={disabelInput}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {!statusTraking ? (
        <h4 className="VodeoDisSizing mt-3 mb-3">
          پس از ثبت درخواست شما برسی و توسط کارشناسان ما با شما تماس حاصل میشود
        </h4>
      ) : (
        <h4 className="VodeoDisSizing mt-3 mb-3">
          درخواست شما با موفقیت ثبت شد کارشناسان ما در اولین فرصت با شما تماس
          میگیرند
        </h4>
      )}

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
      <div className="d-flex flex-row gap-3 align-items-center">
        <button
          type="button"
          onClick={handleDisabelInput}
          disabled={disablenextStep}
          style={{
            cursor: disablenextStep ? "not-allowed" : "pointer",
            backgroundColor: disablenextStep ? "#868686" : undefined,
          }}
          className={`${style.continueButton} mt-3 mb-2`}
        >
          استعلام
        </button>
        {moveForward && (
          <button
            type="button"
            onClick={handleNextStep}
            className={`${style.continueButton} mt-3 mb-2`}
          >
            مرحله بعدی
          </button>
        )}
      </div>

      {/* modals */}
      <ErrorModal
        open={openModal3}
        onClose={closeModal3}
        text={"مشکلی به وجود آمده است، لطفا بعدا تلاش کنید."}
      />
    </>
  );
}
