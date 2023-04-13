import React, { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(color) {
  //If you find a capital letter (even if you find it multiple times), add a space before it
  return color.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const isBtnEnabled = !isBtnDisabled ? false : true;
  const newBtnColor =
    buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  return (
    <div className='App'>
      <button
        style={{
          backgroundColor: isBtnDisabled ? 'gray' : buttonColor,
          color: isBtnDisabled ? 'black' : 'white',
        }}
        disabled={isBtnEnabled}
        onClick={() => setButtonColor(newBtnColor)}
      >
        Change to {replaceCamelWithSpaces(newBtnColor)}
      </button>
      <input
        id='disable-btn-checkbox'
        type='checkbox'
        defaultChecked={isBtnDisabled}
        onChange={(e) => setIsBtnDisabled(e.target.checked)}
      />
      <label htmlFor='disable-btn-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
