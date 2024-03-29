import { UserReducer } from "./context/UserContext/reducer";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import { UserContext } from "./context/UserContext/userContext";
import Board from "./pages/board/Board";

const Routes = () => {
  const initialState = {
    user: {},
    workspaces: {},
    boards: {},
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/board" exact component={Board} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default Routes;
