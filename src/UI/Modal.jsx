import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "" }) {
  const modalRef = useRef();
  useEffect(() => {
    console.log(open);
    if (open) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog className={`modal ${className}`} ref={modalRef}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
