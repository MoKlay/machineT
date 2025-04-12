import { useEffect, useRef } from "react";
import { Key, TransitionKey } from '../../hook/Config/Context';
import useUpdateMachine from "../../hook/Config/useUpdateMachine";
import useMachine from "../../hook/Config/useMachine";

interface InputProps {
  type: Extract<Key, Key.alphabet | Key.states>;
  argType: Exclude<TransitionKey, TransitionKey.move >,
  read: string,
  state: string
}

export default function Input({ type, argType, read, state }: InputProps) {
  const functions = useUpdateMachine()
  const machine = useMachine()
  const value = machine[Key.transitions][state][read][argType]
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.value = value
    }
  }, [value])
  

  function handleClick(value: string) {
    functions[Key.transitions][argType](state, read, value)
  }
  return (
    <div>
      <input
      ref={ref}
        type="text"
        placeholder=""
        style={ref.current && ref.current.value.length > 1 ? {
          width: ref.current.value.length + 'ch'
        } : undefined} 
        onBlur={(e) => handleClick(type == Key.alphabet ? e.currentTarget.value[0] ? e.currentTarget.value[0]: '' : e.currentTarget.value)}
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
