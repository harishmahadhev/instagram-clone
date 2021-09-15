import React, { useEffect, useState } from "react";
import {
  ProtectedAppRoute,
  ProtectedLoginRoute,
  varCtx,
} from "./Component/Shared";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import App from "./App";
import Cookies from "js-cookie";
import Activate from "./Component/Activate";

export default function Routes() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (Cookies.get("--t")) {
      setAuth(true);
    }
  }, []);

  return (
    <varCtx.Provider value={{ loading, setLoading, setAuth, auth }}>
      <Switch>
        <ProtectedLoginRoute path="/login" auth={auth} component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/activate/:token" component={Activate} />
        <Route exact path="/">
          <Redirect to="/app/home" />
        </Route>
        <ProtectedAppRoute path="/app" auth={auth} component={App} />
      </Switch>
    </varCtx.Provider>
  );
}
