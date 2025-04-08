import { useEffect, useState } from "react";
import Tape from "./Tape";
import { Key } from "../../hook/Config/Context";
import useMachine from "../../hook/Config/useMachine";
import useUpdateMachine from "../../hook/Config/useUpdateMachine";

export default function Panel() {
  const machine = useMachine()
  const functions = useUpdateMachine()
  const [tape, setTape] = useState<string[]>([]);
  const [headPosition, setHead] = useState(0);
  const [left, setLeft] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    if (machine) setTape(machine[Key.input])
  }, [machine])

  return (
    <div className="panel">
      <input type="text" value={machine ? machine[Key.input].join(''): ''} onChange={(e) => machine && functions[Key.input](e.currentTarget.value)} placeholder="Вводдные данные"/>
      <Tape tapeData={tape} headPosition={headPosition} onAnimationEnd={() => {
        setHead((prev) => {
          let value = prev
          if (left =='left') value++
          else if (left == 'right') value--
          setLeft(null)
          return value
        })
      }} animate={left}/>
      <button onClick={() => setLeft('left')} disabled={left != null}>Left</button>
      <button onClick={() => setLeft('right')} disabled={left != null}>Right</button>
    </div>
  )
}
