import React, { useState } from "react";


const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GameBoardGenerator = () => {
  const [heading, setHeading] = useState("");
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  const [tableValues, setTableValues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (
      isNaN(start) ||
      isNaN(end) ||
      end - start < 24 ||
      start <= 0 ||
      start <= 0
    ) {
      alert(
        "Fel input. Se till att skillnad mellan talen är minst 25 enhet och är större än 0"
      );
      return;
    }

    const uniqueValues = new Set();

    while (uniqueValues.size < 25) {
      uniqueValues.add(generateRandomNumber(start, end));
    }

    console.log("uniqueValues", uniqueValues);

    setTableValues(Array.from(uniqueValues));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <label>
          Överskrift:
          <input
            type="text"
            value={heading}
            placeholder="Skriv överskrift"
            onChange={(e) => setHeading(e.target.value)}
          />
        </label>
        <br />
        <label>
          Startnummer:
          <input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Slutnummer:
          <input
            type="number"
            value={endNumber}
            onChange={(e) => setEndNumber(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Generera spelplan</button>
      </form>
      <table>
        <thead>
          <tr>
            <th colSpan="5">{heading}</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(5)].map((_, colIndex) => (
                <td key={colIndex}>{tableValues[rowIndex * 5 + colIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div class="printversion">
        <button onClick={handlePrint}>Skriv ut</button>
      </div>
    </div>
  );
};

export default GameBoardGenerator;