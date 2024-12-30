import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../contexts/cart-context";
import ModalContext from "../contexts/modal-context";

function Header() {
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);

    function openCartHandler() {
        modalCtx.openCart();
    }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>Food Delivery</h1>
      </div>
      <nav>
        <Button onClick = {openCartHandler}textOnly>Cart ({cartCtx.amount})</Button>
      </nav>
    </header>
  );
}

export default Header;
