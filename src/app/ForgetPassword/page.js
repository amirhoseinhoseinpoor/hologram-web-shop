"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword, resetPassword } from "../Store/thunks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "../eachPageComponent/Login/OTPComponent";
import {
  CloseIcon,
  SubmitArrowIcon,
} from "../eachPageComponent/Login/AuthIcons";
import AuthLayout from "../layouts/AuthLayout";
import style from "../Styles/ForgetPassword/ForgetPasswordStyle.module.scss";
import { PHONE_NUMBER_REGEX, getLastPage } from "../utils/authForm";

const STEP = {
  PHONE: "phone",
  OTP: "otp",
  NEW_PASSWORD: "newPassword",
  DONE: "done",
};

const MIN_PASSWORD_LENGTH = 4;

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [step, setStep] = useState(STEP.PHONE);
  const [username, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasError = Boolean(errorMessage);
  const inputBorder = { border: hasError ? "1.2px solid #FF4F3F" : "" };

  const requestOtp = async () => {
    const resultAction = await dispatch(forgotPassword({ username }));

    if (forgotPassword.fulfilled.match(resultAction)) {
      setStep(STEP.OTP);
      return;
    }
    setErrorMessage(resultAction.payload);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!PHONE_NUMBER_REGEX.test(username)) {
      setErrorMessage("فرمت شماره همراه اشتباه است");
      return;
    }

    setLoading(true);
    await requestOtp();
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setErrorMessage(null);
    await requestOtp();
  };

  // The code is checked by the backend together with the new password.
  const handleOtpEntered = (enteredOtp) => {
    setErrorMessage(null);
    setOtp(enteredOtp);
    setStep(STEP.NEW_PASSWORD);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage("رمز عبور باید حداقل ۴ کاراکتر باشد");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }

    setLoading(true);
    const resultAction = await dispatch(
      resetPassword({ username, otp, password }),
    );
    setLoading(false);

    if (resetPassword.fulfilled.match(resultAction)) {
      setStep(STEP.DONE);
      return;
    }
    setErrorMessage(resultAction.payload);
    setStep(STEP.OTP);
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

            {step === STEP.PHONE && (
              <form
                onSubmit={handleSendOtp}
                className="form-border p-2 bg-white rounded container"
              >
                <p className="mb-3 me-2 mt-5 discription">فراموشی رمز عبور</p>

                {errorMessage && (
                  <div className={style.handelLoginError}>{errorMessage}</div>
                )}

                <div className="d-flex flex-column  mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 me-2 discription"
                  >
                    شماره همراه
                  </label>
                  <input
                    type="tel"
                    className={`${style.formInputNumber} form-control`}
                    style={inputBorder}
                    id="phoneNumber"
                    value={username}
                    onChange={(e) => {
                      if (/^[0-9]*$/.test(e.target.value)) {
                        setPhoneNumber(e.target.value);
                      }
                    }}
                    inputMode="numeric"
                    maxLength={11}
                    autoComplete="username"
                    autoFocus
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`${style.submitButton} w-100 mt-1`}
                  disabled={loading}
                >
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <p className="ms-2 subitem">دریافت کد تایید</p>
                    <SubmitArrowIcon />
                  </div>
                </button>

                <Link href="/Login" className={style.SignUpLink}>
                  <p className="mt-3 mb-1 discription">بازگشت به صفحه ورود</p>
                </Link>
              </form>
            )}

            {step === STEP.OTP && (
              <OTPInput
                username={username}
                onVerifyOtp={handleOtpEntered}
                resendOtp={handleResendOtp}
                setIsOtpSent={() => setStep(STEP.PHONE)}
                error={errorMessage}
              />
            )}

            {step === STEP.NEW_PASSWORD && (
              <form
                onSubmit={handleResetPassword}
                className="form-border p-2 bg-white rounded container"
              >
                <p className="mb-3 me-2 mt-5 discription">رمز عبور جدید</p>

                {errorMessage && (
                  <div className={style.handelLoginError}>{errorMessage}</div>
                )}

                <div className="d-flex flex-column  mb-3">
                  <label htmlFor="password" className="mb-2 me-2 discription">
                    رمز عبور جدید
                  </label>
                  <input
                    type="password"
                    className={`${style.formInputNumber} form-control`}
                    style={inputBorder}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    autoFocus
                    required
                  />
                </div>

                <div className="d-flex flex-column  mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 me-2 discription"
                  >
                    تکرار رمز عبور جدید
                  </label>
                  <input
                    type="password"
                    className={`${style.formInputNumber} form-control`}
                    style={inputBorder}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`${style.submitButton} w-100 mt-1`}
                  disabled={loading}
                >
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <p className="ms-2 subitem">تغییر رمز عبور</p>
                    <SubmitArrowIcon />
                  </div>
                </button>
              </form>
            )}

            {step === STEP.DONE && (
              <div className="form-border p-2 bg-white rounded container">
                <p className="mb-4 me-2 mt-5 discription">
                  رمز عبور شما با موفقیت تغییر کرد.
                </p>
                <Link href="/Login" className={style.SignUpLink}>
                  <p className="mb-3 discription">ورود به حساب کاربری</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}
