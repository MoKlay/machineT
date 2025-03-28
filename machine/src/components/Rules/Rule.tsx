import { useEffect, useState } from "react";
import useConfig from "../../hook/useConfig";
import { Direction, Key, State, Symbol } from "../../hook/Context";
import Input from "./Input";
import { TypeInput } from "./types";
import InputDirection from "./Input.Direction";

export default function Rule() {
  const setRule = useConfig()[Key.transitions][1];
  const currentState = useState<State>("");
  const read = useState<Symbol>("");
  const nextState = useState<State>("");
  const write = useState<Symbol>("");
  const move = useState<Direction>("E");

  useEffect(() => {
    if (currentState[0] && read[0] && nextState[0] && write[0] && move[0]) {
      setRule((preview) => {
        const newRule = preview;
        newRule[currentState[0]][read[0]] = {
          nextState: nextState[0],
          write: write[0],
          move: move[0],
        };
        return { ...newRule };
      });
    }
  }, [currentState, read, nextState, write, move, setRule]);

  return (
    <>
      <Input state={currentState} type={TypeInput.currentState} />
      <Input state={read} type={TypeInput.read} />
      <Input state={nextState} type={TypeInput.nextState} />
      <Input state={write} type={TypeInput.write} />
      <InputDirection state={move} />
    </>
  );
}
