import React from 'react';

const PrintButton = () => {

    const handlePrint = () => {
        window.print();
    };

  return (
    <div className="printversion">
        <button className="button button-green" onClick={handlePrint}>Print</button>
      </div>
  );
};

export default PrintButton;