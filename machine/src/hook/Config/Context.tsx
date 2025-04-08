import { createContext, Dispatch, SetStateAction } from "react";

export type State = string;
export type Symbol = string;
export type Direction = "L" | "R" | "E";

export enum TransitionKey {
  write,
  move,
  nextState
}

export interface Transition {
  [TransitionKey.write]: Symbol;
  [TransitionKey.move]: Direction;
  [TransitionKey.nextState]: State;
}

export type Setter<T> = Dispatch<SetStateAction<T>>;

export enum Key {
  states = "Q",
  alphabet = "A",
  blank = "ε",
  initialState = "p0",
  acceptingState = "F",
  transitions = "δ",
  input = "Вводные данные",
  separator = "#",
}
export interface Rule {
  [key: State]: {
    [read: Symbol]: Transition;
  };
}

export interface TuringMachineConfig {
  [Key.states]: State[];
  [Key.alphabet]: Symbol[];
  [Key.blank]: Symbol;
  [Key.initialState]: State;
  [Key.acceptingState]: State;
  [Key.transitions]: Rule;
  [Key.input]: Symbol[];
  [Key.separator]: Symbol;
}
export interface TuringMachine {
  index: number
  machines: TuringMachineConfig[]
}
export interface FunctionsUpdateTuringMachine {
  [Key.states]: (index:number, write:State, deleted?:boolean) => void;
  [Key.alphabet]: (index:number, write:Symbol, deleted?:boolean) => void;
  [Key.blank]: (write:Symbol) => void;
  [Key.initialState]: (write:Symbol) => void;
  [Key.acceptingState]: (write:Symbol) => void;
  [Key.transitions]: {
    [TransitionKey.nextState]: (state: State, read: Symbol, write: State) => void;
    [TransitionKey.write]: (state: State, read: Symbol, write: Symbol) => void;
    [TransitionKey.move]: (state: State, read: Symbol, write: Direction) => void;
  }
  [Key.input]: (str: string) => void;
  [Key.separator]: (write:Symbol) => void;
  index: (index:number) => void,
  addMachine: () => void
  removeMachine: (index:number) => void 
}

const config = createContext<[TuringMachine, FunctionsUpdateTuringMachine]>([{
  index: NaN,
  machines: []
}, {
  [Key.states]: () => {},
  [Key.alphabet]: () => {},
  [Key.blank]: () => {},
  [Key.initialState]: () => {},
  [Key.acceptingState]: () => {},
  [Key.transitions]: {
    [TransitionKey.nextState]: () => {},
    [TransitionKey.write]:() => {},
    [TransitionKey.move]:() => {}
  },
  [Key.input]: () => {},
  [Key.separator]: () => {},
  index: () => {},
  addMachine: () => {},
  removeMachine: () => {}
}]);

export default config

