import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/style.sass";
import Machines from "./Machines.tsx";
import Config from "./hook/Config/Provider.tsx";
import MachineState from './hook/StatusMachine/Provider';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Config>
      <MachineState>
        <Machines />
      </MachineState>
    </Config>
  </StrictMode>
);
