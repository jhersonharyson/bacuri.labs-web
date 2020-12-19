import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthService from "../../services/AuthService";

export default function PrivateRoute({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated() ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{ path: "/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
