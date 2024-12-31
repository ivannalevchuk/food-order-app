import { useEffect, useState, useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "../UI/Button";
import CartContext from "../contexts/cart-context";
import useHttp from "./hooks/usehttp";
import Error from "./Error";

const requestConfig = {};

function FoodList() {
  const cartCtx = useContext(CartContext);


  const { data: meals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p style={{textAlign: "center"}}>Loading meals...</p>;
  }

  if (error) {
    return <Error message={error} title = "Failed to load meals."/>
  }

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
