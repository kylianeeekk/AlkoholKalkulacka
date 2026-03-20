function Result({ bac, hours }) {
  return (
    <div className="result">
      <h2>Výsledek</h2>
      <div className="bac">{bac.toFixed(2)} ‰</div>
      <div className="time">
        Střízlivý za cca {hours.toFixed(1)} h
      </div>
    </div>
  );
}

export default Result;