import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";
import {Store} from "./flux";
import SignIn from "./views/auth/SignIn";
import Register from "./views/auth/Register";
import { Guest } from "./layouts";


import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export default () => {
  return(
    <Routes>
    
      <Route
        path='/sign-in'
        element={
          <Guest>
           <SignIn/>
          </Guest>
        }
      />
      <Route
        path='/register'
        element={
          <Guest>
           <Register/>
          </Guest>
          }
                
      />
      {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={
                <RequireAuth>
                    <route.layout>
                      <route.component />
                    </route.layout>
                </RequireAuth>
              }
            />
          );
      })}
  </Routes>
)};

function RequireAuth({ children }) {
  const token = Store.getAccount()

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign-in" />;
  }

  return children;
}