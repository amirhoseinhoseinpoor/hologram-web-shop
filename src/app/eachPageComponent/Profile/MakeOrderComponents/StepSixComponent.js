import React, { useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import style from "../../../Styles/Profile/MakeOrderStyle/StepSixStyle.module.scss";

export default function StepSixComponent({ handleNextStep }) {
  const [value, setValue] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Enable the button only if a radio option is selected
    setIsButtonDisabled(value === "");
  }, [value]);

  return (
    <section>

      <div className="d-flex flex-row gap-3">
        <div className={`${style.SectionStyle} mb-3 mt-2 w-50`}>
          <p className="NormalTextSizing">
            شما میتوانید با یکی از روش های زیر تسویه حساب خود را انجام دهید.
          </p>
          <div>
            <FormControl>
              <FormLabel
                className={`${style.resetfontLabel}`}
                id="demo-controlled-radio-buttons-group"
              ></FormLabel>
              <RadioGroup
                className={style.FormGroupForRaidio}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  className={`${style.resetfontLabel} mt-2 mb-1`}
                  value="درگاه پرداخت"
                  control={<Radio />}
                  label="درگاه پرداخت"
                />
                <FormControlLabel
                  className={`${style.resetfontLabel} mt-1 mb-1`}
                  value="آپلود فیش"
                  control={<Radio />}
                  label="آپلود فیش"
                />
                <FormControlLabel
                  className={style.resetfontLabel}
                  value="چک"
                  control={<Radio />}
                  label="چک"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="d-flex flex-row mt-3 gap-4 align-items-center">
            <button
              onClick={handleNextStep}
              className={style.continueButton}
              disabled={isButtonDisabled}
              style={{
                backgroundColor: isButtonDisabled ? "#868686" : "#007bff",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
            >
              پرداخت
            </button>
            <div className="d-flex flex-row">
              <span className="NormalTextSizing">40.000.000</span>
              <span className="NormalTextSizing"> ریال </span>
            </div>
          </div>
        </div>
        <div className={`${style.SectionStyle} w-50 mt-2`}>
            <p className={`${style.changingopacity} text-center VodeoDisSizing`}>فاکتور نهایی</p>
            <div className="d-flex flex-column mt-2">
                <div className="d-flex flex-row justify-content-between mt-3">
                    <div>
                        <p>عنوان:</p>
                    </div>
                    <div>
                        <span className="VodeoDisSizing">20.000.000.000</span><span className="me-1 VodeoDisSizing">ریال</span>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <div>
                        <p>عنوان:</p>
                    </div>
                    <div>
                        <span className="VodeoDisSizing">20.000.000.000</span><span className="me-1 VodeoDisSizing">ریال</span>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <div>
                        <p>عنوان:</p>
                    </div>
                    <div>
                        <span className="VodeoDisSizing">20.000.000.000</span><span className="me-1 VodeoDisSizing">ریال</span>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <div>
                        <p>عنوان:</p>
                    </div>
                    <div>
                        <span className="VodeoDisSizing">20.000.000.000</span><span className="me-1 VodeoDisSizing">ریال</span>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between mt-3">
                    <div>
                        <p>عنوان:</p>
                    </div>
                    <div>
                        <span className="VodeoDisSizing">20.000.000.000</span><span className="me-1 VodeoDisSizing">ریال</span>
                    </div>
                </div>

            </div>
            <div className="text-center mt-5 fs-2"><p>.لوگو</p></div>
        </div>
      </div>
    </section>
  );
}
