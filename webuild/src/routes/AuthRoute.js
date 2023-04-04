import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    return (
      <Route
        {...rest}
        render={(props) =>
          accessToken ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  } catch (error) {
    return console.log("USER ERROR", error);
  }
};

export default AuthRoute;
