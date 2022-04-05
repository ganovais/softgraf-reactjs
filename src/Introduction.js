import { useState } from 'react';
import './App.css';

export function Introduction() {
  const [inputText, setInputText] = useState('Softgraf');
  const [age, setAge] = useState(0);

  function handleButtonClicked() {
    const h1 = document.getElementById('title');
    h1.style.color = 'green';
    h1.style.fontSize = '31px';
  }

  return (
    <div className="container">
      <div>
        <h1 id="title">display flex</h1>
        <button onClick={handleButtonClicked} className="btn">
          Muda cor
        </button>
      </div>

      <div>
        <input
          onChange={(event) => {
            const color = event.target.value;
            setInputText(color);

            const h1 = document.getElementById('title');
            h1.style.color = color;
          }}
          type="color"
        />
        <h3>{inputText}</h3>
      </div>

      <div>
        <input
          onChange={(event) => {
            setAge(event.target.value);
          }}
          type="number"
          placeholder="Idade"
        />
        <h3>{age}</h3>
      </div>
    </div>
  );
}
