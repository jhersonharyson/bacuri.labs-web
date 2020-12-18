import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthService from "../../services/AuthService";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ path: "/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
