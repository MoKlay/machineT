import React, { ChangeEvent, useCallback } from "react";
import useConfig from "../hook/useConfig";
import { Key, Rule } from "../hook/Context";
import Input from "./Rules/Input";

interface PropsInput {
  title?: string;
  description?: string;
  type: Exclude<
    Key,
    | Key.transitions
    | Key.blank
    | Key.initialState
    | Key.acceptingState
    | Key.separator
  >;
  char?: boolean;
}

export default function InputMass({
  title,
  type,
  char,
  description,
}: PropsInput) {
  const context = useConfig();
  const [state, setState] = context[type];
  const setRule = context[Key.transitions][1];

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
            const alphabet = context[Key.alphabet][0].filter(v => v != '')
            alphabet.forEach((symbol) => {
              newRules[stateToAdd][symbol] = {
                nextState: stateToAdd,
                write: symbol,
                move: 'E'
              }
            })
          });

          return newRules;
        });
      } else if (keyType === Key.alphabet) {
        const addedSymbols = newValues.filter((s) => !oldValues.includes(s));
        const removedSymbols = oldValues.filter((s) => !newValues.includes(s));

        setCurrentRules((prevRules) => {
          const newRules: Rule = { ...prevRules };

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

          return newRules;
        });
      }
    },
    [context]
  );

  const handleChangeStates = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newStates = [...state];
    const value = char ? e.target.value[0] + "" : e.target.value;
    if (value == "" || !newStates.includes(value)) {
      newStates[i] = value != "undefined" ? value : "";
      if (newStates[i].length !== 0 && typeof newStates[i + 1] === "undefined")
        newStates.push("");
      setState(newStates);
      updateRules(type, state, newStates, setRule);
    }
  };

  const handleRemoveStates = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    i: number
  ) => {
    const newStates = [...state];
    if (e.currentTarget.value == "" && newStates.length != i + 1) {
      setState(newStates.filter((_, index) => index != i));
      updateRules(type, state, newStates, setRule);
    }
  };

  return (
    <>
      <div className="states" title={description}>
        <p>{`${title ? title : type} = {`}</p>
        <div className="input">
          {state.map((s, i) => (
            <Input
              key={i}
              type="text"
              value={s}
              style={{ width: s.length + 0.3 + "ch" }}
              onChange={(e) => handleChangeStates(e, i)}
              onBlur={(e) => handleRemoveStates(e, i)}
            />
          ))}
        </div>
        <p>{`}`}</p>
      </div>
    </>
  );
}
