export enum PatternType {
  hatchPattern = "hatchPattern"
}
export function urlPattern(id: PatternType) {
  return `url(#${id})`;
}