import React, {ReactElement} from 'react';
import {rangeFromTo} from '../util/range';
import {clip} from '../util/clip';
import {URLine} from './URLine';

type XTGridProps = {
  xRange: [number, number];
  tRange: [number, number];
  v?: number;
  strokeColor?: string;
};

export function XTGrid({
  xRange: [xMin, xMax], // rest frame min, max
  tRange: [tMin, tMax], // rest frame min, max
  v = 0, // v relative to rest frame
  strokeColor = '#8ee',
}: XTGridProps): ReactElement {
  const thinStrokeDashStyle = v === 0 ? '---' : '...';
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
        const isAxis = xp === 0;
        const clippedCoords = clip(
          [xr(xp, tpMin), tr(tpMin)],
          [xr(xp, tpMax), tr(tpMax)],
          [xMin, xMax],
          [tMin, tMax],
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
            strokeWidth={isAxis ? 0 : -1}
            dashStyle={isAxis ? '---' : thinStrokeDashStyle}
            hasEndArrow={isAxis}
            {...{strokeColor}}
          />
        );
      })}
      {rangeFromTo(tpMin, tpMax).map((tp) => {
        const clippedCoords = clip(
          [xr(xpMin, tp), tr(tp)],
          [xr(xpMax, tp), tr(tp)],
          [xMin, xMax],
          [tMin, tMax],
        );
        if (clippedCoords == null) {
          return <></>;
        }
        const [x1c, t1c, x2c, t2c] = clippedCoords;
        const isAxis = tp === 0;
        return (
          <URLine
            key={tp}
            p1={[x1c, t1c]}
            p2={[x2c, t2c]}
            strokeWidth={isAxis ? 0 : -1}
            dashStyle={isAxis ? '---' : thinStrokeDashStyle}
            hasEndArrow={isAxis}
            {...{strokeColor}}
          />
        );
      })}
    </>
  );
}
