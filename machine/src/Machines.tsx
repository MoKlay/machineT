
import App from "./App";
import useConfig from "./hook/Config/useConfig";

export default function Machines() {
  const [context, setContext] = useConfig();
  


  return (
    <div className="app">
      <div className="tab">
        <button onClick={() => setContext.addMachine()}>Добавить</button>
        {context.machines.map((_, i) => (
          <button key={i} onClick={() => setContext.index(i)}>Машина {i + 1}</button>
        ))}
      </div>
      {context.machines.length != 0 && <App />}
    </div>
  );
}
