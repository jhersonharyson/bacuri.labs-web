import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import Login from "../screens/Login";
import ApplyVaccine from "../screens/ApplyVaccine";
import Campaign from "../screens/Campaign";
import History from "../screens/History";
import NotFound from "../screens/NotFound";
import AuthService from "../services/AuthService";

import MainLayout from "../layouts/MainLayout";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        {!AuthService.isAuthenticated() && <Redirect to="/sign-in" />}
        {AuthService.isAuthenticated() && <Redirect to="/apply" />}
      </Route>
      <PrivateRoute
        component={ApplyVaccine}
        exact
        path="/apply"
        layout={MainLayout}
      />
      <PrivateRoute
        component={Campaign}
        exact
        path="/campaign"
        layout={MainLayout}
      />
      <PrivateRoute
        component={History}
        exact
        path="/history"
        layout={MainLayout}
      />
      <Route component={Login} exact path="/sign-in" />
      <Route component={NotFound} exact path="/not-found" />
    </Switch>
  );
};

export default Routes;
