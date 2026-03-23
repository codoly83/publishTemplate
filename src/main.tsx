import "@/assets/styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";

async function enableMocking() {}

enableMocking().finally(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
