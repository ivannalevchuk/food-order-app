import { useEffect, useState, useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import CartContext from "../contexts/cart-context";

function FoodList() {
  const cartCtx = useContext(CartContext);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        setMeals(data);
      } catch (error) {
        console.log("Error:", error.message);
      }
    }

    fetchMeals();
  }, []);

  function handleAddToCart(meal) {
    cartCtx.addItem(meal);
}

  return (
    <div>
      <ul id="meals">
        {meals.map((meal) => (
          <li className="meal-item" key={meal.id}>
            <article>
              <img
                src={`http://localhost:3000/${meal.image}`}
                alt={meal.name}
              />
              <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">
                  {currencyFormatter.format(meal.price)}
                </p>
                <p className="meal-item-description">{meal.description}</p>
              </div>
              <p className="meal-item-actions">
                <Button onClick = {() => handleAddToCart(meal)}>Add to Cart</Button>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;
