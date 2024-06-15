import React, {ReactElement, useContext} from 'react';
import {FigureContext} from './Figure';
import {rangeFromTo} from './util/range';
import {clip} from './util/clip';

type XTGridProps = {
  xRange: [number, number];
  tRange: [number, number];
  v?: number;
};

export function XTGrid({
  xRange: [xMin, xMax], // rest frame min, max
  tRange: [tMin, tMax], // rest frame min, max
  v = 0, // v relative to rest frame
}: XTGridProps): ReactElement {
  const thinStrokeDashArray = v === 0 ? undefined : '0.1';
  const {xf, yf, fatStrokeWidth, thinStrokeWidth, strokeColor} =
    useContext(FigureContext);
  // backward Galilean transform -- (x', t') -> (x, t)
  const xr = (xp: number, tp: number) => xp + v * tp;
  const tr = (tp: number) => tp;
  // forward Galilean transform -- (x, t) -> (x', t')
  const xp = (x: number, t: number) => x - v * t;
  const tp = (t: number) => t;
  // min/max coords in (x', t')
  const xpMin = Math.ceil(xp(xMin, v >= 0 ? tMax : tMin));
  const xpMax = Math.floor(xp(xMax, v >= 0 ? tMin : tMax));
  const tpMin = tp(tMin);
  const tpMax = tp(tMax);

  return (
    <>
      {rangeFromTo(xpMin, xpMax).map((xp) => {
        const clippedCoords = clip(
          xr(xp, tpMin),
          tr(tpMin),
          xr(xp, tpMax),
          tr(tpMax),
          xMin,
          xMax,
          tMin,
          tMax,
        );
        if (clippedCoords == null) {
          return <></>;
        }
        const [x1c, t1c, x2c, t2c] = clippedCoords;
        return (
          <line
            key={xp}
            x1={xf(x1c)}
            y1={yf(t1c)}
            x2={xf(x2c)}
            y2={yf(t2c)}
            stroke={strokeColor}
            strokeWidth={xp === 0 ? fatStrokeWidth : thinStrokeWidth}
            strokeDasharray={strokeDashArray(xp, thinStrokeDashArray)}
          />
        );
      })}
      {rangeFromTo(tpMin, tpMax).map((tp) => {
        const clippedCoords = clip(
          xr(xpMin, tp),
          tr(tp),
          xr(xpMax, tp),
          tr(tp),
          xMin,
          xMax,
          tMin,
          tMax,
        );
        if (clippedCoords == null) {
          return <></>;
        }
        const [x1c, t1c, x2c, t2c] = clippedCoords;
        return (
          <line
            key={tp}
            x1={xf(x1c)}
            y1={yf(t1c)}
            x2={xf(x2c)}
            y2={yf(t2c)}
            stroke={strokeColor}
            strokeWidth={tp === 0 ? fatStrokeWidth : thinStrokeWidth}
            strokeDasharray={strokeDashArray(tp, thinStrokeDashArray)}
          />
        );
      })}
    </>
  );
}

type XCTGridProps = {
  xRange: [number, number];
  ctRange: [number, number];
  thinStrokeDashArray?: string | undefined;
};

export function XCTGrid({
  xRange: [xMin, xMax],
  ctRange: [ctMin, ctMax],
  thinStrokeDashArray,
}: XCTGridProps): ReactElement {
  const {xf, yf, fatStrokeWidth, thinStrokeWidth, strokeColor} =
    useContext(FigureContext);
  return (
    <>
      {rangeFromTo(xMin, xMax).map((x) => (
        <line
          key={x}
          x1={xf(x)}
          x2={xf(x)}
          y1={yf(ctMin)}
          y2={yf(ctMax)}
          stroke={strokeColor}
          strokeWidth={x === 0 ? fatStrokeWidth : thinStrokeWidth}
          strokeDasharray={strokeDashArray(x, thinStrokeDashArray)}
        />
      ))}
      {rangeFromTo(ctMin, ctMax).map((ct) => (
        <line
          key={ct}
          x1={xf(xMin)}
          x2={xf(xMax)}
          y1={yf(ct)}
          y2={yf(ct)}
          stroke={strokeColor}
          strokeWidth={ct === 0 ? fatStrokeWidth : thinStrokeWidth}
          strokeDasharray={strokeDashArray(ct, thinStrokeDashArray)}
        />
      ))}
    </>
  );
}

function strokeDashArray(
  coord: number,
  strokeDashArray: string | undefined,
): string {
  return coord === 0
    ? null
    : strokeDashArray == null
    ? undefined
    : strokeDashArray;
}
