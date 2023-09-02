import Modal from '@mui/material/Modal';

export default function FormModal({showModal, handleModalClose, ModalForm}) {

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div><ModalForm /></div>
      </Modal>
    </div>
  );
}