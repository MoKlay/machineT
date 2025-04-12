import { useEffect, useState } from "react";
import { Direction, Key, TransitionKey } from "../../hook/Config/Context";

import useUpdateMachine from "../../hook/Config/useUpdateMachine";
import useMachine from "../../hook/Config/useMachine";
interface InputDirection {
  state: string
  read: string
}

export default function InputDirection({state, read}:InputDirection) {
  const functions = useUpdateMachine()
  const machine = useMachine()
  const [value, setValue] = useState<Direction>(machine[Key.transitions][state][read][TransitionKey.move])

  useEffect(() => {
    setValue(machine[Key.transitions][state][read][TransitionKey.move])
  }, [machine, read, state])

  function handleClick(value: Direction) {
    setValue(value)
    functions[Key.transitions][TransitionKey.move](state, read, value)
  }

  return (
    <div className="select">
      <p>{value}</p>
      <div className="options">
        <input type="button" value="E" onClick={() => handleClick('E')} className={value == 'E' ? 'active' : ''} />
        <input type="button" value="R" onClick={() => handleClick('R')} className={value == 'R' ? 'active' : ''}/>
        <input type="button" value="L" onClick={() => handleClick('L')} className={value == 'L' ? 'active' : ''}/>
      </div>
    </div>
  )
}
