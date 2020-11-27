import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Redirect to="/chat" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
