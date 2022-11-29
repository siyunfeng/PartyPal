import { Provider } from "react-redux";
import store from "./store";
import React from "react";
//react 16
// import { render } from "react-dom";

// react 18
import { createRoot } from "react-dom/client";
import "../public/style.css";
import AllRoutes from "./components/WelcomePage";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <AllRoutes />
  </Provider>
);
