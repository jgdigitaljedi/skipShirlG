import React from 'react';
import { Router } from '@reach/router';
import logo from './logo.svg';
import './App.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </Router>
    </div>
  );
}

export default App;
