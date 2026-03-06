import React, { useState } from "react";

const alcohols = [
  { name: "Pivo 0.5l", volume: 500, alcohol: 5 },
  { name: "Víno 0.2l", volume: 200, alcohol: 12 },
  { name: "Panák vodka", volume: 40, alcohol: 40 },
  { name: "Jägerbomb", volume: 80, alcohol: 25 },
];

function DrinkSelector({ addDrink }) {
  const [search, setSearch] = useState("");

  const filtered = alcohols.filter((drink) =>
    drink.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>🍹 Přidat drink</h2>

      <input
        placeholder="Hledat nápoj..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="drinkGrid">
        {filtered.map((drink, index) => (
          <button key={index} onClick={() => addDrink(drink)}>
            {drink.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrinkSelector;