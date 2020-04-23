import React from 'react';
import { Router } from '@reach/router';
import './App.scss';
import HomeComponent from './Home';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <HomeComponent path="/" />
      </Router>
    </div>
  );
}

export default App;
