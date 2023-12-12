import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

export default function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={styles["modal-backdrop"]} />
          <div className={styles["modal-container"]}>{children}</div>
        </>,
        document.getElementById("modal")
      )}
    </>
  );
}
