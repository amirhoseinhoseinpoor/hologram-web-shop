import React from "react";
import style from "../../Styles/Profile/ProcessTracker.module.scss";

const ProcessTracker = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "انتخاب افکت", key: "makeOrder" },
    { id: 2, label: "بارگذاری مدارک", key: "billing" },
    { id: 3, label: "تایید مدارک", key: "designOrder" },
    { id: 4, label: "طراحی سفارش", key: "confirmOrder" },
    { id: 5, label: "انتخاب تحویل سفارش", key: "delivery" },
    { id: 6, label: "تسویه حساب", key: "reviewDocuments" },
    { id: 7, label: "ثبت سفارش", key: "selectEffect" },
  ];
  return (
    <div className={style.processTracker}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`${style.step} ${
            index + 1 === currentStep
              ? style.active
              : index + 1 < currentStep
              ? style.completed
              : ""
          }`}
        >
          <div className={style.circle}>
            {index + 1 < currentStep ? (
              <svg
                width={25}
                height={24}
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0703 22C17.5703 22 22.0703 17.5 22.0703 12C22.0703 6.5 17.5703 2 12.0703 2C6.57031 2 2.07031 6.5 2.07031 12C2.07031 17.5 6.57031 22 12.0703 22Z"
                  stroke="#5695F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.82031 11.9999L10.6503 14.8299L16.3203 9.16992"
                  stroke="#5695F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <span className="VodeoDisSizing">{step.id}</span>
            )}
          </div>
          <div className={`${style.label} discription`}>{step.label}</div>
          {/* {index > steps.length - 7  && <div className={style.line}></div>} */}
          {index > steps.length - 7 && (
            <div
              className={`${style.line} ${
                index + 1 < currentStep ? style.activeLine : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessTracker;
