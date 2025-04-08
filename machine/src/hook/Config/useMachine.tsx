import useConfig from "./useConfig";

export default function useMachine() {
  const [context] = useConfig()
  const machine = context.machines[context.index]
  return machine
}