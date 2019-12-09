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
import useAuth from "../hooks/useAuth";

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={useAuth(Home, null)} />
        <Route path="/login" component={useAuth(Login, null)} />
        <Route path="/register" component={useAuth(Join, null)} />
        <Redirect from="/*" to="/" />
      </Switch>
    </Router>
  );
};
