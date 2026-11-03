import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import style from "../../../Styles/Profile/MakeOrderStyle/MakeOrder.module.scss";
import ProcessTracker from "../ProcessTracker";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { Modal, Box } from "@mui/material";

const SteponeComponent = dynamic(() => import("./StepOneComponent"));

const StepTwoComponent = dynamic(() => import("./StepTwoComponent"), {
  ssr: false,
  loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
});

const StepFiveComponent = dynamic(() => import("./StepFiveComponent.js"));
const StepSixComponent = dynamic(() => import("./StepSixComponent"), {
  ssr: false,
  loading: () => <div className="az-spinner" role="status" aria-label="در حال بارگذاری" />,
});

const StepSeven = dynamic(() => import("./StepSevenComponent"));
const PusherChat = dynamic(() => import("./Talkjs"), {
  ssr: false,
});

export default function MakeOrder({
  currentOrder,
  setActiveTab,
  setUpdateData,
}) {
  const [step, setStep] = useState(1);
  const [navStep, setNavStep] = useState(step || "");
  const [disabelInput, setDisabelInput] = useState(false);
  const [disabelInputStep2, setDisabelInputStep2] = useState(false);
  const [disabelInputStep4, setDisabelInputStep4] = useState(false);
  const [shouldSetStep, setShouldSetStep] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  // Function to convert status number to text
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "درحال بررسی";
      case 2:
        return "درحال تولید";
      case 3:
        return "درحال ارسال";
      case 4:
        return "تحویل داده شده";
      case 5:
        return "لغو شده";
      default:
        return "سفارشی ثبت نشده";
    }
  };

  useEffect(() => {
    if (currentOrder && shouldSetStep) {
      setStep(currentOrder.step);
      setNavStep(currentOrder.step);
      setShouldSetStep(true);
    }
  }, [currentOrder]);

  const handleNextStep = () => {
    setShouldSetStep(false);
    setUpdateData(true);
    setStep((prevStep) => prevStep + 1);
  };

  const handleSetStep = (step) => {
    setShouldSetStep(false);
    setUpdateData(true);
    setStep(step);
  };

  const handlePreviousStep = () => {
    setShouldSetStep(false);
    setUpdateData(true);
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

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
          <div className={style.stepContent}>
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
          </div>
        );
      case 3:
        return (
          <div>
            <PusherChat
              data={currentOrder.request}
              chatData={currentOrder.chat}
              code={currentOrder.code}
              step={currentOrder.step}
              setNavStep={setNavStep}
              chatImage={currentOrder.chatImage}
              setUpdateData={setUpdateData}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          </div>
        );
      case 4:
        return (
          <StepSixComponent
            finalFactor={currentOrder.payment}
            handleNextStep={handleNextStep}
            setNavStep={setNavStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 5:
        return (
          <div className={style.stepContent}>
            <StepFiveComponent
              data={currentOrder.delivery}
              code={currentOrder.code}
              step={currentOrder.step}
              handleNextStep={handleNextStep}
              setNavStep={setNavStep}
              handlePreviousStep={handlePreviousStep}
              setDisabelInputStep4={setDisabelInputStep4}
              disabelInputStep4={disabelInputStep4}
            />
          </div>
        );
      case 6:
        return (
          <StepSeven
            handleNextStep={handleNextStep}
            currentOrder={currentOrder}
          />
        );
      default:
        return null;
    }
  };

  // Define the chat step number
  const chatStep = 3;
  const finalStep = 6;

  return (
    <section>
      <div
        className={style.mianDiVNvaBarOrder}
      >
        <div className="d-flex flex-row gap-2 align-items-center">
          <p className="discription">شماره سفارش :</p>
          <p className="discription">{currentOrder?.code}</p>
        </div>
        <div>
          <p className="discription">{getStatusText(currentOrder?.status)}</p>
        </div>
      </div>
      <ProcessTracker
        currentStep={step}
        setStep={handleSetStep}
        navStep={navStep}
      />
      {renderStepContent()}
      {step !== chatStep && step !== finalStep && currentOrder && (
        <>
          <button
            type="button"
            onClick={handleOpenChat}
            className={style.DivChatIconMainDiv}
          >
            <ForumOutlinedIcon aria-hidden="true" />
            گفت‌وگو با کارشناس
          </button>
          <Modal
            open={chatOpen}
            onClose={handleCloseChat}
            aria-labelledby="chat-modal-title"
            aria-describedby="chat-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxHeight: "fit-content",
                borderRadius: "4px",
                bgcolor: "background.paper",
                boxShadow: 24,
                padding: "10px",
                overflow: "auto",
              }}
            >
              <PusherChat
                modalChat={true}
                handleCloseChat={handleCloseChat}
                data={currentOrder.request}
                chatData={currentOrder.chat}
                code={currentOrder.code}
                step={currentOrder.step}
                setNavStep={setNavStep}
                setUpdateData={setUpdateData}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            </Box>
          </Modal>
        </>
      )}
    </section>
  );
}
