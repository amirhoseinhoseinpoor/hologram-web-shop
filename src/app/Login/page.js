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
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  // Send OTP to the user's phone

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const credentials = { username, password };

      if (!phoneNumberRegex.test(username)) {
        setErrorMessage("فرمت شماره همراه اشتباه است");
      } else {
        const resultAction = await dispatch(login(credentials));
        if (login.rejected.match(resultAction)) {
          setErrorMessage(resultAction.payload);
        }
      }
    } catch (error) {
      console.error("Login/page.js", error);
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
      alert("your OTP   " + otp);
      const lastPage = sessionStorage.getItem("lastPage") || "/";
      router.push(lastPage);

      // const response = await fetch("/api/verify-otp", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ phoneNumber, otp }),
      // });

      // if (response.ok) {
      //   // Assuming your backend sends a token or some user data upon successful OTP verification
      //   const data = await response.json();
      //   dispatch(login(data)); // Dispatch login action with user data
      //   router.push("/"); // Redirect to home page
      // } else {
      //   setErrorMessage("Invalid OTP. Please try again.");
      // }
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

                <div className="mb-4">
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
                        width={122}
                        height={37}
                        viewBox="0 0 122 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect
                          x="0.5"
                          y="0.975586"
                          width={121}
                          height={35}
                          rx="3.5"
                          fill="url(#pattern0_1673_11138)"
                        />
                        <rect
                          x="0.5"
                          y="0.975586"
                          width={121}
                          height={35}
                          rx="3.5"
                          stroke="#C0C0C0"
                        />
                        <defs>
                          <pattern
                            id="pattern0_1673_11138"
                            patternContentUnits="objectBoundingBox"
                            width={1}
                            height={1}
                          >
                            <use
                              xlinkHref="#image0_1673_11138"
                              transform="matrix(0.00282486 0 0 0.00957313 0 -0.00737602)"
                            />
                          </pattern>
                          <image
                            id="image0_1673_11138"
                            width={354}
                            height={106}
                            xlinkHref="data:image/png;base64,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mM3HxgFc9paNQTZG46Mv+7En24KVexK5xkkm/WS2cG1cdKWP+fKWoV92dN+cWeDy2s/m64ctLOA0ds+NuuTpV/8WAe0SpZoL3xnMu3rsYbHyppE5BWOZTOWxP93ooa2FxfMD9Hl29CWzI/sbq5S5bBf1z061QIF4SvN6qKVAwjWH6B92TijC4wz5zer88CGPo3hNBBQPN6eQtOXcHFQUwvFk54DDITi0LKLj6AFSYBwn8nMqcgCRXiJBf73HeTm3eyInDipi8lM72Zd8co1LWx/A7G/vOeh43BCJiXxFSl6RvTobA/2V+zNtzk3XgLiHlPH19kkddmITETkYWxBEhgBmfNpkHOwFjuSyB9jaPgANgBUtGh9gihjpSH4SfUXhPmCZF/ORNxXQIUtbOeNwrh9zwb70URes2R3Y6Bkd9aUM7M2/rRfn6qjP9plPdb0tZczqmSt1JfAHSUfPhj+msdgAsq0hCw69zKVxga6PgN7EXMvGxwbmie4SPdgMfPXn3BaF54MN9Wd8FnTy2Tttm4D6Z6da4H8AAAD//zDRP0oAAB6hSURBVO3d948dxRIF4DG2yTlnlpxzziZIIJD4S5FA4gdENjnnnE3OOWOM33xtH2+/612e7V3jt1fVUntmOlRXne46XdN3Fpb9/fff64dK/xOBZcuWDevXr295xGzYaaedBmVykvI//vhj+PLLL4c333xzeP7554eXXnppePvtt4ePPvpo+Pbbb4e1f/45AFx/ebfddhsOO+yw4ZBDDhn23nvvYddddx123nnnYeXKlcPy5cuH/fbbb/juu++Gt956q8lxv27dujbkihUrWn99jj322OHoo48ejjzyyNaHDscff/xw4oknDqeccsowMzPTdKfDO++8Mzz11FPDgw8+ODzxxBPD119/Paxdu7bJbDaNdytHHcg94IADhjPOOGO47rrrhv3337/Z98MPPzTdyb/44ouHfffdt+kbjP76668mi/5shJuy2Kzy119/HT755JPh6aefbnrQh16//PJL6+uf4AtXCRaHH374cNxxx7X81VdfDUcccUQro8uFF144HHTQQQ0f48HJfGj3wQcfDO+++27D0dy89957Azu022effRp2MCLvtNNOG/bcc8/h999/b/jSw7jwhUdsYpc6+rHn1VdfHV5++eU272vWrGnlZMNt9913b/MJ588//3x44403ho8//rjpEOzZuNdee7X26XPOOee0uT399NOHM888s40PV3NmXRlPNpfff//98NNPP23CUDtrRN5jjz2GQw89tNmg3L21cfLJJ7cya5Cu1l7mSzv2Vdr+CCwbF1ER8VbgbJFKIQn3ccjc//jjj83RkQui46BIR/mfIxFz/oMPPrg5FXJxLx944IGtjLNzRE7Jgb744ovhxRdfHJ599tlGJEi2yRpJhjYcDXEgYY51zDHHNGf0zMFOOumkRqaI/rfffhs+/fTT4bnnnhseeOCBYfXq1U03RBKCRzQckp7IGJHffPPNTTfOSsbPP//cSOr8889vY9Ad2QSDdjP+E0fuMVJHNtJgFx0eeeSRhhPbQrz00D96wciGwx5XBItQ4MTWyy67rOnSj2lc8mxgyAv5IWL2IzDPyH+XXXZpfck577zzNsmBP13NEyKGLVtDxmTTDx423SeffLJtcojWHNlozSUcJfOv3Jzq4zn2qjeP5l9mF3zZi4jNQzYIJMwGm717Y5OL1NmMRLN+2CabH/bYWNlh05kZNx8228DoGLvYFPzpVWn7IlBEvBX4WuBST8KcSHkWrQXMId5///1GwiKVV155pUVBIixOzVkQJCc44YQThrPOOms49dRTm2MgSyTIkSSRMcJCGBzutddea/JEyJ999lkjRfpweGTBwUSM+rsiDVdjiLqlb775pjnufffdN9x7770tWhRN0Su2ubKNXUcdddRw7bXXNidGChyaLdqLhhEUW8inh759gk/kKU+9/rCB0cMPP9xIWeT694jhsnHcYKCdhJyMc/bZZ7foF5mxmXwbxCWXXNJ0pYN5UA4/mLPFFemKSG0ANkqkbEykrh5hIT2YGQ9+sIEDwlInkkRcUmyjozkh87HHHmsE+eGHH7aIHHkm0qQXXWxmwUTUztb1Y/k+I57ZmNl0wQUXbNp8RP30M39IGGau7GGDOenXY0jdRpC3LZs2/NiXebMWydVXZqt2lf49BIqItwJrTieFSNwrky1eiVOJfhEMZ7///vubsyNnSQQkKkG8SM1r8BVXXNEIhuPHIcghk4NycmSMLLxSi4y90iNlTqitfghShIisEBDZnJoDn3vuue31mkyykAZHvuuuu5quokVypNinLduQLSIXMZEjkmIDcvF6rx5hyRxeHTLUnkMHG04e+Qgpr/OPPvpo27REqI4PtKMD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"
                          />
                        </defs>
                      </svg>
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
                </div>

                <button
                  type="submit"
                  className={`${style.submitButton} ${
                    isButtonDisabled ? style.disabledButton : style.activeButton
                  } w-100 mt-1`}
                  disabled={isButtonDisabled}
                >
                  <div
                    className={`${style.justPaddingButton} d-flex flex-row align-items-center justify-content-center`}
                  >
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
