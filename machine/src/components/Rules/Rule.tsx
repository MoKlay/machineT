import { useEffect, useState } from "react";
import Input from "./Input";
import InputDirection from "./Input.Direction";
import { Key } from "../../hook/Config/Context";
import useConfig from "../../hook/Config/useConfig";

interface Rule {
  state: string;
  read: string;
  leftShow?: boolean
}

export default function RuleState({ state, read, leftShow }: Rule) {
  const [context, setContext] = useConfig()
  const config = context.machines[context.index]
  const {nextState, write, move} = config[Key.transitions][state][read]

  return (
    <div className="rule">
      {leftShow && <div className="path">
        <Input
          value={state}
          style={{
            width: state.length > 1 ? state.length + 0.4 + "ch" : undefined,
          }}
          disabled
        />
        <Input value={read} disabled />
      </div>}
      <div className="path">
        <Input value={nextState} />
        <Input
          value={write}
          onChange={(e) => setWrite(e.target.value[0])}
          error={() => !alphabet.includes(write)}
          onBlur={() => {
            if (alphabet.includes(write))
              setTransitions((preview) => {
                const newRule = { ...preview };
                newRule[state][read] = {
                  ...newRule[state][read],
                  write,
                };
                return newRule;
              });
          }}
          onAnimationEnd={() => {
            if (!states.includes(write))
              setWrite(transitions[state][read].write);
          }}
        />
        <InputDirection useState={[move, setMove]} state={state} read={read}/>
      </div>
    </div>
  );
}
