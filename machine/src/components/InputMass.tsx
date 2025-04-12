import useConfig from "../hook/Config/useConfig";
import { Key } from "../hook/Config/Context";
import useRunMachine from "../hook/StatusMachine/useRunMachine";

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

export default function InputMass({ title, type, description }: PropsInput) {
  const [state, setState] = useConfig();
  const status = useRunMachine()

  const currState = status[0].currentState


  return (
    <>
      <div className="states" title={description}>
        <p>{`${title ? title : type} = {`}</p>
        <div className="input">
          {state.machines[state.index][type].map((s, i) => (
            <div key={i}>
              <input
                type="text"
                value={s}
                style={{ width: s.length > 0 ? s.length + 0.3 + "ch": undefined }}
                className={`${type == Key.states && currState == s ? 'active': ''}`}
                onChange={(e) => {
                  setState[type](
                    i,
                    type == Key.states
                      ? e.currentTarget.value
                      : e.currentTarget.value[0]
                      ? e.currentTarget.value[0]
                      : ""
                  );
                }}
                disabled={type == Key.alphabet && (i == 0 || i == 1) }
              />
            </div>
          ))}
        </div>
        <p>{`}`}</p>
      </div>
    </>
  );
}
