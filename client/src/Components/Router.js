import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import Login from "../Routes/Login";
import Join from "../Routes/Join";

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
        <Redirect from="/*" to="/" />
      </Switch>
    </Router>
  );
};
