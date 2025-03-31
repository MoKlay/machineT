import { PatternType } from "./pattern.types";

export default function Pattern() {
  return (
    <defs>
      <pattern
        id={PatternType.hatchPattern}
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
      >
        <line x1="0" y1="0" x2="10" y2="10" stroke="black"  />
      </pattern>
    </defs>
  );
}
