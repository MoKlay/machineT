import App from "./App";
import Panel from "./components/lenta/Panel";
import useConfig from "./hook/Config/useConfig";
import useRunMachine from "./hook/StatusMachine/useRunMachine";
export default function Machines() {
  const [context, setContext] = useConfig();
  const [{run}] = useRunMachine()

  return (
    <div className="app">
      <div className="config-window" style={run ? {
        userSelect: 'none',
        opacity:'0.4'
      }: undefined}>
        <div className="tab">
          {context.machines.map((_, i) => (
            <div
              key={i}
              className={context.index == i ? "active" : ""}
              onClick={() => setContext.index(i)}
            >
              {i + 1}
              <button onClick={() => setContext.removeMachine(i)}>
                &#x2715;
              </button>
            </div>
          ))}

          <button onClick={() => setContext.addMachine()}>+</button>
        </div>
        <div className="config">
          <App />
        </div>
      </div>
      <Panel />
    </div>
  );
}
