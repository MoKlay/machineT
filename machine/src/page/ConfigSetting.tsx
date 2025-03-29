import InputMass from "../components/InputMass";
import RolesInputs from "../components/RulesIInputs";
import { Key } from "../hook/Context";

export default function ConfigSetting() {
  return (
    <>
      <InputMass  type={Key.states}  description="Конечное множество состояний управляющего устройства"/>
      <InputMass  type={Key.alphabet} char description="Входной алфавит"/>
      <RolesInputs />
    </>
  )
}