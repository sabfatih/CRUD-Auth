import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bulma/css/bulma.css";
import App from "./App.jsx";
import axios from "axios";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(<App />);
