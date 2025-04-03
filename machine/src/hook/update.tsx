import { useEffect, useState } from "react";
import useConfig from "./Config/useConfig";

export default function useStateConfig() {
  const context = useConfig();
  const [state, setState] = useState(context.machines[context.index]);

  useEffect(() => {
    
  })
}


