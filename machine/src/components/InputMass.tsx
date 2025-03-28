import React, { ChangeEvent } from "react";
import useConfig from "../hook/useConfig";
import { Key } from "../hook/Context";

interface PropsInput{
  title?: string;
  description?: string;
  type: Exclude<Key, Key.transitions | Key.blank | Key.initialState | Key.acceptingState>;
  char?: boolean;
}

export default function InputMass({ title, type, char, description}: PropsInput) {
  const contextValue = useConfig()[type];
  const [state, setState] = contextValue


  const handleChangeStates = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newStates = [...state];
    const value = char ? e.target.value[0] + '' : e.target.value;
    if (value == '' || !newStates.includes(value)) {
      newStates[i] = value != 'undefined' ? value : ''
      if (newStates[i].length !== 0 && typeof newStates[i + 1] === "undefined") newStates.push("");
      setState(newStates)
    }
  };

  const handleRemoveStates = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    i: number
  ) => {
    const newStates = [...state];
    if (e.currentTarget.value == "" && newStates.length != i + 1) {
      setState(newStates.filter((v, index) => index != i));
    }
  };

  return (
    <>
      <div className="states" title={description}>
          <p>{`${title ? title : type} = {`}</p>
          <div className="input">
            {
              state.map((s, i) => (
                <div key={i}>
                  {state.length > 1 && i + 1 == state.length && <p>,</p>}
                  <input
                    type="text"
                    value={s}
                    style={{ width: (s.length + 0.3) + "ch" }}
                    onChange={(e) => handleChangeStates(e, i)}
                    onBlur={(e) => handleRemoveStates(e, i)}
                  />
                  {(i !== state.length - 1 && i !== state.length - 2) && <p>,</p>}
                </div>
              ))
          }
          </div>
          <p>{`}`}</p>
      </div>
    </>
  );
}