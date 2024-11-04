"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import style from "../../../Styles/Profile/MakeOrderStyle/MakeOrder.module.scss";
import ProcessTracker from "../ProcessTracker";
import PusherChat from "./Talkjs";

// improt redux
import { useDispatch, useSelector } from "react-redux";
import { getUserProduct } from "@/app/Store/thunks";
import { userOrdersData } from "@/app/Store/slice";

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
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [disabelInput, setDisabelInput] = useState(false);
  const [disabelInputStep2, setDisabelInputStep2] = useState(false);
  const [disabelInputStep4, setDisabelInputStep4] = useState(false);
  const [orderState, setOrderState] = useState("");

  // geting the produc for user

  const checkData = useSelector(userOrdersData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!checkData) {
          await dispatch(getUserProduct());
          console.log(checkData);
          checkData.map((item) => {
            // if (item.status === 1) {}
            setOrderState(item);
            setStep(item.step);
          });
        } else {
          checkData.map((item) => {
            // if (item.status === 1) {}
            setOrderState(item);
            setStep(item.step);
          });
        }
      } catch (error) {
        console.error("Error during dispatch:", error);
      }
    };

    fetchData();
  }, [dispatch , checkData]);

  // Function to go to the next step
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to go to the previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  console.log(orderState);

  // Function to render the content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className={style.stepContent}>
            <SteponeComponent
              data={orderState.request}
              handleNextStep={handleNextStep}
              setDisabelInput={setDisabelInput}
              disabelInput={disabelInput}
            />
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
          <StepTwoComponent
            dataFactor={orderState.reqComment}
            code={orderState.code}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            setDisabelInputStep2={setDisabelInputStep2}
            disabelInputStep2={disabelInputStep2}
          />
        );
      case 3:
        return (
          <PusherChat
            chatData={orderState.chat}
            code={orderState.code}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <div className={style.stepContent}>
            <StepFiveComponent
              code={orderState.code}
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
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
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
