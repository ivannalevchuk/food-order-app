import Modal from "../UI/Modal";
import { useContext, useState, useActionState } from "react";
import ModalContext from "../contexts/modal-context";
import CartContext from "../contexts/cart-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { currencyFormatter } from "../util/formatting";
import useHttp from "./hooks/usehttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const modalCtx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);
  const [isOrderSent, setIsOrderSent] = useState(false);

  const totalAmount = cartCtx.mealItems.reduce((acc, item) => {
    return acc + item.price * item.amount;
  }, 0);

  const {
    data,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig, []);



  function closeModalHandler() {
    modalCtx.closeCheckout();
  }

  function finishCheckout() {
    cartCtx.clearCart();
    modalCtx.closeCheckout();
    setIsOrderSent(false);
  }

  async function checkoutAction(prevFormData, formData) {

    const customerData = Object.fromEntries(formData.entries()); // {name: "John Doe", ...}

    await sendRequest({
      order: { items: cartCtx.mealItems, customer: customerData },
    });

    if (!error) {
      setIsOrderSent(true);
    }
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null);

  if (isOrderSent) {
    return (
      <Modal
        open={modalCtx.progress === "checkout"}
        onClose={closeModalHandler}
      >
        <h2>Order received!</h2>
        <p>Your order has been received.</p>
        <div className="modal-actions">
          <Button onClick={finishCheckout}>Close</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={modalCtx.progress === "checkout"}
      onClose={closeModalHandler}
    >
      <h2>Checkout</h2>
      <p>Total amount: {currencyFormatter.format(totalAmount)}</p>
      <form action={formAction}>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="number" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error message={error} title="Failed to send order." />}
        <div className="modal-actions">
          {isSending ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <Button type="button" textOnly onClick={closeModalHandler}>
                Cancel
              </Button>
              <Button>Confirm</Button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default Checkout;
