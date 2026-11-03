import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import style from "../../Styles/Profile/ProcessTracker.module.scss";

const STEPS = [
  { id: 1, label: "استعلام قیمت" },
  { id: 2, label: "بارگذاری مدارک" },
  { id: 3, label: "طراحی سفارش" },
  { id: 4, label: "تسویه حساب" },
  { id: 5, label: "انتخاب تحویل سفارش" },
  { id: 6, label: "رسید نهایی" },
];

// currentStep: the step on screen. navStep: the furthest step reached;
// steps up to it can be reopened, later ones aren't available yet.
const ProcessTracker = ({ currentStep, setStep, navStep }) => {
  const current = STEPS[currentStep - 1];
  const next = STEPS[currentStep];
  const progress = (Math.max(currentStep, 1) / STEPS.length) * 100;

  return (
    <nav className={style.tracker} aria-label="مراحل سفارش">
      <ol className={style.steps}>
        {STEPS.map((step) => {
          const isReached = step.id <= navStep;
          const isDone = step.id < navStep;
          const isCurrent = step.id === currentStep;
          return (
            <li
              key={step.id}
              className={`${style.step} ${isDone ? style.done : ""} ${
                isCurrent ? style.current : ""
              }`}
            >
              <button
                type="button"
                disabled={!isReached}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => setStep(step.id)}
              >
                <span className={style.marker}>
                  {isDone ? (
                    <CheckIcon aria-label="انجام شده" />
                  ) : (
                    step.id.toLocaleString("fa-IR")
                  )}
                </span>
                <span className={style.label}>{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={style.compact}>
        <div className={style.compactHead}>
          <p>
            مرحله {currentStep.toLocaleString("fa-IR")} از{" "}
            {STEPS.length.toLocaleString("fa-IR")}: {current?.label}
          </p>
          {next && <span>مرحله بعد: {next.label}</span>}
        </div>
        <div
          className={style.bar}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={STEPS.length}
          aria-valuenow={currentStep}
          aria-label="پیشرفت سفارش"
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </nav>
  );
};

export default ProcessTracker;
