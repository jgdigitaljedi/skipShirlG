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
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUser, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserContextProvider } from './context/userContext';

library.add(fab, faUser, faSignInAlt, faSignOutAlt, faUserPlus);

function App(): JSX.Element {
  return (
    <div className="App">
      <UserContextProvider>
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
      </UserContextProvider>
    </div>
  );
}

export default App;
