import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  register,
  handleServiceWorkerUpdate,
} from "./shared/utils/serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for offline functionality
register({
  onSuccess: () => {
    console.log("App is cached and ready to work offline!");
  },
  onUpdate: (registration) => {
    console.log("New version available!");
    handleServiceWorkerUpdate(registration);
  },
});
