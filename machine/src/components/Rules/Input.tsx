import { useState } from "react";
import { Direction, Key, Rule, TransitionKey } from '../../hook/Config/Context';
import useConfig from "../../hook/Config/useConfig";

interface InputProps {
  value: string;
  type: Extract<Key, Key.alphabet | Key.states>;
  argType: TransitionKey,
  read: string,
  state: string
}

export default function Input({ value, type, argType, read, state }: InputProps) {
  const [config, functions] = useConfig()
  const [curVal, setCurVal] = useState(value);
  const machine = config.machines[config.index]
  const path = machine[Key.transitions][state][read][argType]
  const arg = config.machines[config.index][type].slice(0, -1)

  function handleClick(v: string | Direction) {
    setCurVal(v)
    if (argType == TransitionKey.move && v extends Direction)
    functions[Key.transitions][argType](state, read, v)
  }

  return (
    <div>
      <input
        type="text"
        value={curVal}
        placeholder=""


      />
      <div className="choices">
        {
          arg.filter(v => v != path && v.includes(curVal)).map((v,i) => (
            <button key={i} onClick={() => handleClick(v)}>{v}</button>
          ))
        }
      </div>
    </div>
  );
}
