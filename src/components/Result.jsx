import React from "react";

function Result({ bac, hours }) {
  return (
    <div className="card result">
      <h2>📊 Výsledek</h2>
      <p>Odhad promile: {bac.toFixed(2)} ‰</p>
      <p>Střízlivý přibližně za: {hours.toFixed(1)} hodin</p>
    </div>
  );
}

export default Result;