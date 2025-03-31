import Node from "../components/graph/Node";
import Pattern from "../components/graph/pattern";


export default function Graph() {
  return (
    <div className="graph">
      <svg>
        <Pattern />
        <Node title="text" x={50} y={50} end start/>
      </svg>

    </div>
  )
}
