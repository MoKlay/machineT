import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/style.sass";
import Machines from "./Machines.tsx";
import Config from "./hook/Config/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Config>
      <Machines />
    </Config>
  </StrictMode>
);
