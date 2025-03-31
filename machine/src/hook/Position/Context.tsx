import { createContext } from "react";
import { Key, Setter } from "../Config/Context";

type X = number;
type Y = number;
export type Position = [X, Y];

export interface GraphConfig {
  [Key.states]: {
    [state: string]: [Position[], Setter<[X, Y][]>];
  };
}

const context = createContext<GraphConfig>({
  [Key.states]: {}
})

export default context
