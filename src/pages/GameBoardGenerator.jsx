import React, { useState } from "react";
import BackToDashBoard from '../components/BackToDashBoard'
import PrintButton from '../components/PrintButton'
import GameBoard from '../components/GameBoard'

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const GameBoardGenerator = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [heading, setHeading] = useState("Quizz Title");
  const [headingColor, setHeadingColor] = useState("#d71d1d");
  const [textColor, setTextColor] = useState("#ffffff");
  const [startNumber, setStartNumber] = useState("1");
  const [endNumber, setEndNumber] = useState("25");
  const [numberOfGames, setNumberOfGames] = useState("1");
  
  const generateTableValues = (start, end) => {
    const uniqueValues = new Set();
    while (uniqueValues.size < 25) {
      uniqueValues.add(generateRandomNumber(start, end));
    }
    return Array.from(uniqueValues);
  };

  const hasValidInput = () => {
    const start = parseInt(startNumber);
    const end = parseInt(endNumber);

    if (isNaN(start) || isNaN(end) || end - start < 24 || start <= 0 || start <= 0 || numberOfGames <= 0) 
    {
      return false;
    }
    return true;
  };

  return (
    <>
    <BackToDashBoard/>
     <h1>Generate quizz boards</h1>

     {!hasValidInput() && 
     <>
     <div className="error-input">Wrong input. Make sure that difference between numbers are minimum 25 an larger than 0. You need minimum 1 gameboard</div>
     </>}
     

     <div className="split-list-container board-form">
     <div className="split-list-left">
      <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={heading}
            placeholder="Skriv överskrift"
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bg-color">Background color</label>
          <input
            id="bg-color"
            type="color"
            value={headingColor}
            onChange={(e) => setHeadingColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fg-color">Foreground color</label>
          <input
            id="fg-color"
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>
     </div>
     <div className="split-list-right">
      <div className="form-group">
          <label htmlFor="start-number">Start number</label>
          <input
            id="start-number"
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="end-number">End number</label>
          <input
            id="end-number"
            type="number"
            value={endNumber}
            onChange={(e) => setEndNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="boards">Number of boards</label>
          <input
            id="boards"
            type="number"
            value={numberOfGames}
            onChange={(e) => setNumberOfGames(e.target.value)}
          />
        </div>
     </div>
     </div>


    <div>
  
    {hasValidInput() && <><PrintButton/></>}

    {hasValidInput() && 
      Array.from({ length: numberOfGames }).map((_, index) => {
            const tableValues = generateTableValues(parseInt(startNumber), parseInt(endNumber));
            return (
              <GameBoard key={index} headingColor={headingColor} textColor={textColor} tableValues={tableValues} heading={heading} />
            );
          })
    }

    {hasValidInput() && <><PrintButton/></>}

    </div>
    </>
  );
};

export default GameBoardGenerator;