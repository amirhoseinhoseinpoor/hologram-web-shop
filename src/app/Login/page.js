"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Store/thunks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPInput from "../eachPageComponent/Login/OTPComponent"; // Import OTPInput component
import style from "../Styles/Login/LoginStyle.module.scss";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Send OTP to the user's phone
  const handleSendOtp = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        setIsOtpSent(true); // OTP sent successfully
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (otp) => {
    setErrorMessage(null);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (response.ok) {
        // Assuming your backend sends a token or some user data upon successful OTP verification
        const data = await response.json();
        dispatch(login(data)); // Dispatch login action with user data
        router.push("/"); // Redirect to home page
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        setErrorMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="h-100 d-flex">
      <div className={style.outerLoginPage}>
        <div className={`${style.LoginMainDiv} position-relative`}>
          <Link href="/">
            <div className={style.closeIconImg}>
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
          </Link>
          {!isOtpSent ? (
            <form
              onSubmit={handleSendOtp}
              className="form-border p-2 bg-white rounded container"
            >
              <div className="d-flex flex-row justify-content-center mt-3 mb-4">
                <div>
                  <p className="Banner-title">Logo</p>
                </div>
              </div>
              <Link href="/SignUp" className={style.SignUpLink}>
                <p className="mb-3 me-2 mt-3 discription">ورود | ثبت نام</p>
              </Link>

              <div className="d-flex flex-column  mb-4">
                <label htmlFor="phoneNumber" className="mb-2 me-2 discription">
                  شماره همراه
                </label>
                <input
                  type="number"
                  className={`${style.formInputNumber} form-control`}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${style.submitButton} w-100 mt-1`}
              >
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="ms-2 subitem">دریافت کد تایید</p>
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
                </div>
              </button>
            </form>
          ) : (
            <OTPInput
              phoneNumber={phoneNumber}
              onVerifyOtp={handleVerifyOtp}
              resendOtp={handleResendOtp}
            />
          )}

          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>
      </div>
    </section>
  );
}
