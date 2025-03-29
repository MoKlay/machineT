import { Key } from "../hook/Context"
import useConfig from "../hook/useConfig"
import Rule from "./Rules/Rule"

export default function RolesInputs() {
  const context = useConfig()[Key.transitions]
  const massRole = Object.values(context).map((v) => Object.keys(v)).reduce((a,v) => [...a, ...v], [])


  return (
    <div className="roles">
    <p>δ:</p>
      {
        massRole.map((_, i) => (
          <Rule key={i}/>
        ))
      }
    </div>
  )
}