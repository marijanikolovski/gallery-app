import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppLogin } from "./pages/AppLogin";
import { AppRegister } from "./pages/AppRegister";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "./store/user/selector";
import { AppGalleries } from "./pages/AppGalleries";
import { AddGallery } from "./pages/AddGallery";
import { SingleGallery } from "./pages/SingleGallery";
import { getActiveUser, logout,  } from "./store/user/slice";
import { selectActiveUser } from "./store/user/selector";
import axios from "axios";

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
  const isAuthenticated = useSelector(selectToken);
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser())
    } 
  }, [])

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
      <PrivateRoute path="/my-galleries">
        <AppGalleries myId={isAuthenticated ? (activeUser?.id) : null}/>
      </PrivateRoute>
      <PrivateRoute path="/authors/:id">
        <AppGalleries />
      </PrivateRoute>
      <PrivateRoute path='/galleries/:id'>
       <SingleGallery />
      </PrivateRoute>
      <PrivateRoute path='/edit-gallery/:id'>
        <AddGallery />
      </PrivateRoute>
      <PrivateRoute path='/create'>
            <AddGallery />
        </PrivateRoute>
      <Route exact path="/">
            <Redirect to="/galleries"/>
      </Route>
    </Switch>
  );
};
