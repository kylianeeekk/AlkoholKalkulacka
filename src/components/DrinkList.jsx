import React from "react";

function DrinkList({ drinks, removeDrink }) {
  return (
    <div className="card">
      <h2>📋 Vypité drinky</h2>
      {drinks.length === 0 && <p>Žádné drinky</p>}
      <ul>
        {drinks.map((drink, index) => (
          <li key={index}>
            {drink.name}
            <button className="remove" onClick={() => removeDrink(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrinkList;