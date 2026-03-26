import { useState } from "react";
import drinks from "./drinks";

function DrinkSelector({ addDrink }) {
  const [search, setSearch] = useState("");

  const filtered = drinks.filter((d) =>
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

      <div className="drink-grid">
        {filtered.length === 0 ? (
          <p>Nic nenalezeno</p>
        ) : (
          filtered.map((drink, index) => (
            <button key={index} onClick={() => addDrink(drink)}>
              {drink.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default DrinkSelector;