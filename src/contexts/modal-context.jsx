import { createContext, useState } from "react";

const ModalContext = createContext({
  progress: "", //cart, checkout
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

function ModalProvider({ children }) {
  const [modalState, setModalState] = useState("");

  function openModal(modalType) {
    if (modalType === "cart") {
      setModalState("cart");
    } else if (modalType === "checkout") {
      setModalState("checkout");
    }
  }

  function closeModal() {
    setModalState('');
  }
  const modalContext = {
    progress: modalState,
    openCart: openModal.bind(null, "cart"),
    closeCart: closeModal,
    openCheckout: openModal.bind(null, "checkout"),
    closeCheckout: closeModal,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;

export { ModalProvider };
