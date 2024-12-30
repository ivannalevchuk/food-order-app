import FoodList from "./components/FoodList";
import Header from "./components/Header";
import {CartContextProvider} from "./contexts/cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <FoodList />
      </main>
      </CartContextProvider>
  );
}

export default App;
