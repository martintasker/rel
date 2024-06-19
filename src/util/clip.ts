export function clip(
  p1: [number, number],
  p2: [number, number],
  xInterval: [number, number],
  yInterval: [number, number],
): [number, number, number, number] | null {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [xMin, xMax] = xInterval;
  const [yMin, yMax] = yInterval;
  let nSwaps = 0;
  if (
    (x1 > xMax && x2 > xMax) ||
    (y1 > yMax && y2 > yMax) ||
    (x1 < xMin && x2 < xMin && y1 < yMin && y2 < yMin)
  ) {
    return null;
  }
  let x1c = x1;
  let y1c = y1;
  let x2c = x2;
  let y2c = y2;
  if (x1c > x2c) {
    const xt = x2c;
    x2c = x1c;
    x1c = xt;
    const yt = y2c;
    y2c = y1c;
    y1c = yt;
    nSwaps++;
  }
  if (x1c < xMin) {
    const dx = x2c - x1c;
    const dy = y2c - y1c;
    const prop = (x2c - xMin) / dx;
    x1c = xMin;
    y1c = y2c - prop * dy;
    if ((dy > 0 && y1c > yMax) || (dy < 0 && y1c < yMin)) {
      return null;
    }
  }
  if (x2c > xMax) {
    const dx = x2c - x1c;
    const dy = y2c - y1c;
    const prop = (xMax - x1c) / dx;
    x2c = xMax;
    y2c = y1c + prop * dy;
    if ((dy > 0 && y2c < yMin) || (dy < 0 && y2c > yMax)) {
      return null;
    }
  }
  if (y1c > y2c) {
    const xt = x2c;
    x2c = x1c;
    x1c = xt;
    const yt = y2c;
    y2c = y1c;
    y1c = yt;
    nSwaps++;
  }
  if (y1c < yMin) {
    const dx = x2c - x1c;
    const dy = y2c - y1c;
    const prop = (y2c - yMin) / dy;
    x1c = x2c - prop * dx;
    y1c = yMin;
    if ((dx > 0 && x1c > xMax) || (dx < 0 && x1c < xMin)) {
      return null;
    }
  }
  if (y2c > yMax) {
    const dx = x2c - x1c;
    const dy = y2c - y1c;
    const prop = (yMax - y1c) / dy;
    x2c = x1c + prop * dx;
    y2c = yMax;
    if ((dx > 0 && x2c < xMin) || (dx < 0 && x2c > xMax)) {
      return null;
    }
  }
  return nSwaps % 2 === 0 ? [x1c, y1c, x2c, y2c] : [x2c, y2c, x1c, y1c];
}
