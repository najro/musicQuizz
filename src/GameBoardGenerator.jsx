import React, { useState } from "react";


const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GameBoardGenerator = () => {
  const [heading, setHeading] = useState("Heading");
  const [headingColor, setHeadingColor] = useState("#d71d1d");
  const [textColor, setTextColor] = useState("#ffffff");
  const [startNumber, setStartNumber] = useState("1");
  const [endNumber, setEndNumber] = useState("25");
  const [numberOfGames, setNumberOfGames] = useState("10");
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
      start <= 0 ||
      numberOfGames <= 0
    ) {
      alert(
        "Wrong input. Make sure that difference between numbers are minimum 25 an larger than 0. You need minimum 1 gameboard"
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
          Title
          <input
            type="text"
            value={heading}
            placeholder="Skriv överskrift"
            onChange={(e) => setHeading(e.target.value)}
          />
        </label>
        <br />
        <label>
          Background color
          <input
            type="color"
            value={headingColor}
            onChange={(e) => setHeadingColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Foreground color
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
        <br />
        
        <label>
          Start number
          <input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          End number
          <input
            type="number"
            value={endNumber}
            onChange={(e) => setEndNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number of boards
          <input
            type="number"
            value={numberOfGames}
            onChange={(e) => setNumberOfGames(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Generate game board</button>
      </form>
      <table>
        <thead>
          <tr style={{ backgroundColor: headingColor, padding: "10px", marginTop: "10px" }}>
            <th style={{color: textColor}} colSpan="5">{heading}</th>
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
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default GameBoardGenerator;