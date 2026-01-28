import React, { useState, useEffect } from "react";
// import redux
import { useDispatch, useSelector } from "react-redux";
import {
  firstName,
  lastName,
  code,
  phoneNumber,
  email,
  gender,
} from "@/app/Store/slice";
import { editUser } from "@/app/Store/thunks";
import { setUserData } from "@/app/Store/slice";
// import base component
import ConfirmingModal from "@/app/BaseComponent/ConfirmingModal";
import ErrorModal from "@/app/BaseComponent/ErrorModal";

import style from "/src/app/Styles/Profile/UserInfoStyle/userInfo.module.scss";

export default function UserInfo() {
  const dispatch = useDispatch();

  const firstNameU = useSelector(firstName);
  const lastNameU = useSelector(lastName);
  const codeU = useSelector(code);
  const emailU = useSelector(email);
  const phoneNumberU = useSelector(phoneNumber);
  const genderU = useSelector(gender);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
  });  

  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmModal2, setConfirmModal2] = useState(false);

  const handleCloseModal = () => setConfirmModal(false);
  const handleCloseModal2 = () => setConfirmModal2(false);

  function closeModalOnTimeout() {
    setTimeout(() => {
      setConfirmModal(false);
    }, 2000);
  }

  useEffect(() => {
    setFormData({
      email: emailU,
      firstName: firstNameU,
      lastName: lastNameU,
      gender: genderU,
    });
  }, [emailU, phoneNumberU, firstNameU, lastNameU, genderU]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangingData = async (e) => {
    e.preventDefault();
    try {
      const sendDataToApi = await dispatch(
        editUser({ code: codeU, ...formData })
      ).unwrap();
      if (sendDataToApi.statusCode == 200) {
        setConfirmModal(true);
        closeModalOnTimeout();

        dispatch(setUserData(formData));
      }
    } catch (error) {
      setConfirmModal2(true);
      console.error("Error updating user info:", error);
    }
  };

  return (
    <section className={style.mainSection}>
      <form onSubmit={handleChangingData}>
        {/* <p className="NormalTextSizing mb-1 mt-3">لوگو شرکت</p>
        <div>
          <label htmlFor="LogoComapnyInput" className={style.LabelComapntInput}>
            <div className="d-flex flex-column text-center">
              <div>
                <svg
                  width={19}
                  height={19}
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
              <p className={`${style.colorForTheInput} NormalTextSizing mt-2`}>
                بارگذاری فایل .png یا .jpg
              </p>
              <p className={`${style.colorForTheInput} discription mt-1`}>
                حداکثر تا 5 مگابایت
              </p>
            </div>
          </label>
          <input type="file" className="d-none" id="LogoComapnyInput" />
        </div> */}
        <div
          className={`${style.mainDivMakeResponsive} d-flex flex-row mt-3 gap-5`}
        >
          <div className={`${style.forManagingSize} d-flex flex-column`}>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="email" className={`mb-1 me-1`}>
                <span className="discription">ایمیل</span>
                {/* <span className={`${style.redStar} discription`}> *</span> */}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                value={formData.email || ""}
                className={`${style.inputStyleMain} discription`}
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="gender" className={`mb-1 me-1`}>
                <span className="discription">جنسیت</span>
              </label>
              {/* <input
                dir="ltr"
                type="number"
                id="gender"
                className={`${style.inputStyleMain} ${style.inputNimberSpecific} discription`}
                placeholder="021234567"
              /> */}
              <select
                id="gender"
                value={formData.gender || ""}
                name="gender"
                onChange={handleInputChange}
                className="form-select mb-2 discription"
                style={{ boxShadow: "unset" }}
              >
                <option value="u">انتخواب کنید</option>
                <option value="f">زن</option>
                <option value="m">مرد</option>
              </select>
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="firstName" className={`mb-1 me-1`}>
                <span className="discription">نام</span>
                <span className={`${style.redStar} discription`}> *</span>
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleInputChange}
                value={formData.firstName || ""}
                id="firstName"
                className={`${style.inputStyleMain} discription`}
                placeholder="نام"
                required
              />
            </div>
          </div>
          <div className={`${style.forManagingSize} d-flex flex-column`}>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="PhoneNumber" className={`mb-1 me-1`}>
                <span className="discription">شماره همراه</span>
              </label>
              <input
                dir="ltr"
                type="number"
                id="PhoneNumber"
                name="PhoneNumber"
                value={phoneNumberU || ""}
                className={`${style.inputStyleMain} ${style.inputNimberSpecific} discription`}
                required
                disabled
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="lastName" className={`mb-1 me-1`}>
                <span className="discription">نام خانوادگی</span>
                <span className={`${style.redStar} discription`}> *</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleInputChange}
                value={formData.lastName || ""}
                className={`${style.inputStyleMain}  discription`}
                placeholder="نام خانوادگی خود را وارد کنید"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <button className={style.submitButtonStyle} type="submit">
            ثبت تغییرات
          </button>
        </div>
      </form>
      {/* modals */}
      <ConfirmingModal
        open={confirmModal}
        onClose={handleCloseModal}
        text={`ویرایش اطلاعات با موفقیت انجام یافت`}
      />
      <ErrorModal
        open={confirmModal2}
        onClose={handleCloseModal2}
        text={"خطا در انجام عملیات"}
      />
    </section>
  );
}
