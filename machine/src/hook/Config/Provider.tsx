import { useMemo, useState } from "react";
import config, {
  FunctionsUpdateTuringMachine,
  Key,
  TuringMachine,
} from "./Context";

export default function Config({ children }: React.PropsWithChildren) {
  const [machinesConfig, setMachinesConfig] = useState<TuringMachine>({
    index: 0,
    machines: [],
  });

  const functions = useMemo<FunctionsUpdateTuringMachine>(() => ({
    [Key.states]: (i, w) => {
      setMachinesConfig((prev) => {
        const newState = [...prev.machines[prev.index][Key.states]]
        const alphabet = prev.machines[prev.index][Key.alphabet]
        const newRule = {...prev.machines[prev.index][Key.transitions]}

        delete newRule[newState[i]]
        newRule[w] = {}
        alphabet.forEach(v => {
          newRule[w][v] = {
            nextState: w,
            write: v,
            move: 'E'
          }
        })

        newState[i] = w
        if (newState[i].length !== 0 && i+1 == newState.length) newState.push('')

        const newConfig = {...prev.machines}
        newConfig[prev.index] = {
          ...newConfig[prev.index],
          [Key.states]: newState,
          [Key.transitions]: newRule
        }

        return {
          ...prev,
          machines: newConfig
        }
      })
    },
    [Key.alphabet]: () => {},
    [Key.blank]: () => {},
    [Key.initialState]: () => {},
    [Key.acceptingState]: () => {},
    [Key.transitions]: () => {},
    [Key.input]: () => {},
    [Key.separator]: () => {},
    index: (i) => {
      setMachinesConfig((prev) => {
        const newIndex = {...prev}
        newIndex.index = i
        return newIndex
      })
    },
    addMachine: () => {
      setMachinesConfig((prev) => {
        const newMachine = {...prev}
        newMachine.machines.push({
          [Key.states]: [""],
          [Key.alphabet]: [Key.blank, Key.separator, ""],
          [Key.blank]: Key.blank,
          [Key.initialState]: "",
          [Key.acceptingState]: "",
          [Key.transitions]: {},
          [Key.input]: [],
          [Key.separator]: Key.separator,
        })
        return newMachine
      })
    },
    removeMachine: (i) => {
      setMachinesConfig((prev) => {
        const newMachine = {...prev}
        newMachine.machines = newMachine.machines.filter((_, index) => index != i)
        return newMachine
      })
    }
  }), []);
  return <config.Provider value={[machinesConfig, functions]}>{children}</config.Provider>;
}
