import { Modal, Box, Button as MUIButton, Typography } from "@mui/material";
import styled, { keyframes } from "styled-components";
import LoadingCss from "./LoadingCss";

const TYPOGRAPHY = styled(Typography)`
  font-family: unset !important;
  font-size: 17px !important;
  text-align: center;
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

const scaleWarning = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const pulseWarning = keyframes`
  0% {
    background-color: #fff;
    transform: scale(1);
    opacity: 0.5;
  }
  30% {
    background-color: #fff;
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    background-color: #F8BB86;
    transform: scale(2);
    opacity: 0;
  }
`;

const pulseWarningIns = keyframes`
  0% {
    background-color: #F8D486;
  }
  100% {
    background-color: #F8BB86;
  }
`;

const WarningIconContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 4px solid #f8bb86;
  border-radius: 50%;
  box-sizing: content-box;
  margin: 20px auto;
  animation: ${scaleWarning} 0.75s infinite alternate;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0;
    animation: ${pulseWarning} 2s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 50%;
    z-index: 1;
  }
`;

const WarningBody = styled.span`
  position: absolute;
  left: 50%;
  top: 10px;
  width: 5px;
  height: 47px;
  background-color: #f8bb86;
  border-radius: 2px;
  margin-left: -2px;
  z-index: 2;
  animation: ${pulseWarningIns} 0.75s infinite alternate;
`;

const WarningDot = styled.span`
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 7px;
  height: 7px;
  background-color: #f8bb86;
  border-radius: 50%;
  margin-left: -3px;
  z-index: 2;
  animation: ${pulseWarningIns} 0.75s infinite alternate;
`;

export default function AreYouShureModal({
  open,
  onClose,
  text,
  func,
  loading = false,
}) {
  return (
    <section>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <WarningIconContainer>
            <WarningBody />
            <WarningDot />
          </WarningIconContainer>

          <div style={{ marginTop: "20px" }}>
            <TYPOGRAPHY id="modal-modal-description" sx={{ mt: 2 }}>
              {text}
            </TYPOGRAPHY>
            <div className="d-flex justify-content-end">
              <MUIButton
                variant="contained"
                onClick={onClose}
                color="error"
                style={{
                  marginLeft: "10px",
                  fontFamily: "unset",
                  marginTop: "20px",
                }}
              >
                لغو
              </MUIButton>
              <MUIButton
                style={{
                  fontFamily: "unset",
                  marginTop: "20px",
                  backgroundColor: "#43A047",
                }}
                variant="contained"
                onClick={func}
              >
                {loading ? (
                  <>
                    <LoadingCss />
                  </>
                ) : (
                  <>تایید</>
                )}
              </MUIButton>
            </div>
          </div>
        </Box>
      </Modal>
    </section>
  );
}
