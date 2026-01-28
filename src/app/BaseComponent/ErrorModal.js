import { Modal, Box, Button as MUIButton, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";

const TYPOGRAPHY = styled(Typography)`
  font-family: unset !important;
  font-size: 17px !important;
  text-align:center;
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

const colorRed = "#F27474";
const circleSize = "60px";

const successAnim = keyframes`
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const circleAnim = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1.1);
  }
`;



const Container = styled.div`
  
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  position: relative;
`;

const circleStyles = `
  width: ${circleSize};
  height: ${circleSize};
  border-radius: 50%;
`;

const CircleBorder = styled.div`
  ${circleStyles}
  z-index: 0;
  position: absolute;
  transform: scale(1.1);
  animation: ${circleAnim} 400ms ease;
  background: ${colorRed};
`;

const Circle = styled.div`
  ${circleStyles}
  z-index: 1;
  position: relative;
  background: white;
  transform: scale(1);
  animation: ${successAnim} 700ms ease;
`;

const Error = styled.div`
  &::before,
  &::after {
    content: "";
    display: block;
    height: 4px;
    background: ${colorRed};
    position: absolute;
    width: 40px;
    top: 48%;
    left: 16%;
  }

  &::before {
    transform: rotateZ(50deg);
  }

  &::after {
    transform: rotateZ(-50deg);
  }
`;

export default function ErrorModal({ open, onClose, text }) {
  return (
    <section>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <Box sx={modalStyle}>
          
            <Container>
              <CircleBorder />
              <Circle>
                <Error />
              </Circle>
            </Container>
          

          <TYPOGRAPHY id="modal-modal-title2" variant="h6" component="h2">
            {text}
          </TYPOGRAPHY>

          <div style={{ marginTop: "20px", textAlign: "end" }}>
            <MUIButton
              variant="contained"
              onClick={onClose}
              style={{ marginLeft: "10px", fontFamily: "unset" }}
            >
              تایید
            </MUIButton>
          </div>
        </Box>
      </Modal>
    </section>
  );
}
