import React, { useState } from "react";
import UserForm from "./UserForm";
import DrinkSelector from "./DrinkSelector";
import DrinkList from "./DrinkList";
import Result from "./Result";

function App() {
  const [weight, setWeight] = useState(80);
  const [gender, setGender] = useState("male");
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("23:00");

  const [drinks, setDrinks] = useState([]);

  function addDrink(drink) {
    setDrinks([...drinks, drink]);
  }

  function removeDrink(index) {
    setDrinks(drinks.filter((_, i) => i !== index));
  }

  function resetCalculator() {
    setDrinks([]);
    setWeight(80);
    setGender("male");
    setStartTime("20:00");
    setEndTime("23:00");
  }

  // Výpočet BAC (zjednodušený)
  const totalAlcoholGrams = drinks.reduce(
    (sum, drink) => sum + (drink.volume * (drink.alcohol / 100)) * 0.79,
    0
  );

  const r = gender === "male" ? 0.68 : 0.55;

  const bac = totalAlcoholGrams / (weight * r);

  // Čas pití v hodinách
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  let hours = endH + endM / 60 - (startH + startM / 60);
  if (hours < 0) hours += 24; // přes půlnoc

  // Odbourávání 0.15 promile za hodinu
  const burnRate = 0.15;
  const soberInHours = Math.max(0, bac / burnRate - hours);

  return (
    <div className="container">
      <h1>🍺 Alkohol Kalkulačka</h1>

      <UserForm
        weight={weight}
        setWeight={setWeight}
        gender={gender}
        setGender={setGender}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />

      <DrinkSelector addDrink={addDrink} />

      <DrinkList drinks={drinks} removeDrink={removeDrink} />

      <Result bac={bac} hours={soberInHours} />

      <button className="reset-btn" onClick={resetCalculator}>
        🔄 Reset
      </button>
    </div>
  );
}

export default App;