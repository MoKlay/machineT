import { useCallback, ChangeEvent } from "react";
import RuleState from "../components/Rules/Rule";
import { Key, Rule } from "../hook/Config/Context";
import useConfig from "../hook/Config/useConfig";

export default function ComplianceTable() {
  const context = useConfig();
  const [state, setState] = context[Key.states];
  const [alphabet, setAlphabet] = context[Key.alphabet];
  const [transitions, setRule] = context[Key.transitions];
  const updateRules = useCallback(
    (
      keyType: Key,
      oldValues: string[],
      newValues: string[],
      setCurrentRules: React.Dispatch<React.SetStateAction<Rule>>
    ) => {
      if (keyType === Key.states) {
        const addedStates = newValues.filter((s) => !oldValues.includes(s));
        const removedStates = oldValues.filter((s) => !newValues.includes(s));

        setCurrentRules((prevRules) => {
          const newRules: Rule = { ...prevRules };

          // Удаление состояний
          removedStates.forEach((stateToRemove) => {
            delete newRules[stateToRemove];
          });

          // Добавление состояний
          addedStates.forEach((stateToAdd) => {
            newRules[stateToAdd] = {};
            const alphabet = context[Key.alphabet][0].filter((v) => v != "");
            alphabet.forEach((symbol) => {
              newRules[stateToAdd][symbol] = {
                nextState: stateToAdd,
                write: symbol,
                move: "E",
              };
            });
          });

          return newRules;
        });
      } else if (keyType === Key.alphabet) {
        const addedSymbols = newValues.filter((s) => !oldValues.includes(s));
        const removedSymbols = oldValues.filter((s) => !newValues.includes(s));

        setCurrentRules((prevRules) => {
          const newRules = { ...prevRules };

          // Удаление символов
          Object.keys(newRules).forEach((state) => {
            removedSymbols.forEach((symbolToRemove) => {
              delete newRules[state][symbolToRemove];
            });
          });

          // Добавление символов
          Object.keys(newRules).forEach((state) => {
            addedSymbols.forEach((symbolToAdd) => {
              newRules[state][symbolToAdd] = {
                nextState: state,
                write: symbolToAdd,
                move: "E",
              };
            });
          });
          console.log(newRules);
          const sortedTransitions: Rule = {};
          Object.keys(newRules).forEach((state) => {
            const alphabet = context[Key.alphabet][0].filter((v) => v != "");
            sortedTransitions[state] = {}
            alphabet.forEach((symbol) => {
              if (newRules[state][symbol]) {
                sortedTransitions[state][symbol] = newRules[state][symbol];
              }
            });
          });
          console.log(sortedTransitions);
          


          return sortedTransitions;
        });
      }
    },
    [context]
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    i: number,
    type: Key
  ) => {
    const newStates = type == Key.states ? [...state] : [...alphabet];
    const value =
      type == Key.states
        ? e.currentTarget.value
        : e.currentTarget.value[0]
        ? e.currentTarget.value[0]
        : "";
    if (value == "" || !newStates.includes(value)) {
      newStates[i] = value;
      if (newStates[i].length !== 0 && typeof newStates[i + 1] === "undefined")
        newStates.push("");
      updateRules(
        type,
        type == Key.states ? state : alphabet,
        newStates,
        setRule
      );
      if (type == Key.states) setState(newStates);
      else setAlphabet(newStates);
    }
  };
  const handleRemove = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    i: number,
    type: Key
  ) => {
    const newStates = type == Key.states ? [...state] : [...alphabet];
    if (e.currentTarget.value == "" && newStates.length != i + 1) {
      updateRules(
        type,
        type == Key.states ? state : alphabet,
        newStates,
        setRule
      );
      if (type == Key.states)
        setState(newStates.filter((_, index) => index != i));
      else setAlphabet(newStates.filter((_, index) => index != i));
    }
  };

  return (
    <section>
      <table>
        <tbody>
        <tr>
          <th>Q / A</th>
          {alphabet.map((v, i) => (
            <th key={v}>
              <label>
                <input
                  type="text"
                  value={v}
                  style={{ width: v.length * 1.5 + "ch" }}
                  onChange={(e) => handleChange(e, i, Key.alphabet)}
                  onBlur={(e) => handleRemove(e, i, Key.alphabet)}
                  onFocus={(e) => e.currentTarget.select()}
                />
              </label>
            </th>
          ))}
        </tr>
        {state.map((state, i) => (
          <tr key={i}>
            <th>
              <label>
                <input
                  type="text"
                  value={state}
                  style={{ width: state.length * 1.2 + "ch" }}
                  onChange={(e) => handleChange(e, i, Key.states)}
                  onBlur={(e) => handleRemove(e, i, Key.states)}
                  onFocus={(e) => e.currentTarget.select()}
                />
              </label>
            </th>
            {transitions[state] &&
              Object.keys(transitions[state]).map((read, j) => (
                <td key={j}>
                  <RuleState state={state} read={read} />
                </td>
              ))}
          </tr>
        ))}

        </tbody>
      </table>
    </section>
  );
}
