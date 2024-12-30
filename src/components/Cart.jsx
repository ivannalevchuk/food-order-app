import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../contexts/cart-context";
import ModalContext from "../contexts/modal-context";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";

function Cart() {
  const cartCtx = useContext(CartContext);
  const modalCtx = useContext(ModalContext);


  const totalAmount = cartCtx.mealItems.reduce((acc, item) => {
    return acc + item.price * item.amount;
  }, 0);

  function closeModalHandler() {
    modalCtx.closeCart();
  }

  return (
    <Modal className="cart" open = {modalCtx.progress === 'cart'}>
      <h2>Cart</h2>
      <ul>
        {cartCtx.mealItems.map((item) => (
          <li key={item.id} className="cart-item">
            {item.name} - {item.amount}
            <span > <strong>{currencyFormatter.format(item.price * item.amount)}</strong></span>
          </li>
        ))}
      </ul>
      <p className="cart-total">
        Total: {currencyFormatter.format(totalAmount)}
      </p>
      <p className="cart-actions">
        <Button textOnly onClick = {closeModalHandler}>Close</Button>
        <Button>Order</Button>
      </p>
    </Modal>
  );
}

export default Cart;
