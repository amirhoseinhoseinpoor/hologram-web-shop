import { useDispatch, useSelector } from "react-redux";
import { firstName, lastName, code, phoneNumber } from "@/app/Store/slice";

import style from "/src/app/Styles/Profile/UserInfoStyle/userInfo.module.scss";

export default function UserInfo() {
  const firstNameU = useSelector(firstName);
  const lastNameU = useSelector(lastName);
  const codeU = useSelector(code);
  const phoneNumberU = useSelector(phoneNumber);

  return (
    <section className={style.mainSection}>
      <form>
        <p className="NormalTextSizing mb-1 mt-3">لوگو شرکت</p>
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
        </div>
        <div
          className={`${style.mainDivMakeResponsive} d-flex flex-row mt-3 gap-5`}
        >
          <div className={`${style.forManagingSize} d-flex flex-column`}>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="CompanyName" className={`mb-1 me-1`}>
                <span className="discription">نام شرکت</span>
                <span className={`${style.redStar} discription`}> *</span>
              </label>
              <input
                type="text"
                id="CompanyName"
                className={`${style.inputStyleMain} discription`}
                placeholder="اسم شرکت را وارد کنید"
                required
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="CompanyNumber" className={`mb-1 me-1`}>
                <span className="discription">شماره ثابت شرکت</span>
              </label>
              <input
                dir="ltr"
                type="number"
                id="CompanyNumber"
                className={`${style.inputStyleMain} ${style.inputNimberSpecific} discription`}
                placeholder="021234567"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="password" className={`mb-1 me-1`}>
                <span className="discription">رمز</span>
                <span className={`${style.redStar} discription`}> *</span>
              </label>
              <input
                type="password"
                id="password"
                className={`${style.inputStyleMain} discription`}
                placeholder="********"
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
                className={`${style.inputStyleMain} ${style.inputNimberSpecific} discription`}
                placeholder={phoneNumberU}
                required
                disabled
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <label htmlFor="userNameAndFamily" className={`mb-1 me-1`}>
                <span className="discription">نام و نام خانوادگی</span>
              </label>
              <input
                type="text"
                id="userNameAndFamily"
                className={`${style.inputStyleMain}  discription`}
                placeholder={`${firstNameU} ${" "} ${lastNameU}`}
                disabled
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
    </section>
  );
}
