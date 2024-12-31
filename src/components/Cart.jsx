import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../contexts/cart-context";
import ModalContext from "../contexts/modal-context";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import Checkout from "./Checkout";

function Cart() {
  const cartCtx = useContext(CartContext);
  const modalCtx = useContext(ModalContext);

  const totalAmount = cartCtx.mealItems.reduce((acc, item) => {
    return acc + item.price * item.amount;
  }, 0);

  function closeModalHandler() {
    modalCtx.closeCart();
  }

  function orderHandler() {
    modalCtx.openCheckout();
  }

  return (
    <Modal
      className="cart"
      open={modalCtx.progress === "cart"}
      onClose={modalCtx.progress === "cart" ? closeModalHandler : null}
    >
      <h2>Cart</h2>
      {cartCtx.mealItems.length === 0 && (
        <p className="cart-item">No items in cart.</p>
      )}
      <ul>
        {cartCtx.mealItems.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - {item.amount} x{" "}
              {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => cartCtx.removeItem(item.id)}>−</button>
              <span>
                {" "}
                <strong>
                  {currencyFormatter.format(item.price * item.amount)}
                </strong>
              </span>
              <button onClick={() => cartCtx.addItem(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">
        Total: {currencyFormatter.format(totalAmount)}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={closeModalHandler}>
          Close
        </Button>
        {cartCtx.mealItems.length > 0 && (
          <Button onClick={orderHandler}>Order</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
