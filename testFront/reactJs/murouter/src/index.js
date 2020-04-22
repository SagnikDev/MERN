import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import User from "./User";
import Visit from "./Visit";
import NotFound from "./notfound";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
  <div>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/user">User</Link></li>
    <li><Link to="/visit">Visit</Link></li>
  </ul>
  </div>

    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route path="/user" component={User}></Route>
      <Route path="/Visit" component={Visit}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
