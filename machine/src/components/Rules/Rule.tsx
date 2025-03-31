import { useEffect, useState } from "react";
import Input from "./Input";
import InputDirection from "./Input.Direction";
import { Direction, Key } from "../../hook/Config/Context";
import useConfig from "../../hook/Config/useConfig";

interface Rule {
  state: string;
  read: string;
  leftShow?: boolean
}

export default function RuleState({ state, read, leftShow }: Rule) {
  const states = useConfig()[Key.states][0].filter((v) => v != "");
  const alphabet = useConfig()[Key.alphabet][0].filter((v) => v != "");
  const [transitions, setTransitions] = useConfig()[Key.transitions];

  const [nextState, setNextState] = useState(
    transitions[state][read].nextState
  );
  const [write, setWrite] = useState(transitions[state][read].write);
  const [move, setMove] = useState<Direction>(transitions[state][read].move);

  useEffect(() => {
    setNextState(transitions[state][read].nextState);
    setWrite(transitions[state][read].write);
    setMove(transitions[state][read].move);
  }, [transitions, state, read]);

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
        <Input
          value={nextState}
          onChange={(e) => setNextState(e.currentTarget.value)}
          style={{
            width:
              nextState.length > 1 ? nextState.length + 0.4 + "ch" : undefined,
          }}
          error={() => !states.includes(nextState)}
          onAnimationEnd={() => {
            if (!states.includes(nextState))
              setNextState(transitions[state][read].nextState);
          }}
          onBlur={() => {
            if (states.includes(nextState))
              setTransitions((preview) => {
                const newRule = { ...preview };
                newRule[state][read] = {
                  ...newRule[state][read],
                  nextState,
                };
                return newRule;
              });
          }}
        />
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
