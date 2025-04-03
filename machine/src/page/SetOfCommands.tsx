import InputMass from "../components/InputMass";
import RolesInputs from "../components/RulesInputs";
import { Key } from "../hook/Config/Context";

export default function SetOfCommands() {
  return (
    <section>
      <InputMass
        type={Key.states}
        description="Конечное множество состояний управляющего устройства"
      />
      <InputMass type={Key.alphabet} char description="Входной алфавит" />
      {/* <RolesInputs /> */}
    </section>
  );
}
