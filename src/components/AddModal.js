import React from "react";
import Modal from "react-modal";

const AddModal = props => (
  <Modal
    isOpen={!!props.addingWidget}
    contentLabel="test"
    onRequestClose={props.handleModal}
  >
    <p>
      <button onClick={props.addNashDistance}>Add Nash Distance widgets</button>
    </p>
    <p>
      <button onClick={props.addPathAllocationWidget}>
        Add Path Allocation widgets
      </button>
    </p>

    <button onClick={props.handleModal}>Close Modal</button>
  </Modal>
);

export default AddModal;
