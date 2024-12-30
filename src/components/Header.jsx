import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../contexts/cart-context";

function Header() {
    const cartCtx = useContext(CartContext);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>Food Delivery</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({cartCtx.amount})</Button>
      </nav>
    </header>
  );
}

export default Header;
