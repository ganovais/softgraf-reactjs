import './App.css';

function App() {
  function handleButtonClicked() {
    const h1 = document.getElementById('title');
    h1.style.color = 'green';
    h1.style.fontSize = '31px';
  }

  return (
    <div className="container">
      <h1 id="title">display flex</h1>
      <button onClick={handleButtonClicked} className="btn">
        Muda cor
      </button>
    </div>
  );
}

export default App;
