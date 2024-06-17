import React, {ReactElement, useContext} from 'react';
import {URFigureContext} from './URFigure';
import {rangeFromTo} from '../util/range';
import {clip} from '../util/clip';
import {URLine} from './URLine';

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
  const thinStrokeDashStyle = v === 0 ? '---' : '...';
  const {fatStrokeWidth, thinStrokeWidth, strokeColor} =
    useContext(URFigureContext);
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
          <URLine
            key={xp}
            p1={[x1c, t1c]}
            p2={[x2c, t2c]}
            strokeColor={strokeColor}
            strokeWidth={xp === 0 ? fatStrokeWidth : thinStrokeWidth}
            dashStyle={xp === 0 ? '---' : thinStrokeDashStyle}
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
          <URLine
            key={tp}
            p1={[x1c, t1c]}
            p2={[x2c, t2c]}
            strokeColor={strokeColor}
            strokeWidth={tp === 0 ? fatStrokeWidth : thinStrokeWidth}
            dashStyle={tp === 0 ? '---' : thinStrokeDashStyle}
          />
        );
      })}
    </>
  );
}
