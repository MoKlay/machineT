import { Direction, Setter } from "../../hook/Context";

export default function InputDirection({state}:{state: [Direction, Setter<Direction>]}) {
  const [value, setValue] = state
  return (
    <div className="select">
      <p>{value}</p>
      <div className="options">
        <input type="button" value="E" onClick={() => setValue('E')} />
        <input type="button" value="R" onClick={() => setValue('R')} />
        <input type="button" value="L" onClick={() => setValue('L')} />
      </div>
    </div>
  )
}
