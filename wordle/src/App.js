import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Instructions from './home/instructions';
import Game from './home/game';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Instructions/>
          <Game/>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
      </header>
    </div>
  );
}

export default App;
