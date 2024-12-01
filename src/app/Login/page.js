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
  const [saveEachRequest, setSaveEachRequest] = useState(0);

  const hasError = Boolean(errorMessage);

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
    if (username.length == 11 && password.length >= 4) {
      setIsButtonDisabled(false);
      if (!isCaptchaRequired && captchaValue) {
        setIsButtonDisabled(false);
      } else if (!captchaValue && isCaptchaRequired) {
        setIsButtonDisabled(true);
      }
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password ,captchaValue , isCaptchaRequired]);

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
          setErrorMessage(resultAction.payload);
          setSaveEachRequest((prevRequest) => prevRequest + 1);
          // Check if CAPTCHA is required after failed login attempts
          if (resultAction.error.message == "Rejected" && saveEachRequest > 1) {
            setIsCaptchaRequired(true);
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

                {/* <div className="mb-4">
                  <label htmlFor="capcha" className="mb-2 me-2 discription">
                    متن تصویر
                  </label>
                  <div className="d-flex flex-row justify-content-between">
                    <div>
                      <input
                        type="number"
                        id="capcha"
                        className={`${style.formInputCapcha} form-control`}
                        style={{
                          border: hasError ? "1.2px solid #FF4F3F" : "",
                        }}
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center ">
                      <svg
                        className="me-2"
                        width={24}
                        height={25}
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.67981 12.3089H2.92981H3.67981ZM3.67981 13.9756L3.15157 14.508C3.44398 14.7981 3.91565 14.7981 4.20805 14.508L3.67981 13.9756ZM5.88787 12.8413C6.18191 12.5496 6.18377 12.0747 5.89203 11.7807C5.60029 11.4866 5.12542 11.4848 4.83138 11.7765L5.88787 12.8413ZM2.52824 11.7765C2.2342 11.4848 1.75933 11.4866 1.46759 11.7807C1.17585 12.0747 1.17772 12.5496 1.47176 12.8413L2.52824 11.7765ZM18.6156 8.36838C18.8325 8.72124 19.2944 8.83144 19.6473 8.6145C20.0001 8.39757 20.1103 7.93566 19.8934 7.5828L18.6156 8.36838ZM12.0789 3.22559C7.03155 3.22559 2.92981 7.28679 2.92981 12.3089H4.42981C4.42981 8.1263 7.84884 4.72559 12.0789 4.72559V3.22559ZM2.92981 12.3089L2.92981 13.9756H4.42981L4.42981 12.3089H2.92981ZM4.20805 14.508L5.88787 12.8413L4.83138 11.7765L3.15157 13.4432L4.20805 14.508ZM4.20805 13.4432L2.52824 11.7765L1.47176 12.8413L3.15157 14.508L4.20805 13.4432ZM19.8934 7.5828C18.287 4.96986 15.3873 3.22559 12.0789 3.22559V4.72559C14.8484 4.72559 17.2727 6.18403 18.6156 8.36838L19.8934 7.5828Z"
                          fill="#5695F6"
                        />
                        <path
                          d="M20.3139 11.9756L20.8411 11.4422C20.549 11.1534 20.0788 11.1534 19.7867 11.4422L20.3139 11.9756ZM18.1004 13.1088C17.8058 13.4 17.8031 13.8749 18.0942 14.1695C18.3854 14.4641 18.8603 14.4668 19.1549 14.1757L18.1004 13.1088ZM21.4729 14.1757C21.7675 14.4668 22.2424 14.4641 22.5335 14.1695C22.8247 13.8749 22.822 13.4 22.5274 13.1088L21.4729 14.1757ZM5.31794 17.5817C5.1004 17.2292 4.6383 17.1198 4.28581 17.3373C3.93331 17.5549 3.82391 18.017 4.04144 18.3695L5.31794 17.5817ZM11.8827 22.7256C16.9451 22.7256 21.0639 18.6671 21.0639 13.6423H19.5639C19.5639 17.8222 16.1332 21.2256 11.8827 21.2256V22.7256ZM21.0639 13.6423V11.9756H19.5639V13.6423H21.0639ZM19.7867 11.4422L18.1004 13.1088L19.1549 14.1757L20.8411 12.509L19.7867 11.4422ZM19.7867 12.509L21.4729 14.1757L22.5274 13.1088L20.8411 11.4422L19.7867 12.509ZM4.04144 18.3695C5.65405 20.9826 8.56403 22.7256 11.8827 22.7256V21.2256C9.10023 21.2256 6.66584 19.7659 5.31794 17.5817L4.04144 18.3695Z"
                          fill="#5695F6"
                        />
                      </svg>
                    </div>
                  </div>
                </div> */}

                {/* reCAPTCHA */}
                {isCaptchaRequired && (
                  <div className="mb-4">
                    <ReCAPTCHA
                      className={style.captchaContainer}
                      sitekey="6Ld_oI4qAAAAAK1UKDgdrplzpiAbffOBTiarZ37i" // Replace with your site key
                      onChange={(value) => setCaptchaValue(value)}
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
