import { Key } from "../hook/Config/Context";
import useMachine from "../hook/Config/useMachine";
import useRunMachine from "../hook/StatusMachine/useRunMachine";
import RuleState from "./Rules/Rule";

export default function RolesInputs() {
  const machine = useMachine()
  const [status] = useRunMachine()
  const currState = status.currentState
  const symbolReading = status.symbol
  return (
    <div className="rules">
      <p>δ:</p>
      {machine[Key.states].slice(0, -2).map((state, i) => machine[Key.transitions][state] && (
        <div key={i} className="rules-state">
          {
            machine[Key.alphabet].slice(0, -1).map((read, j) => machine[Key.transitions][state][read] && (
              <RuleState key={j} state={state} read={read} leftShow active={state == currState && read == symbolReading}/>
            ))
          }
        </div>
      ))}
    </div>
  );
}
