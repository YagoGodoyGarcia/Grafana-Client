import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import './style/css/responsive.css';
import './style/css/generic.css';
import './style/css/normalize.css';
import './style/css/default.css';
// import './style/css/cliente.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage  from './LoginPage'
//import Welcome from './components/welcome'
import Home  from './home'

import * as serviceWorker from "./serviceWorker";
import { Router, Route, browserHistory } from "react-router";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LoginPage} />
    <Route path="/home" component={Home}>
      {/* <Route path="/home/welcome" component={Welcome} /> */}
    </Route>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
