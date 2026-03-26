function DrinkList({ drinks, removeDrink, updateDrinkVolume }) {
  return (
    <div>
      <h3>Vypité drinky</h3>

      <ul>
        {drinks.map((drink, index) => (
          <li key={index} className="drink-item">
            <span>{drink.name} –</span>

            <input
              type="number"
              className="drink-volume-input"
              value={drink.volume}
              onChange={(e) =>
                updateDrinkVolume(index, e.target.value)
              }
            />

            <span>ml</span>

            <button
              className="remove"
              onClick={() => removeDrink(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrinkList;