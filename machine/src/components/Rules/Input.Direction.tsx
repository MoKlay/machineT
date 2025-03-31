import { Direction, Key, Setter } from "../../hook/Config/Context";
import useConfig from "../../hook/Config/useConfig";
interface InputDirection {
  useState: [Direction, Setter<Direction>]
  state: string
  read: string
}

export default function InputDirection({state, read, useState}:InputDirection) {
  const [value, setValue] = useState
  const setTransitions = useConfig()[Key.transitions][1]

  function handleClick(value: Direction) {
    setValue(value)
    setTransitions((preview) => {
      const newRule = {...preview}
      newRule[state][read] = {
        ...newRule[state][read],
        move: value
      }
      return newRule
    })
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
