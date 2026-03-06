import React from "react";

function UserForm({
  weight,
  setWeight,
  gender,
  setGender,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  return (
    <div className="card">
      <h2>👤 Uživatel</h2>

      <label>Váha (kg)</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <label>Pohlaví</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Muž</option>
        <option value="female">Žena</option>
      </select>

      <label>Začátek pití</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <label>Konec pití</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
  );
}

export default UserForm;