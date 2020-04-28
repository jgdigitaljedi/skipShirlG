import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MemoryRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <MemoryRouter>
    <Route component={App} />
  </MemoryRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
