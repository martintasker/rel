export function clip(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
): [number, number, number, number] | null {
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
  return [x1c, y1c, x2c, y2c];
}