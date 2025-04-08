
import InputMass from "../components/InputMass";
import RolesInputs from "../components/RulesInputs";
import { Key } from "../hook/Config/Context";
import useMachine from "../hook/Config/useMachine";

export default function SetOfCommands() {
  const machine = useMachine()
  return (
    <section>
      {machine && <>
      <InputMass
        type={Key.states}
        description="Конечное множество состояний управляющего устройства"
      />
      <InputMass type={Key.alphabet} char description="Входной алфавит" />
      <RolesInputs />
      </>}
    </section>
  );
}
