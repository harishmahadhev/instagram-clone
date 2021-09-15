import { createContext } from "react";
import ReactLoading from "react-loading";
import "../App.css";
import { Route, Redirect } from "react-router-dom";
export const Loading = ({ color, type }) => (
  <ReactLoading
    type={type ? type : "bubbles"}
    height={"5%"}
    width={"5%"}
    color={color ? color : "#fff"}
  />
);

export const ProtectedAppRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => (auth ? <Component /> : <Redirect to="/login" />)}
  />
);

export const ProtectedLoginRoute = ({
  auth,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={() => (auth ? <Redirect to="/app/home" /> : <Component />)}
  />
);
export const varCtx = createContext(null);

export function refreshPage() {
  window.location.reload();
}
