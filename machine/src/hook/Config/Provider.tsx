import React, { useEffect } from "react";
import Context, {
  Key,
  State,
  Symbol,
  Transition,
  TuringMachineConfig,
} from "./Context";

export default function Config({ children }: React.PropsWithChildren) {
  const states = React.useState<State[]>([""]);
  const blank = React.useState<Symbol>(Key.blank);
  const separator = React.useState<Symbol>(Key.separator);
  const alphabet = React.useState<Symbol[]>([blank[0], separator[0], ""]);
  const initialState = React.useState<State>("");
  const acceptingState = React.useState<State>("");
  const transitions = React.useState<{
    [key: State]: { [read: Symbol]: Transition };
  }>({});
  const input = React.useState<Symbol[]>([]);

  useEffect(() => {
    const [b, setBlank] = blank
    const [s, setSeparator] = separator
    const a = alphabet[0]

    if (a[0] != b) setBlank(a[0] ? a[0] : '')
    if (a[1] != s) setSeparator(a[1] ? a[1] : '')
  }, [alphabet, blank, separator])

  const contextValue: TuringMachineConfig = {
    [Key.states]: states,
    [Key.alphabet]: alphabet,
    [Key.blank]: blank,
    [Key.initialState]: initialState,
    [Key.acceptingState]: acceptingState,
    [Key.transitions]: transitions,
    [Key.input]: input,
    [Key.separator]: separator,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
