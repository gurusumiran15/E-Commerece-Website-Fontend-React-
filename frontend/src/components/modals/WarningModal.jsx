import Modal from "./Modal";

export default function WarningModal(props) {
  const { isOpen, message, onConfirm, onCancel, title } = props;

  return (
    <Modal isOpen={isOpen}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <hr />
          <p className="card-text">{message}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-light" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-dark" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
