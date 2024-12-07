"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import style from "../../../Styles/Profile/MakeOrderStyle/MakeOrder.module.scss";
import ProcessTracker from "../ProcessTracker";
import PusherChat from "./Talkjs";

const SteponeComponent = dynamic(() => import("./StepOneComponent"));

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

export default function MakeOrder({ currentOrder , setActiveTab }) {

  const [step, setStep] = useState(1);
  const [disabelInput, setDisabelInput] = useState(false);
  const [disabelInputStep2, setDisabelInputStep2] = useState(false);
  const [disabelInputStep4, setDisabelInputStep4] = useState(false);
  // const [orderState, setOrderState] = useState("");

  useEffect(() => {
    if (currentOrder) {
      setStep(currentOrder.step);
    } 
  }, [currentOrder]);
  

  // geting the produc for user

  // const checkData = useSelector(userOrdersData);
  // console.log(checkData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!checkData) {
  //         await dispatch(getUserProduct());
  //         console.log(checkData);
  //         checkData?.map((item) => {
  //           setOrderState(item);
  //           setStep(item.step);
  //         });
  //       } else {
  //         checkData.map((item) => {
  //           setOrderState(item);
  //           setStep(item.step);
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error during dispatch:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, checkData]);

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
            <SteponeComponent
              step={currentOrder.step}
              data={currentOrder.request}
              handleNextStep={handleNextStep}
              setDisabelInput={setDisabelInput}
              disabelInput={disabelInput}
            />
          </div>
        );
      case 2:
        return (
          <StepTwoComponent
            dataFactor={currentOrder.reqComment}
            data={currentOrder.document}
            code={currentOrder.code}
            step={currentOrder.step}
            setActiveTab={setActiveTab}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            setDisabelInputStep2={setDisabelInputStep2}
            disabelInputStep2={disabelInputStep2}
          />
        );
      case 3:
        return (
          <PusherChat
            data={currentOrder.request}
            chatData={currentOrder.chat}
            code={currentOrder.code}
            step={currentOrder.step}
            chatImage={currentOrder.chatImage}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <div className={style.stepContent}>
            <StepFiveComponent
              data={currentOrder.delivery}
              code={currentOrder.code}
              step={currentOrder.step}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              setDisabelInputStep4={setDisabelInputStep4}
              disabelInputStep4={disabelInputStep4}
            />
          </div>
        );
      case 5:
        return (
          <StepSixComponent
            finalFactor={currentOrder.payment}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 6:
        return <StepSeven handleNextStep={handleNextStep} currentOrder={currentOrder}/>;
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
