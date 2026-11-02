"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { token, authReady } from "../Store/slice";
import { login, sendLoginOtp } from "../Store/thunks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "../eachPageComponent/Login/OTPComponent";
import {
  CloseIcon,
  SubmitArrowIcon,
} from "../eachPageComponent/Login/AuthIcons";
import AuthLayout from "../layouts/AuthLayout";
import style from "../Styles/Login/LoginStyle.module.scss";
import { PHONE_NUMBER_REGEX, getLastPage } from "../utils/authForm";
// import captcha for the login
import ReCAPTCHA from "react-google-recaptcha";
import { Box } from "@mui/material";

const CAPTCHA_AFTER_FAILED_ATTEMPTS = 3;

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const comeToken = useSelector(token);
  const isAuthReady = useSelector(authReady);

  const [username, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadinStatus, setLodaingStatus] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const hasError = Boolean(errorMessage);
  const isCaptchaRequired = failedAttempts >= CAPTCHA_AFTER_FAILED_ATTEMPTS;
  const isButtonDisabled =
    username.length !== 11 ||
    password.length < 4 ||
    (isCaptchaRequired && !captchaValue);

  // ReCAPTCHA Ref
  const recaptchaRef = useRef(null);
  // focuse the number filed
  const numberRef = useRef(null);
  // input ref for moving to the next
  const passwordRef = useRef(null);

  // logged in (just now or restored session) → leave the login form
  useEffect(() => {
    if (isAuthReady && comeToken) {
      router.replace(getLastPage());
    }
  }, [isAuthReady, comeToken, router]);

  useEffect(() => {
    numberRef.current?.focus();
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhoneNumber(value);
      if (value.length === 11) passwordRef.current?.focus();
    }
  };

  // Check the password and send the OTP to the user's phone
  const requestOtp = async () => {
    const resultAction = await dispatch(
      sendLoginOtp({
        username,
        password,
        captchaResponse: captchaValue,
      }),
    );

    if (sendLoginOtp.fulfilled.match(resultAction)) {
      setIsOtpSent(true);
      return;
    }

    setErrorMessage(resultAction.payload);
    setFailedAttempts((prev) => prev + 1);
    setCaptchaValue(null);
    recaptchaRef.current?.reset();
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!PHONE_NUMBER_REGEX.test(username)) {
      setErrorMessage("فرمت شماره همراه اشتباه است");
      return;
    }

    setLodaingStatus(true);
    await requestOtp();
    setLodaingStatus(false);
  };

  // Verify OTP
  const handleVerifyOtp = async (otp) => {
    setErrorMessage(null);
    setLodaingStatus(true);

    const resultAction = await dispatch(login({ username, otp }));

    if (login.rejected.match(resultAction)) {
      setErrorMessage(resultAction.payload);
    }

    setLodaingStatus(false);
  };

  const handleResendOtp = async () => {
    setErrorMessage(null);
    await requestOtp();
  };

  return (
    <AuthLayout>
      <section className={`${style.sectionLoginStyle}  d-flex w-100`}>
        <div className={`${style.outerLoginPage} container pt-3 pb-3`}>
          <div className={`${style.LoginMainDiv} position-relative`}>
            <div
              onClick={() => router.push(getLastPage())}
              className={style.closeIconImg}
            >
              <CloseIcon />
            </div>

            {!isOtpSent ? (
              <form
                onSubmit={handleSendOtp}
                className="form-border p-2 bg-white rounded container"
              >
                <div className="d-flex flex-row justify-content-center mt-3 mb-4">
                  <div>
                    <Box
                      component="img"
                      sx={{
                        width: "105px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      alt="image."
                      src="/LOGO/cropped-com.chakavak.adv_512x512.png"
                    />
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
                    type="tel"
                    className={`${style.formInputNumber} form-control`}
                    style={{ border: hasError ? "1.2px solid #FF4F3F" : "" }}
                    id="phoneNumber"
                    value={username}
                    ref={numberRef}
                    onChange={handlePhoneChange}
                    inputMode="numeric"
                    maxLength={11}
                    autoComplete="username"
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
                    autoComplete="current-password"
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
                        <SubmitArrowIcon />
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
                error={errorMessage}
              />
            )}
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
