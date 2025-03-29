import React from "react";
import Context, { Key, State, Symbol, Transition, TuringMachineConfig } from './Context';

export default function Config({ children }: React.PropsWithChildren) {
  const states = React.useState<State[]>(['']);
  const alphabet = React.useState<Symbol[]>(['']);
  const blank = React.useState<Symbol>('ε');
  const initialState = React.useState<State>(''); // Changed type to State
  const acceptingState = React.useState<State>(''); // Changed type to State
  const transitions = React.useState<{ [key: State]: { [read: Symbol]: Transition } }>({'':{[`${blank}`]:{}}}); // Correct type
  const input = React.useState<Symbol[]>([]);


  const contextValue: TuringMachineConfig = {
    [Key.states]: states,
    [Key.alphabet]: alphabet,
    [Key.blank]: blank,
    [Key.initialState]: initialState,
    [Key.acceptingState]: acceptingState,
    [Key.transitions]: transitions,
    [Key.input]: input
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}