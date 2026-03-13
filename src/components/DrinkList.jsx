function DrinkList({ drinks, removeDrink, updateDrinkVolume }) {
  return (
    <div>
      <h3>Vypité drinky</h3>

      <ul>
        {drinks.map((drink, index) => (
          <li key={index}>
            <span>{drink.name} – </span>

            <input
              type="number"
              value={drink.volume || ""}   // pokud je 0, zobraz prázdné
              placeholder="ml"
              onChange={(e) => {
                const val = Number(e.target.value);
                updateDrinkVolume(index, val);
              }}
              style={{ width: "60px", marginRight: "10px" }}
            />

            <button className="remove" onClick={() => removeDrink(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrinkList;