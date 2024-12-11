"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { token } from "../Store/slice";
import { login } from "../Store/thunks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "../eachPageComponent/Login/OTPComponent";
import AuthLayout from "../layouts/AuthLayout";
import style from "../Styles/Login/LoginStyle.module.scss";
// import captcha for the login
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const phoneNumberRegex = /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g;

  const comeToken = useSelector(token);

  const [username, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loadinStatus, setLodaingStatus] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isCaptchaRequired, setIsCaptchaRequired] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const hasError = Boolean(errorMessage);

  // ReCAPTCHA Ref
  const recaptchaRef = useRef(null);
  // focuse the number filed
  const numberRef = useRef(null);
  // // input ref for moving to the next
  const passwordRef = useRef(null);

  useEffect(() => {
    if (numberRef.current) {
      numberRef.current.focus();
    }
    if (numberRef && username.length == 11) {
      passwordRef.current.focus();
    }
  }, [username]);

  useEffect(() => {
    if (username.length === 11 && password.length >= 4) {
      if (isCaptchaRequired) {
        setIsButtonDisabled(!captchaValue);
      } else {
        setIsButtonDisabled(false);
      }
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password, captchaValue, isCaptchaRequired]);

  useEffect(() => {
    if (failedAttempts >= 3) {
      setIsCaptchaRequired(true);
    }
  }, [failedAttempts]);

  // Send OTP to the user's phone

  const handleLogin = async (event) => {
    event.preventDefault();
    setLodaingStatus(true);
    setErrorMessage(null);

    // If captcha is not verified, show error
    if (isCaptchaRequired && !captchaValue) {
      setErrorMessage("لطفا ربات نیستید را تایید کنید.");
      setLodaingStatus(false);
      setIsButtonDisabled(true);
      return;
    }

    try {
      const credentials = { username, password };

      if (!phoneNumberRegex.test(username)) {
        setErrorMessage("فرمت شماره همراه اشتباه است");
        setLodaingStatus(false);
      } else {
        const resultAction = await dispatch(login(credentials));
        if (login.rejected.match(resultAction)) {
          setErrorMessage(resultAction.payload || "ورود ناموفق");
          setFailedAttempts((prevRequest) => prevRequest + 1);
          // Check if CAPTCHA is required after failed login attempts
          // if (resultAction.error.message == "Rejected" && failedAttempts > 1) {
          //   setIsCaptchaRequired(true);
          // }
          // If CAPTCHA is required, reset the ReCAPTCHA widget and captchaValue
          if (isCaptchaRequired) {
            setCaptchaValue(null);
            if (recaptchaRef.current) {
              recaptchaRef.current.reset(); // Reset ReCAPTCHA widget
            }
          }
          setLodaingStatus(false);
        }
      }
    } catch (error) {
      console.error("Login/page.js", error);
      setLodaingStatus(false);
    }
  };

  useEffect(() => {
    if (comeToken) {
      setIsOtpSent(true); // Set OTP sent flag when token is available
    } else if (comeToken === null && isOtpSent) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  }, [comeToken, isOtpSent]);

  // const handleSendOtp = async (event) => {
  //   event.preventDefault();
  //   setErrorMessage(null);
  //   try {
  //     const response = await fetch("/api/send-otp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ phoneNumber }),
  //     });

  //     if (response.ok) {
  //       setIsOtpSent(true); // OTP sent successfully
  //     } else {
  //       setErrorMessage("Failed to send OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     setErrorMessage("An unexpected error occurred. Please try again.");
  //   }
  // };

  // Verify OTP
  const handleVerifyOtp = async (otp) => {
    setErrorMessage(null);
    try {
      const lastPage = sessionStorage.getItem("lastPage") || "/";
      router.push(lastPage);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    // try {
    //   const response = await fetch("/api/send-otp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ phoneNumber }),
    //   });
    //   if (!response.ok) {
    //     setErrorMessage("Failed to resend OTP. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error resending OTP:", error);
    //   setErrorMessage("An unexpected error occurred. Please try again.");
    // }
  };

  function NavigateLastPage() {
    const lastPage = sessionStorage.getItem("lastPage") || "/";
    router.push(lastPage);
  }

  return (
    <AuthLayout>
      <section className={`${style.sectionLoginStyle}  d-flex w-100`}>
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
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.16992 15.3055L14.8299 9.64551"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8299 15.3055L9.16992 9.64551"
                  stroke="#333333"
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
                  <div>
                    <p className="Banner-title">Logo</p>
                  </div>
                </div>
                <p className="mb-3 me-2 mt-3 discription">ورود</p>

                {errorMessage && (
                  <div className={style.handelLoginError}>{errorMessage}</div>
                )}

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
                    style={{ border: hasError ? "1.2px solid #FF4F3F" : "" }}
                    id="phoneNumber"
                    value={username}
                    ref={numberRef}
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
                    style={{ border: hasError ? "1.2px solid #FF4F3F" : "" }}
                    id="password"
                    value={password}
                    ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="mt-2">
                    <Link
                      className={`${style.forgotPasswordStyle}`}
                      href="/ForgetPassword"
                      passHref
                    >
                      <div className="d-flex flex-row gap-2 align-items-center">
                        <p className={`discription`}>فراموشی رمز عبور</p>
                        <svg
                          width={17}
                          height={18}
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.74958 12.5955L4.94625 8.79214C4.49708 8.34297 4.49708 7.60797 4.94625 7.1588L8.74958 3.35547"
                            stroke="#F3802C"
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* reCAPTCHA */}
                {isCaptchaRequired && (
                  <div className="mb-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      className={style.captchaContainer}
                      sitekey="6Ld_oI4qAAAAAK1UKDgdrplzpiAbffOBTiarZ37i" // Replace with your site key
                      onChange={(value) => setCaptchaValue(value)}
                      onExpired={() => setCaptchaValue(null)}
                    />
                  </div>
                )}

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
                <Link href="/SignUp" className={style.SignUpLink}>
                  <p
                    className={`${style.colorForSignUpButton} mb-1  mt-3 VodeoDisSizing`}
                  >
                    حساب کاربری ندارید؟ ثبت نام کنید
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
              />
            )}
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
