import { useEffect, useState } from "react";
import { Key, TransitionKey } from '../../hook/Config/Context';
import useConfig from "../../hook/Config/useConfig";

interface InputProps {
  type: Extract<Key, Key.alphabet | Key.states>;
  argType: Exclude<TransitionKey, TransitionKey.move >,
  read: string,
  state: string
}

export default function Input({ type, argType, read, state }: InputProps) {
  const [config, functions] = useConfig()
  const machine = config.machines[config.index]
  const path = machine[Key.transitions][state][read][argType]
  const arg = config.machines[config.index][type].slice(0, -1)
  const [curVal, setCurVal] = useState(path);

  useEffect(() => {
    setCurVal(path)
  }, [path])

  function handleClick() {
    if (arg.includes(curVal)) {
      functions[Key.transitions][argType](state, read, curVal)
    }
    else {
      setCurVal(path)
    }
  }
  return (
    <div>
      <input
        type="text"
        value={curVal}
        placeholder=""
        onChange={(e) => setCurVal(type == Key.alphabet ? e.currentTarget.value[0] : e.currentTarget.value)}
        onBlur={handleClick}
      />
      {/* <div className="choices">
        {
          arg.filter(v => v != path && v.includes(curVal)).map((v,i) => (
            <button key={i} onClick={() => handleClick(v)}>{v}</button>
          ))
        }
      </div> */}
    </div>
  );
}
