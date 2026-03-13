function Result({ bac, hours }) {
  return (
    <div className="result">
      <p>Promile: <strong>{bac.toFixed(2)}</strong></p>
      <p>Střízlivý za: <strong>{hours.toFixed(1)} h</strong></p>
    </div>
  );
}

export default Result;