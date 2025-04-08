
import Input from "./Input";
import InputDirection from "./Input.Direction";
import { Key, TransitionKey } from "../../hook/Config/Context";

interface Rule {
  state: string;
  read: string;
  leftShow?: boolean;
}

export default function RuleState({ state, read, leftShow }: Rule) {
  return (
    <div className="rule">
      {leftShow && (
        <div className="path">
          <div>
            <input
              value={state}
              style={{
                width: state.length > 1 ? state.length + 0.4 + "ch" : undefined,
              }}
              disabled
            />
          </div>
          <div>
            <input value={read} disabled />
          </div>
        </div>
      )}
      <div className="path">
        <Input
          type={Key.states}
          argType={TransitionKey.nextState}
          read={read}
          state={state}
        />
        <Input
          type={Key.alphabet}
          argType={TransitionKey.write}
          read={read}
          state={state}
        />

        <InputDirection state={state} read={read} />
      </div>
    </div>
  );
}
