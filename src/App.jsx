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

  // přidání drinku
  function addDrink(drink) {
    setDrinks([...drinks, drink]);
  }

  // odstranění drinku
  function removeDrink(index) {
    setDrinks(drinks.filter((_, i) => i !== index));
  }

  // změna objemu
  function updateDrinkVolume(index, volume) {
    setDrinks((prevDrinks) => {
      const newDrinks = [...prevDrinks];
      newDrinks[index] = {
        ...newDrinks[index],
        volume: Number(volume), // jistota že je číslo
      };
      return newDrinks;
    });
  }

  // reset
  function resetCalculator() {
    setDrinks([]);
    setWeight(80);
    setGender("male");
    setStartTime("20:00");
    setEndTime("23:00");
  }

  // 🧠 VÝPOČET ALKOHOLU (gramy)
  const totalAlcoholGrams = drinks.reduce((sum, drink) => {
    const volumeMl = Number(drink.volume); // MUSÍ být v ml
    const alcoholPercent = Number(drink.alcohol);

    return sum + volumeMl * (alcoholPercent / 100) * 0.79;
  }, 0);

  // 🧠 Widmarkův vzorec
  const r = gender === "male" ? 0.68 : 0.55;
  const bacRaw = totalAlcoholGrams / (weight * r);

  // 🧠 ČAS PITÍ
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  let hours = endH + endM / 60 - (startH + startM / 60);
  if (hours < 0) hours += 24;

  // 🧠 ODBOURÁVÁNÍ
  const burnRate = 0.15; // ‰ za hodinu

  // aktuální BAC po odečtení času
  const currentBac = Math.max(0, bacRaw - burnRate * hours);

  // kolik hodin do vystřízlivění OD TEĎ
  const soberInHours = currentBac / burnRate;

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
        <Result bac={currentBac} hours={soberInHours} />
      </div>

      <button className="reset-btn" onClick={resetCalculator}>
        Reset
      </button>
    </div>
  );
}

export default App;