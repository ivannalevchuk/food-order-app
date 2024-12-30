import Cart from "./components/Cart";
import FoodList from "./components/FoodList";
import Header from "./components/Header";
import {CartContextProvider} from "./contexts/cart-context";
import { ModalProvider } from "./contexts/modal-context";

function App() {
  return (
    <CartContextProvider>
      <ModalProvider>
      <Header />
      <main>
        <FoodList />
      </main>
      <Cart />
      </ModalProvider>
      </CartContextProvider>
  );
}

export default App;
