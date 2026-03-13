import React, { useState } from "react";
import "./App.css";

import UserForm from "./components/UserForm.jsx";
import DrinkSelector from "./components/DrinkSelector.jsx";
import DrinkList from "./components/DrinkList.jsx";
import Result from "./components/Result.jsx";

function App() {
  // osobní údaje
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState("male");
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("22:00");

  // seznam drinků
  const [drinks, setDrinks] = useState([]);

  // přidání drinku do seznamu
  function addDrink(drink) {
    setDrinks([...drinks, drink]);
  }

  // odstranění drinku
  function removeDrink(index) {
    setDrinks(drinks.filter((_, i) => i !== index));
  }

  // aktualizace objemu drinku
  function updateDrinkVolume(index, volume) {
  setDrinks((prevDrinks) => {
    const newDrinks = [...prevDrinks];
    newDrinks[index] = { ...newDrinks[index], volume: volume };
    return newDrinks;
  });
}

  // reset kalkulačky
  function resetCalculator() {
    setDrinks([]);
    setWeight(80);
    setGender("male");
    setStartTime("20:00");
    setEndTime("23:00");
  }

  // výpočet BAC
  const totalAlcoholGrams = drinks.reduce(
    (sum, drink) => sum + (drink.volume * (drink.alcohol / 100)) * 0.79,
    0
  );

  const r = gender === "male" ? 0.68 : 0.55;
  const bac = totalAlcoholGrams / (weight * r);

  // čas pití v hodinách
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  let hours = endH + endM / 60 - (startH + startM / 60);
  if (hours < 0) hours += 24;

  // odbourávání alkoholu
  const burnRate = 0.15;
  const soberInHours = Math.max(0, bac / burnRate - hours);

  return (
    <div className="container">
      <h1>Alkohol Kalkulačka</h1>

      <div className="card">
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
      </div>

      <div className="card">
        <DrinkSelector addDrink={addDrink} />
      </div>

      <div className="card">
        <DrinkList
          drinks={drinks}
          removeDrink={removeDrink}
          updateDrinkVolume={updateDrinkVolume}
        />
      </div>

      <div className="card">
        <Result bac={bac} hours={soberInHours} />
      </div>

      <button className="reset-btn" onClick={resetCalculator}>
        Reset
      </button>
    </div>
  );
}

export default App;