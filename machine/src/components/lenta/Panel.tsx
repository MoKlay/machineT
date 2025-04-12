import Tape from "./Tape";
import { Key } from "../../hook/Config/Context";
import useMachine from "../../hook/Config/useMachine";
import useUpdateMachine from "../../hook/Config/useUpdateMachine";
import useRunMachine from "../../hook/StatusMachine/useRunMachine";

export default function Panel() {
  const machine = useMachine();
  const functions = useUpdateMachine();
  const [{ tape, headPosition, run }, { step }] = useRunMachine();

  return (
    <div className="panel">
      <input
        type="text"
        value={machine ? machine[Key.input].join("") : ""}
        disabled={run}
        onChange={(e) => machine && functions[Key.input](e.currentTarget.value)}
        placeholder="Вводные данные"
      />
      <Tape tapeData={tape} headPosition={headPosition} />
      <div>
      <button onClick={() => step()} disabled={run}>
        Шаг
      </button>
      </div>
    </div>
  );
}
