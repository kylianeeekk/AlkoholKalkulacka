import React, { useState } from "react";
import "./App.css";

import UserForm from "./components/UserForm.jsx";
import DrinkSelector from "./components/DrinkSelector.jsx";
import DrinkList from "./components/DrinkList.jsx";
import Result from "./components/Result.jsx";

function App() {
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState("male");
  const [startTime, setStartTime] = useState("20:00");
  const [endTime, setEndTime] = useState("22:00");

  const [drinks, setDrinks] = useState([]);

  function addDrink(drink) {
    setDrinks([...drinks, drink]);
  }

  function removeDrink(index) {
    setDrinks(drinks.filter((_, i) => i !== index));
  }

  function updateDrinkVolume(index, volume) {
    setDrinks((prevDrinks) => {
      const newDrinks = [...prevDrinks];
      newDrinks[index] = {
        ...newDrinks[index],
        volume: Number(volume),
      };
      return newDrinks;
    });
  }


  function resetCalculator() {
    setDrinks([]);
    setWeight(80);
    setGender("male");
    setStartTime("20:00");
    setEndTime("23:00");
  }

  const totalAlcoholGrams = drinks.reduce((sum, drink) => {
    const volumeMl = Number(drink.volume);
    const alcoholPercent = Number(drink.alcohol);

    return sum + volumeMl * (alcoholPercent / 100) * 0.79;
  }, 0);

  const r = gender === "male" ? 0.68 : 0.55;
  const bacRaw = totalAlcoholGrams / (weight * r);

  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  let diffMinutes = endMinutes - startMinutes;
  if (diffMinutes < 0) diffMinutes += 24 * 60;

  const hours = diffMinutes / 60;

  const burnRate = 0.15;

  const currentBac = Math.max(0, bacRaw - burnRate * hours);

  const soberInHours = currentBac / burnRate;

  const totalTimeToSober = bacRaw / burnRate;

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
        <Result
          bac={currentBac}
          hours={soberInHours}
          totalTime={totalTimeToSober}
        />
      </div>

      <button className="reset-btn" onClick={resetCalculator}>
        Reset
      </button>
    </div>
  );
}

export default App;