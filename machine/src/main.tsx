import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./sass/style.sass";
import Config from "./hook/Config/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Config>
      <App />
    </Config>
  </StrictMode>
);
