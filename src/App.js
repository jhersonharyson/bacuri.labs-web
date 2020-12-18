import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./style.css";
import Routes from "./routes";
const browserHistory = createBrowserHistory();
export default function App() {
  return (
    <BrowserRouter history={browserHistory}>
      <Routes />
    </BrowserRouter>
  );
}
