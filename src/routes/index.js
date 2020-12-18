import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import Login from "../screens/Login";
import ApplyVaccine from "../screens/ApplyVaccine";
import NotFound from "../screens/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/sign-in" />
      </Route>
      <PrivateRoute component={ApplyVaccine} exact path="/apply" />
      <Route component={Login} exact path="/sign-in" />
      <Route component={NotFound} exact path="/not-found" />
    </Switch>
  );
};

export default Routes;
