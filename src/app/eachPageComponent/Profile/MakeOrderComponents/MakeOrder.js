"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import style from "../../../Styles/Profile/MakeOrderStyle/MakeOrder.module.scss";
import ProcessTracker from "../ProcessTracker";
import data from "/public/json/ProfileFirstStepEffect.json";


import PusherChat from "./Talkjs";

const SteponeComponent = dynamic(() => import("./StepOneComponent"));

// const StepBetweenOneAndTwo = dynamic(() => import("./StepBetweenOneAndTwo"))

const StepTwoComponent = dynamic(() => import("./StepTwoComponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const StepFiveComponent = dynamic(() => import("./StepFiveComponent.js"));
const StepSixComponent = dynamic(() => import("./StepSixComponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const StepSeven = dynamic(() => import("./StepSevenComponent"));

export default function MakeOrder() {
  const [step, setStep] = useState(1);

  // Function to go to the next step
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Function to render the content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={style.stepContent}>
            <SteponeComponent data={data} handleNextStep={handleNextStep} />
          </div>
        );
      // case 2:
      //   return (
      //     <div className={style.stepContent}>
      //       <StepBetweenOneAndTwo data={data} handleNextStep={handleNextStep}/>
      //     </div>
      //   );
      case 2:
        return (
          
            <StepTwoComponent handleNextStep={handleNextStep} />
          
        );
      
      case 3:
        return (
          <div>
            <PusherChat />
            {/* <button onClick={handlePreviousStep} className={style.backButton}>
              Back
            </button> */}
            <button onClick={handleNextStep} className={style.continueButton}>
              Continue
            </button>
          </div>
        );
      case 4:
        return (
          <div className={style.stepContent}>
            <StepFiveComponent handleNextStep={handleNextStep} />
          </div>
        );
      case 5:
        return <StepSixComponent handleNextStep={handleNextStep} />;
      case 6:
        return <StepSeven handleNextStep={handleNextStep} />;
      default:
        return null;
    }
  };
  return (
    <section>
      <ProcessTracker currentStep={step} />
      {renderStepContent()}
    </section>
  );
}
