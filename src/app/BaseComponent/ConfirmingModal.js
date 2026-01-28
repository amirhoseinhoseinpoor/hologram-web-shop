import { Modal, Box } from "@mui/material";
import styled, { keyframes } from "styled-components";

const animateSuccessLong = keyframes`  
  0% {  
    width: 0;  
    right: 46px;  
    top: 54px;  
  }  
  65% {  
    width: 0;  
    right: 46px;  
    top: 54px;  
  }  
  84% {  
    width: 55px;  
    right: 0;  
    top: 35px;  
  }  
  100% {  
    width: 47px;  
    right: 8px;  
    top: 38px;  
  }  
`;

const animateSuccessTip = keyframes`  
  0% {  
    width: 0;  
    left: 1px;  
    top: 19px;  
  }  
  54% {  
    width: 0;  
    left: 1px;  
    top: 19px;  
  }  
  70% {  
    width: 50px;  
    left: -8px;  
    top: 37px;  
  }  
  84% {  
    width: 17px;  
    left: 21px;  
    top: 48px;  
  }  
  100% {  
    width: 25px;  
    left: 14px;  
    top: 45px;  
  }  
`;

const rotatePlaceholder = keyframes`  
  0% {  
    transform: rotate(-45deg);  
  }  
  5% {  
    transform: rotate(-45deg);  
  }  
  12% {  
    transform: rotate(-405deg);  
  }  
  100% {  
    transform: rotate(-405deg);  
  }  
`;

// Styled component
const ConfirmAnimation = styled.div`
  width: 82px;
  height: 80px;
  position: relative;

  .swal-icon--success__ring {
    width: 80px;
    height: 80px;
    border: 4px solid hsla(98, 55%, 69%, 0.2);
    border-radius: 50%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 2;
  }

  .swal-icon--success__line {
    background-color: #a5dc86;
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 2;
  }

  .swal-icon--success__line--tip {
    animation: ${animateSuccessTip} 0.75s forwards;
    height: 5px; /* Ensure it has a height */
    left: 14px;
    top: 46px;
    transform: rotate(45deg);
  }

  .swal-icon--success__line--long {
    animation: ${animateSuccessLong} 0.75s forwards;
    height: 5px; /* Ensure it has a height */
    right: 8px;
    top: 38px;
    transform: rotate(-45deg);
  }

  &::before {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    border: 4px solid #fff;
    border-radius: 50%;
    z-index: 1;
    animation: ${rotatePlaceholder} 4.25s ease-in forwards;
  }
`;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ConfirmingModal({ open, onClose, text }) {
  return (
    <section>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="w-100 d-flex justify-content-center">
            <ConfirmAnimation>
              <div className="swal-icon--success__ring" />
              <span className="swal-icon--success__line swal-icon--success__line--long" />
              <span className="swal-icon--success__line swal-icon--success__line--tip" />
            </ConfirmAnimation>
          </div>
          <p className="mt-3 text-center">{text}</p>
        </Box>
      </Modal>
    </section>
  );
}
