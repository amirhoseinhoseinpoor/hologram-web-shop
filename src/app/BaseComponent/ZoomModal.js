import { Modal, Box } from "@mui/material";
import styled from "styled-components";

const ModalStyle = {
  position: "absolute",
  maxHeight: "90vh",
  maxWidth: "90vw",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  overflow: "auto",
  p: 0,
};

const BOXSTYLE = styled(Box)`
  width: 100%;
  height: auto;
  border-radius: 3px;
`;

export default function ZoomModal({ open, onClose, src, alt }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title2"
      aria-describedby="modal-modal-description2"
    >
      <Box sx={ModalStyle}>
        <BOXSTYLE
          component="img"
          src={src}
          alt={alt}
        />
      </Box>
    </Modal>
  );
}