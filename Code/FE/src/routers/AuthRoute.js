import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default AuthRoute;
