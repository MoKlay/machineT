import { useContext } from "react";
import context from "./Context";

export default function useRunMachine() {
  return useContext(context)
}
