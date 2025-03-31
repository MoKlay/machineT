import { useContext } from "react";
import Context, { TuringMachineConfig } from './Context';

export default function useConfig(): TuringMachineConfig {
  const config = useContext(Context);
  if (!config) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return config;
}