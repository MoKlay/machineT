import { KeyboardEvent } from "react";
import { Setter } from "../../hook/Context";
import { TypeInput } from "./types";

interface InputProps {
  state: [string, Setter<string>];
  type: TypeInput;
}

export default function Input({ state, type }: InputProps) {
  const [value, setter] = state;
  function update(value: string) {
    if (type == TypeInput.currentState)
      setter((preview) => {
        let newString = preview;
        if (/[\D]*[0-9]*/.test(value)) newString = value;
        return newString + "";
      });
    if (type == TypeInput.read)
      setter((preview) => {
        let newString = preview;
        if (/[\D]?\d?/.test(value)) newString = value;
        return newString + "";
      });
    if (type == TypeInput.nextState)
      setter((preview) => {
        let newString = preview;
        if (/[\D]*[0-9]*/.test(value)) newString = value;
        return newString + "";
      });
    if (type == TypeInput.nextState)
      setter((preview) => {
        let newString = preview;
        if (/[\D]*[0-9]*/.test(value)) newString = value;
        return newString + "";
      });
    if (type == TypeInput.move)
      setter((preview) => {
        let newString = preview;
        if (/[R,L,E]/.test(value)) newString = value;
        return newString + "";
      });
  }

  function handleSubmit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      update(e.currentTarget.value);
    }
  }

  return (
    <input
      type="text"
      value={value}
      onKeyDown={handleSubmit}
      onBlur={(e) => update(e.currentTarget.value)}
    />
  );
}
