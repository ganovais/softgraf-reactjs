import { useState } from 'react';
import './App.css';
import { Introduction } from './Introduction';

function App() {
  const [inputText, setInputText] = useState('Softgraf');
  const [age, setAge] = useState(0);

  function handleButtonClicked() {
    const h1 = document.getElementById('title');
    h1.style.color = 'green';
    h1.style.fontSize = '31px';
  }

  return <Introduction />;
}

export default App;
