import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToDashBoard = () => {

  const navigate = useNavigate(); // Initialize the navigate hook
  
  return (
    <>
    <div>
        <button className="back-button" onClick={() => navigate('/')}>
        ⬅ Back to Main Menu
        </button>
    </div>
    </>
  );
};

export default BackToDashBoard;