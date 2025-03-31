import { PatternType, urlPattern } from "./pattern.types"

interface NodeProps {
  title: string
  x: number
  y: number
  start?: boolean
  end?: boolean
}
export default function Node({title, x, y, start, end}:NodeProps) {
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill={ start && end ? urlPattern(PatternType.hatchPattern) : end ? 'black' :'white'} stroke='black' />
      {start && <circle cx={x} cy={y} r={5} />}
      <text x={x} y={y + 25}  textAnchor="middle">{title}</text>
    </g>
  )
}
