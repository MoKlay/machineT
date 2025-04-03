import { useContext } from "react";
import context from "./Context";

export default function useConfig() {
  const config = useContext(context);
  if (!config) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return config;
}
