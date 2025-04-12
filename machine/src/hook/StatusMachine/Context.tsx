import { createContext } from "react";
import { Setter, State, Symbol } from "../Config/Context";

export type Tape = Symbol[]

export interface StatusMachine {
  tape: Tape;
  headPosition: number;
  currentState: State;
  symbol: Symbol,
  run: boolean
}
interface FunctionsMachine {
  step: () => boolean
  setRun: Setter<boolean>
}

export type ContextMachine = [StatusMachine, FunctionsMachine]

const context = createContext<ContextMachine>([
  {
    tape: [],
    headPosition: -1,
    currentState: '',
    symbol: '',
    run: false
  },
  {
    step: function (): boolean {
      throw new Error("Function not implemented.");
    },
    setRun: function (): void {
      throw new Error("Function not implemented.");
    }
  }
]);

export default context
