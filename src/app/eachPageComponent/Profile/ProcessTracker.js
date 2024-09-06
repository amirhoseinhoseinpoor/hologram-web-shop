import React from "react";
import style from "../../Styles/Profile/ProcessTracker.module.scss";

const ProcessTracker = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "استعلام قیمت", key: "makeOrder", percentage: "28" },
    // { id: 2, label: "برسی کارشناسان", key: "confirmingOrder", perentage: "27" },
    { id: 2, label: "بارگذاری مدارک", key: "billing", percentage: "39" },
    // { id: 4, label: "تایید مدارک", key: "designOrder", percentage: "49" },
    { id: 3, label: "طراحی سفارش", key: "confirmOrder", percentage: "50" },
    { id: 4, label: "انتخاب تحویل سفارش", key: "delivery", percentage: "67" },
    { id: 5, label: "تسویه حساب", key: "reviewDocuments", percentage: "82" },
    { id: 6, label: "رسید نهایی", key: "selectEffect", percentage: "100" },
  ];
  return (
    <>
      <div className={`${style.processTracker}`}>
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
            {index > steps.length -6 && (
              <div
                className={`${style.line} ${
                  index  < currentStep ? style.activeLine : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="d-block d-lg-none me-2 mb-3 mt-2">
        <div className="d-flex flex-row justify-content-between mb-2">
          <p className="VodeoDisSizing">{steps[currentStep-1].label}</p>
          <div>
            <span className={`${style.stageColor} ms-1 NormalTextSizing`}>
              مرحله بعد:
            </span>
            <span className={`${style.stageColor} ms-1 NormalTextSizing`}>{steps[currentStep-1].label}</span>
          </div>
        </div>
        <div
          className={style.theProcesFlowTips}
          style={{
            position: "relative",
            width: "100%",
            height: "4px",
            backgroundColor: "rgba(245, 246, 252, 0.52)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(86, 149, 246, 1)", // Progress color
              width: `${steps[currentStep - 1].percentage}%`,
              height: "100%",
              borderRadius: "4px 0 0 4px", // Rounded corners at the start and tip of the progress
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProcessTracker;
