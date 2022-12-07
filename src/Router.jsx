import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppLogin } from "./pages/AppLogin";
import { AppRegister } from "./pages/AppRegister";
import { useSelector } from "react-redux";
import { selectToken } from "./store/user/selector";
import { AppGalleries, AppGallerys } from "./pages/AppGalleries";

function GuestRoute({ children, ...props }) {
  const isGuest = !useSelector(selectToken);

  return <Route {...props}>{isGuest ? children : <Redirect to="/" />}</Route>;
}

function PrivateRoute({ children, ...props }) {
  const isAuthenticated = useSelector(selectToken);

  return (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
}

export const Router = () => {
  return (
    <Switch>
      <GuestRoute path="/register">
        <AppRegister />
      </GuestRoute>
      <GuestRoute path="/login">
        <AppLogin />
      </GuestRoute>
      <PrivateRoute exact path="/galleries">
        <AppGalleries />
      </PrivateRoute>
      <Route exact path="/">
            <Redirect to="/galleries"/>
      </Route>
    </Switch>
  );
};
