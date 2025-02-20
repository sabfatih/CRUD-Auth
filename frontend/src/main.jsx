import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bulma/css/bulma.css";
import App from "./App.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./app/store.js";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
