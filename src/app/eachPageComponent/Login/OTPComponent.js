"use client";

import React, { useState, useEffect, useRef } from "react";
import style from "../../Styles/Login/OTPComponent.module.scss"; // Assuming you have a CSS module for styling
import { Box } from "@mui/material";

export default function OTPInput({
  username,
  onVerifyOtp,
  resendOtp,
  setIsOtpSent,
  error,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120); // Timer set for 2 minutes (120 seconds)
  const inputRefs = useRef([]); // Array of refs for input elements

  const handleChange = (index, value) => {
    // Allow digits or empty
    if (value === "" || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // If a digit is entered, move to next input
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      // If cleared, we keep the focus behavior as controlled by Backspace handler
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Handle OTP verification
  const handleSubmit = (event) => {
    event.preventDefault();
    onVerifyOtp(otp.join(""));
  };

  const handleKeyDown = (index, e) => {
    // If Backspace pressed on an empty field, move to previous
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1].focus();
    }
  };

  // Timer logic
  // useEffect(() => {
  //   const countdown = setInterval(() => {
  //     setTimer((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);

  //   // Clear interval on component unmount
  //   return () => clearInterval(countdown);
  // }, []);

  // Convert timer seconds to minutes:seconds format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={style.otpContainer}>
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
      {error && (
        <p
          style={{
            color: "#d32f2f",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {error}
        </p>
      )}
      <p className="discription">
        ما برای شماره {username} کد تایید ارسال کردیم.
      </p>
      <p
        className={`${style.numberFalse} discription`}
        onClick={() => setIsOtpSent(false)}
      >
        شماره اشتباه؟
      </p>
      <p className="mt-3 discription text-end mb-2">کد تایید را وارد کنید.</p>
      <form onSubmit={handleSubmit} className={style.otpForm}>
        <div className={style.otpInputs}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric" // Ensures numeric keyboard on mobile devices
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              id={`otp-input-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className={style.otpInput}
              placeholder="-"
              required
            />
          ))}
        </div>

        {timer > 0 ? (
          <>
            <p className={`discription mb-3 mt-2 text-center`}>
              {formatTime(timer)}
            </p>
          </>
        ) : (
          <>
            <div className="d-flex flex-row mb-4 mt-2 me-2">
              <span className="QASize">کد دریافت نکردین؟ </span>
              <button
                type="button"
                className={`${style.resendButton} QASize`}
                onClick={async () => {
                  await resendOtp();
                  setTimer(120);
                }}
              >
                تلاش مجدد
              </button>
            </div>
          </>
        )}

        <button type="submit" className={style.verifyButton}>
          تایید
        </button>
      </form>
    </div>
  );
}
