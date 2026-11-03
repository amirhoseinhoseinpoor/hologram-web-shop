"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, registerWithOtp } from "../Store/thunks";
import { PHONE_NUMBER_REGEX, getLastPage } from "../utils/authForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "../layouts/AuthLayout";
import OTPInput from "../eachPageComponent/Login/OTPComponent";
import style from "../Styles/SignUp/SignUpStyle.module.scss";

export default function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();

  // use effect for register
  const [firstName, setPersonName] = useState("");
  const [lastName, setPersonLastName] = useState("");
  const [username, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loadinStatus, setLodaingStatus] = useState(false);

  // end rgister

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const hasError = Boolean(errorMessage);

  const nameInputRef = useRef(null);

  const passwordRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (username.length == 11) {
      passwordRef.current.focus();
    }
  }, [username]);

  useEffect(() => {
    if (username.length == 11 && password.length >= 4) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  // Send OTP to the user's phone

  const handleLogin = async (event) => {
    event.preventDefault();
    setLodaingStatus(true);
    setErrorMessage(null);
    try {
      if (!PHONE_NUMBER_REGEX.test(username)) {
        setErrorMessage("فرمت شماره همراه اشتباه است");
        setLodaingStatus(false);
      } else {
        const resultAction = await dispatch(
          sendOtp({
            username,
            type: "register",
          }),
        );

        if (sendOtp.fulfilled.match(resultAction)) {
          setIsOtpSent(true);
        } else {
          setErrorMessage(resultAction.payload);
          setLodaingStatus(false);
        }
      }
    } catch (error) {
      console.error("signUp/page.js", error);
      setLodaingStatus(false);
    }
  };



  const handleVerifyOtp = async (otp) => {
    setErrorMessage(null);
    setLodaingStatus(true);

    try {
      const resultAction = await dispatch(
        registerWithOtp({
          firstName,
          lastName,
          username,
          password,
          roleIds: [1],
          otp,
        }),
      );

      if (registerWithOtp.fulfilled.match(resultAction)) {
        router.push(getLastPage());
      } else {
        setErrorMessage(resultAction.payload);
      }
    } catch {
      setErrorMessage("کد تایید نامعتبر است");
    }

    setLodaingStatus(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setErrorMessage(null);

    const resultAction = await dispatch(
      sendOtp({
        username,
        type: "register",
      }),
    );

    if (sendOtp.fulfilled.match(resultAction)) {
    setErrorMessage(null);
    setIsOtpSent(true);
}

    if (sendOtp.rejected.match(resultAction)) {
      setErrorMessage(resultAction.payload);
    }
  };

  function NavigateLastPage() {
    router.push(getLastPage());
  }

  return (
    <AuthLayout>
      <section className={`${style.sectionSignUpStyle} d-flex w-100`}>
        <div className={`${style.outerLoginPage} container pt-3 pb-3`}>
          <div className={`${style.LoginMainDiv} position-relative`}>
            <div onClick={NavigateLastPage} className={style.closeIconImg}>
              <svg
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22.4756C17.5 22.4756 22 17.9756 22 12.4756C22 6.97559 17.5 2.47559 12 2.47559C6.5 2.47559 2 6.97559 2 12.4756C2 17.9756 6.5 22.4756 12 22.4756Z"
                  stroke="var(--text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.16992 15.3055L14.8299 9.64551"
                  stroke="var(--text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8299 15.3055L9.16992 9.64551"
                  stroke="var(--text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {!isOtpSent ? (
              <form
                onSubmit={handleLogin}
                className="form-border p-2 bg-white rounded container"
              >
                <div className="d-flex flex-row justify-content-center mt-3 mb-4">
                  <div></div>
                </div>
                <p className="mb-3 me-2 mt-3 discription">ثبت نام</p>

                {errorMessage && (
                  <div className={style.handelLoginError}>{errorMessage}</div>
                )}

                <div className="d-flex flex-column  mb-3">
                  <label htmlFor="firstName" className="mb-2 me-2 discription">
                    نام
                  </label>
                  <input
                    type="text"
                    className={`${style.formInputNumber} form-control`}
                    style={{ border: hasError ? "1.2px solid var(--danger)" : "" }}
                    id="firstName"
                    value={firstName}
                    ref={nameInputRef}
                    onChange={(e) => setPersonName(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column  mb-3">
                  <label htmlFor="lastName" className="mb-2 me-2 discription">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    className={`${style.formInputNumber} form-control`}
                    style={{ border: hasError ? "1.2px solid var(--danger)" : "" }}
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setPersonLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column  mb-3">
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 me-2 discription"
                  >
                    شماره همراه
                  </label>
                  <input
                    type="number"
                    className={`${style.formInputNumber} form-control`}
                    style={{ border: hasError ? "1.2px solid var(--danger)" : "" }}
                    id="phoneNumber"
                    value={username}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column  mb-4">
                  <label htmlFor="password" className="mb-2 me-2 discription">
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    className={`${style.formInputNumber} form-control`}
                    style={{ border: hasError ? "1.2px solid var(--danger)" : "" }}
                    id="password"
                    value={password}
                    ref={passwordRef}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[0-9]*$/.test(value)) {
                        setPassword(value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                </div>


                <button
                  type="submit"
                  className={`${style.submitButton} ${
                    isButtonDisabled ? style.disabledButton : style.activeButton
                  } w-100 mt-1`}
                  disabled={isButtonDisabled || loadinStatus}
                >
                  <div
                    className={`${style.justPaddingButton} d-flex flex-row align-items-center justify-content-center`}
                  >
                    {!loadinStatus ? (
                      <>
                        <p className="ms-2 VodeoDisSizing">دریافت کد تایید</p>
                        <svg
                          width={21}
                          height={21}
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.47533 5.91748L3.41699 10.9758L8.47533 16.0341"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5836 10.9756H3.55859"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    ) : (
                      <div className={style.loader}></div>
                    )}
                  </div>
                </button>
                <Link href="/Login" className={style.SignUpLink}>
                  <p
                    className={`${style.colorForSignUpButton} mb-1  mt-3 VodeoDisSizing`}
                  >
                    حساب کاربری دارید؟ وارد شوید
                  </p>
                </Link>

                <div className="mt-3">
                  <span className={`discription`}>ورود شما به معنای پذیرش</span>
                  <span className={`${style.decoreRole}  discription`}>
                    {" "}
                    شرایط آذر هولوگرام و قوانین حریم‌خصوصی
                  </span>
                  <span> است.</span>
                </div>
              </form>
            ) : (
              <OTPInput
                username={username}
                onVerifyOtp={handleVerifyOtp}
                resendOtp={handleResendOtp}
                setIsOtpSent={setIsOtpSent}
                error={errorMessage}
              />
            )}
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
