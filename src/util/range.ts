export function range(n: number): Array<number> {
  return Array.from(Array(n).keys());
}

export function rangeFromTo(start: number, end: number): Array<number> {
  return range(end - start + 1).map((x) => x + start);
}
