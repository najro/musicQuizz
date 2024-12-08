import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameBoard = ({ headingColor, textColor, tableValues, heading, index }) => {

 
  return (
    <>
    <div className={`table-container ${index === 0 ? 'first' : ''}`}>
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
      </div>
    </>
  );
};

export default GameBoard;