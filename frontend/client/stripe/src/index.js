import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router';

import Checkout from './components/Checkout';
import Success from './components/Success';
import Canceled from './components/Canceled';

import './css/normalize.css';
import './css/module.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/success.html">
          <Success />
        </Route>
        <Route path="/canceled.html">
          <Canceled />
        </Route>
        <Route path="/">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));