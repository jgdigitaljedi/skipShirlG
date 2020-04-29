import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './Home';
import Gallery from './Gallery';
import Slideshow from './Slideshow';
import UserCP from './UserCP';
import Navbar from './components/Navbar/Navbar';
import Login from './Login';
import history from './utils/history';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/gallery">
            <Gallery path="/gallery" />
          </Route>
          <Route path="/slideshow">
            <Slideshow path="/slideshow" />
          </Route>
          <Route path="/user/:userId">
            <UserCP path="/user/:userId" />
          </Route>
          <Route path="/login">
            <Login path="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
