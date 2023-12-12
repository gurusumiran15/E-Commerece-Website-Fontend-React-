import Modal from "./Modal";

export default function NoticeModal(props) {
  const { isOpen, message, onClose, title } = props;

  return (
    <Modal isOpen={isOpen}>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <hr />
          <p className="card-text">{message}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-dark" onClick={onClose}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
