"use client"


import React, { useState } from "react"
import style from "../../Styles/Profile/MakeOrder.module.scss";
import ProcessTracker from "./ProcessTracker";

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
              <h2>Step 1: Select Product</h2>
              {/* Your product selection component or form goes here */}
              <button onClick={handleNextStep} className={style.continueButton}>
                Continue
              </button>
            </div>
          );
        case 2:
          return (
            <div className={style.stepContent}>
              <h2>Step 2: Provide Information</h2>
              {/* Your form for writing additional information goes here */}
              <button onClick={handlePreviousStep} className={style.backButton}>
                Back
              </button>
              <button onClick={handleNextStep} className={style.continueButton}>
                Continue
              </button>
            </div>
          );
        case 3:
          return (
            <div className={style.stepContent}>
              <h2>Step 3: Review Order</h2>
              {/* Your order review component goes here */}
              <button onClick={handlePreviousStep} className={style.backButton}>
                Back
              </button>
              <button onClick={handleNextStep} className={style.continueButton}>
                Continue
              </button>
            </div>
          );
        case 4:
          return (
            <div className={style.stepContent}>
              <h2>Step 4: Confirm and Pay</h2>
              {/* Your payment form or confirmation screen goes here */}
              <button onClick={handlePreviousStep} className={style.backButton}>
                Back
              </button>
              <button className={style.confirmButton}>Confirm and Pay</button>
            </div>
          );
        default:
          return null;
      }
    };
    return(
        <section>
            <ProcessTracker currentStep={step}/>
            {renderStepContent()}
        </section>
    )
}