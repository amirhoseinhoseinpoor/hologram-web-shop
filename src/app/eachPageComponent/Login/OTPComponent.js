"use client"

import React, { useState, useEffect, useRef } from 'react';
import style from '../../Styles/Login/OTPComponent.module.scss'; // Assuming you have a CSS module for styling

export default function OTPInput({ phoneNumber, onVerifyOtp, resendOtp }) {
    const [otp, setOtp] = useState(['', '', '', '']); // Array for 4-digit OTP
    const [timer, setTimer] = useState(120); // Timer set for 2 minutes (120 seconds)
    const inputRefs = useRef([]); // Array of refs for input elements
  
    // Update OTP array on input change
    const handleChange = (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      // Move focus to previous input if value is empty and there is an input before
      if (value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      } else if (value && index < otp.length - 1) {
        // Move focus to next input if a digit is entered
        inputRefs.current[index + 1].focus();
      }
    };
  
    // Handle OTP verification
    const handleSubmit = (event) => {
      event.preventDefault();
      onVerifyOtp(otp.join(''));
    };
  
    // Timer logic
    useEffect(() => {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
  
      // Clear interval on component unmount
      return () => clearInterval(countdown);
    }, []);
  
    // Convert timer seconds to minutes:seconds format
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
  
    return (
      <div className={style.otpContainer}>
        <p>ما برای شماره {phoneNumber} کد تایید ارسال کردیم.</p>
        <p>کد تایید را وارد کنید.</p>
        <form onSubmit={handleSubmit} className={style.otpForm}>
          <div className={style.otpInputs}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="number"
                inputMode="numeric" // Ensures numeric keyboard on mobile devices
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className={style.otpInput}
              />
            ))}
          </div>
          <p className={style.timer}>{formatTime(timer)}</p>
          <button type="submit" className={style.verifyButton}>
            تایید
          </button>
          <button type="button" className={style.resendButton} onClick={resendOtp} disabled={timer > 0}>
            دریافت کد تایید
          </button>
        </form>
      </div>
    );
  }