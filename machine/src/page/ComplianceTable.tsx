
import RuleState from "../components/Rules/Rule";
import { Key } from "../hook/Config/Context";
import useMachine from "../hook/Config/useMachine";
import useUpdateMachine from "../hook/Config/useUpdateMachine";

export default function ComplianceTable() {
  const context = useMachine();
  const functions = useUpdateMachine()
  

  return context && (
    <section>
      <table>
        <tbody>
        <tr>
          <th>Q / A</th>
          {context[Key.alphabet].slice(0, -1).map((v, i) => (
            <th key={v}>
              {v}
            </th>
          ))}
        </tr>
        {context[Key.states].slice(0, -2).map((state, i) => context[Key.states].length != i+1 && (
          <tr key={i}>
            <th>
              {state}
            </th>
            {context[Key.alphabet].slice(0, -1).map((read, j) => (
              <td key={j}>
                {context[Key.transitions][state] && context[Key.transitions][state][read] && <RuleState state={state} read={read} />}
              </td>
            ))}
          </tr>
        ))}

        </tbody>
      </table>
    </section>
  );
}
