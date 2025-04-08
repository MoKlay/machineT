import useMachine from "../hook/Config/useMachine";
import ComplianceTable from "./ComplianceTable";
import SetOfCommands from "./SetOfCommands";


export default function ConfigSetting() {
  const machine = useMachine()
  return machine && (
    <main>
      <SetOfCommands />
      <ComplianceTable />
      {/* <Graph /> */}
    </main>
  );
}
