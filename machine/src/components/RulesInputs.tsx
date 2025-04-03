import useConfig from "../hook/Config/useConfig";
import Rule from "./Rules/Rule";

export default function RolesInputs() {
  const context = useConfig()[0]
  const massRole = Object.entries(context.machines[context.index]).map(([k, v]) => [
    k,
    Object.keys(v),
  ]);

  return (
    <div className="rules">
      <p>δ:</p>
      {massRole.map(([state, reads], i) => (
        <div key={i} className="rules-state">
          {Array.isArray(reads) &&
            typeof state == "string" &&
            reads.map((read, i) => <Rule key={i} state={state} read={read} leftShow/>)}
        </div>
      ))}
    </div>
  );
}
