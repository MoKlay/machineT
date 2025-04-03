import useConfig from "../hook/Config/useConfig";
import { Key } from "../hook/Config/Context";
import Input from "./Rules/Input";

interface PropsInput {
  title?: string;
  description?: string;
  type: Exclude<
    Key,
    | Key.transitions
    | Key.blank
    | Key.initialState
    | Key.acceptingState
    | Key.separator
    | Key.input
  >;
  char?: boolean;
}

export default function InputMass({
  title,
  type,
  description,
}: PropsInput) {
  const [state, setState] = useConfig()

  return (
    <>
      <div className="states" title={description}>
        <p>{`${title ? title : type} = {`}</p>
        <div className="input">
          {state.machines[state.index][type].map((s, i) => (
            <Input
              key={i}
              type="text"
              value={s}
              style={{ width: s.length + 0.3 + "ch" }}
              onChange={(e) => {
                setState[type](i, e.currentTarget.value)
              }}
            />
          ))}
        </div>
        <p>{`}`}</p>
      </div>
    </>
  );
}
