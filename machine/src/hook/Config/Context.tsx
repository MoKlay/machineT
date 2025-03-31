import { createContext, Dispatch, SetStateAction } from "react";

export type State = string;
export type Symbol = string;
export type Direction = "L" | "R" | "E";

export interface Transition {
  write: Symbol;
  move: Direction;
  nextState: State;
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
  separator = "#"
}
export interface Rule {
  [key: State]: {
    [read: Symbol]: Transition;
  };
}

export interface TuringMachineConfig {
  [Key.states]: [State[], Setter<State[]>];
  [Key.alphabet]: [Symbol[], Setter<Symbol[]>];
  [Key.blank]: [Symbol, Setter<Symbol>];
  [Key.initialState]: [State, Setter<State>];
  [Key.acceptingState]: [State, Setter<State>];
  [Key.transitions]: [Rule, Setter<Rule>];
  [Key.input]: [Symbol[], Setter<Symbol[]>];
  [Key.separator]: [Symbol, Setter<Symbol>]
}

const context = createContext<TuringMachineConfig>({
  [Key.states]: [[], () => { } ],
  [Key.alphabet]: [[], () => { } ],
  [Key.blank]: ["", () => { } ],
  [Key.initialState]: ["", () => { } ],
  [Key.acceptingState]: ["", () => { } ],
  [Key.transitions]: [{}, () => { } ],
  [Key.input]: [[], () => { } ],
  [Key.separator]: ['', () => {}]
});
export default context;
