import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Home from "./pages/home/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </Router>
  );
};

export default Routes;
