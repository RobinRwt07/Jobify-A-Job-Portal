import ReactDOM from "react-dom/client";
import React from "react";
import './Styles/reset.css';
import { App } from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);