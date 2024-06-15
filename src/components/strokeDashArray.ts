export function strokeDashArray(
  coord: number,
  strokeDashArray: string | undefined,
): string {
  return coord === 0
    ? null
    : strokeDashArray == null
    ? undefined
    : strokeDashArray;
}
