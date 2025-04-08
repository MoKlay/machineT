
import RuleState from "../components/Rules/Rule";
import { Key } from "../hook/Config/Context";
import useMachine from "../hook/Config/useMachine";
import useUpdateMachine from "../hook/Config/useUpdateMachine";

export default function ComplianceTable() {
  const context = useMachine();
  const functions = useUpdateMachine()
  const al = context[Key.alphabet].slice(0, -1).sort()
  al.push('')

  return context && (
    <section>
      <table>
        <tbody>
        <tr>
          <th>Q / A</th>
          {al.map((v, i) => (
            <th key={v}>
              <label>
                <input
                  type="text"
                  value={v}
                  style={{ width: v.length * 1.5 + "ch" }}
                  onChange={(e) => functions[Key.alphabet](i, e.currentTarget.value[0])}
                  onFocus={(e) => e.currentTarget.select()}
                />
              </label>
            </th>
          ))}
        </tr>
        {context[Key.states].map((state, i) => (
          <tr key={i}>
            <th>
              <label>
                <input
                  type="text"
                  value={state}
                  style={{ width: state.length * 1.2 + "ch" }}
                  onFocus={(e) => e.currentTarget.select()}
                  onChange={(e) => functions[Key.states](i, e.currentTarget.value)}
                />
              </label>
            </th>
            {context[Key.transitions][state] &&
              Object.keys(context[Key.transitions][state]).map((read, j) => (
                <td key={j}>
                  <RuleState state={state} read={read} />
                </td>
              ))}
          </tr>
        ))}

        </tbody>
      </table>
    </section>
  );
}
