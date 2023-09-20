import Modal from "@mui/material/Modal";

const formStyles = {
  display: "flex",
  flexDirection: "column",
  width: "60%",
  minHeight: "fit-content",
  border: "2px solid #000",
  boxShadow: 24,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  m: 1,
  p:2,
  justifyContent: "space-between",
  "& .MuiTextField-root": {
    p: 2,
  },
}

export default function FormModal({ showModal, handleModalClose, ModalForm }) {
  return (
    <Modal
      open={showModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        
      }}
    >
      <>
        <ModalForm formStyles={formStyles}/>
        </>
    </Modal>
  );
}
