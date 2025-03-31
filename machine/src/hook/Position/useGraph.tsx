import { useContext } from "react";
import context from "./Context";

export default function useGraph() {
  return useContext(context)
}


