import { useState } from "react";
import drinks from "./drinks";

function DrinkSelector({ addDrink }) {

  const [search, setSearch] = useState("");

  const filtered = drinks.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3>Přidat alkohol</h3>

      <input
        placeholder="Vyhledat drink..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="drinkGrid">
        {filtered.map((drink, index) => (
          <button
            key={index}
            onClick={() =>
              addDrink({
                name: drink.name,
                alcohol: drink.alcohol,
                volume: 0
              })
            }
          >
            {drink.name} ({drink.alcohol}%)
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrinkSelector;