import { useMemo, useState } from "react";
import config, {
  FunctionsUpdateTuringMachine,
  Key,
  Rule,
  Transition,
  TransitionKey,
  TuringMachine,
  TuringMachineConfig,
} from "./Context";

export default function Config({ children }: React.PropsWithChildren) {
  const [machinesConfig, setMachinesConfig] = useState<TuringMachine>({
    index: -1,
    machines: [],
  });

  const functions = useMemo<FunctionsUpdateTuringMachine>(() => {
    const { index, machines } = machinesConfig;
    const machine = machines[index];

    interface Clone {
      newState: string[];
      alphabet: string[];
      newRule: Rule;
    }

    function getClone(): Clone {
      const newState = machine[Key.states].slice(0, -1);
      const alphabet = machine[Key.alphabet].slice(0, -1);
      const newRule = structuredClone(machine[Key.transitions]);
      return {
        newState,
        alphabet,
        newRule,
      };
    }

    function updateMachine(type: Key, { newRule, newState, alphabet }: Clone) {
      let updatedMachine: TuringMachineConfig = { ...machine };

      switch (type) {
        case Key.states:
          updatedMachine = {
            ...machine,
            [Key.states]: newState,
            [Key.transitions]: newRule,
            [Key.initialState]: newState[0] ? newState[0] : "",
            [Key.acceptingState]: newState[newState.length - 1]
              ? newState[newState.length - 1]
              : "",
          };
          break;
        case Key.alphabet:
          updatedMachine = {
            ...machine,
            [Key.alphabet]: alphabet,
            [Key.transitions]: newRule,
            [Key.blank]: alphabet[0],
            [Key.separator]: alphabet[1],
          };
          break;
        case Key.transitions:
          updatedMachine = {
            ...machine,
            [Key.transitions]: newRule,
          };
          break;
        case Key.acceptingState:
          break;
        case Key.blank:
          break;
        case Key.initialState:
          break;
        case Key.input:
          break;
        case Key.separator:
          break;
        default:
          updatedMachine = { ...machine };
      }

      const updatedMachines = [...machines];
      updatedMachines[index] = updatedMachine;

      setMachinesConfig({
        ...machinesConfig,
        machines: updatedMachines,
      });
    }

    return {
      [Key.states]: (i, w) => {
        const { newState, alphabet, newRule } = getClone();
        if (w == "") {
          delete newRule[newState[i]];
          newState.splice(i, 1);
        } else if (!newState.includes(w)) {
          newRule[w] = newRule[newState[i]]
            ? { ...newRule[newState[i]] }
            : Object.fromEntries<Transition>(
                alphabet.map((v) => [
                  v,
                  {
                    [TransitionKey.nextState]: w,
                    [TransitionKey.write]: v,
                    [TransitionKey.move]: "E",
                  } as Transition,
                ])
              );
          if (newState[i] && newRule[newState[i]]) {
            delete newRule[newState[i]];
          }

          newState[i] = w; // Обновляем state
        }
        newState.push("");
        updateMachine(Key.states, {
          newRule,
          newState,
          alphabet,
        });
      },
      [Key.alphabet]: (i, w) => {
        const { newState, alphabet, newRule } = getClone();
        if (w == "") {
          newState.forEach((state) => {
            delete newRule[state][alphabet[i]];
          });
          alphabet.splice(i, 1);
        } else if (!alphabet.includes(w)) {
          newState.forEach((state) => {
            if (!newRule[state]) newRule[state] = {};
            const rule = newRule[state][alphabet[i]];
            if (rule) {
              if (!newState.includes(rule[TransitionKey.nextState])) {
                rule[TransitionKey.nextState] = state;
              }
              if (!alphabet.includes(rule[TransitionKey.write])) {
                rule[TransitionKey.write] = w;
              }
              newRule[state][w] = rule;
            } else {
              newRule[state][w] = {
                [TransitionKey.nextState]: state,
                [TransitionKey.write]: w,
                [TransitionKey.move]: "E",
              };
            }
          });
          alphabet[i] = w;
        }

        alphabet.push("");
        updateMachine(Key.alphabet, {
          newRule,
          newState,
          alphabet,
        });
      },
      [Key.blank]: () => {},
      [Key.initialState]: () => {},
      [Key.acceptingState]: () => {},
      [Key.transitions]: {
        [TransitionKey.nextState]: (state, read, write) => {
          const { newState, alphabet, newRule } = getClone();
          if (
            newState.includes(state) &&
            alphabet.includes(read) &&
            newState.includes(write)
          )
            newRule[state][read][TransitionKey.nextState] = write;

          updateMachine(Key.transitions, {
            newRule,
            newState,
            alphabet,
          });
        },
        [TransitionKey.write]: (state, read, write) => {
          const { newState, alphabet, newRule } = getClone();
          if (
            newState.includes(state) &&
            alphabet.includes(read) &&
            alphabet.includes(write)
          )
            newRule[state][read][TransitionKey.nextState] = write;
          updateMachine(Key.transitions, {
            newRule,
            newState,
            alphabet,
          });
        },
        [TransitionKey.move]: (state, read, write) => {
          const { newState, alphabet, newRule } = getClone();
          if (newState.includes(state) && alphabet.includes(read))
            newRule[state][read][TransitionKey.move] = write;
          updateMachine(Key.transitions, {
            newRule,
            newState,
            alphabet,
          });
        },
      },
      [Key.input]: (str) => {
        setMachinesConfig((prev) => {
          const newConfig = structuredClone(prev.machines[prev.index]);
          newConfig[Key.input] = str.split("");
          const newMass = [...prev.machines];
          newMass[prev.index] = newConfig;
          return {
            ...prev,
            machines: [...newMass],
          };
        });
      },
      [Key.separator]: () => {},
      index: (i) => {
        setMachinesConfig((prev) => {
          const newIndex = { ...prev };
          newIndex.index = i;
          return newIndex;
        });
      },
      addMachine: () => {
        setMachinesConfig((prev) => ({
          index: prev.machines.length,
          machines: [
            ...prev.machines,
            {
              [Key.states]: [""],
              [Key.alphabet]: [Key.blank, Key.separator, ""],
              [Key.blank]: Key.blank,
              [Key.initialState]: "",
              [Key.acceptingState]: "",
              [Key.transitions]: {},
              [Key.input]: [],
              [Key.separator]: Key.separator,
            },
          ],
        }));
      },
      removeMachine: (i) => {
        const newMachine = structuredClone(machinesConfig.machines);
        newMachine.splice(i, 1);

        let newIndex = machinesConfig.index;
        if (i < machinesConfig.index) {
          // Если удаляем элемент перед текущим индексом
          newIndex = Math.max(0, machinesConfig.index - 1); // Уменьшаем индекс, но не ниже 0
        } else if (i === machinesConfig.index && newMachine.length > 0) {
          // Если удаляем текущий элемент, но остались элементы
          newIndex = Math.max(0, machinesConfig.index - 1);
        } else if (i === machinesConfig.index && newMachine.length === 0) {
          newIndex = -1; //если удалили последний элемент
        }

        setMachinesConfig({
          index: newIndex + 0,
          machines: newMachine,
        });
      },
    };
  }, [machinesConfig]);
  return (
    <config.Provider value={[machinesConfig, functions]}>
      {children}
    </config.Provider>
  );
}
