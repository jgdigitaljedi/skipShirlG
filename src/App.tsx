import React from 'react';
import { Router } from '@reach/router';
import './App.scss';
import Home from './Home';
import Gallery from './Gallery';
import Slideshow from './Slideshow';
import UserCP from './UserCP';
import Navbar from './components/Navbar/Navbar';
import Login from './Login';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Home path="/" />
        <Gallery path="/gallery" />
        <Slideshow path="/slideshow" />
        <UserCP path="/user/:userId" />
        <Login path="/login" />
      </Router>
    </div>
  );
}

export default App;
