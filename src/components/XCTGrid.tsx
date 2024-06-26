import React, {ReactElement} from 'react';
import {rangeFromTo} from '../util/range';
import {clip} from '../util/clip';
import {URLine} from './URLine';

type XCTGridProps = {
  xRange: [number, number];
  ctRange: [number, number];
  beta?: number;
  strokeColor?: string;
};

export function XCTGrid({
  xRange: [xMin, xMax],
  ctRange: [ctMin, ctMax],
  beta = 0,
  strokeColor = '#aaf',
}: XCTGridProps): ReactElement {
  const thinStrokeDashStyle = beta === 0 ? '---' : '...';

  const gamma = 1 / Math.sqrt(1 - beta * beta);
  // backward Lorentz transform -- (x', ct') -> (x, ct)
  const xr = (xp: number, ctp: number) => gamma * xp + gamma * beta * ctp;
  const ctr = (xp: number, ctp: number) => gamma * beta * xp + gamma * ctp;
  // forward Galilean transform -- (x, t) -> (x', t')
  const xp = (x: number, ct: number) => gamma * x - gamma * beta * ct;
  const ctp = (x: number, ct: number) => -gamma * beta * x + gamma * ct;
  // min/max coords in (x', ct')
  const xpMin = Math.ceil(xp(xMin, beta >= 0 ? ctMax : ctMin));
  const xpMax = Math.floor(xp(xMax, beta >= 0 ? ctMin : ctMax));
  const ctpMin = Math.ceil(ctp(beta >= 0 ? xMax : xMin, ctMin));
  const ctpMax = Math.floor(ctp(beta >= 0 ? xMin : xMax, ctMax));

  return (
    <>
      {rangeFromTo(xpMin, xpMax).map((xp) => {
        const clippedCoords = clip(
          [xr(xp, ctpMin), ctr(xp, ctpMin)],
          [xr(xp, ctpMax), ctr(xp, ctpMax)],
          [xMin, xMax],
          [ctMin, ctMax],
        );
        if (clippedCoords == null) {
          return null;
        }
        const [x1c, ct1c, x2c, ct2c] = clippedCoords;
        const isAxis = xp === 0;
        return (
          <URLine
            key={xp}
            p1={[x1c, ct1c]}
            p2={[x2c, ct2c]}
            strokeWidth={isAxis ? 0 : -1}
            dashStyle={isAxis ? '---' : thinStrokeDashStyle}
            hasEndArrow={isAxis}
            {...{strokeColor}}
          />
        );
      })}
      {rangeFromTo(ctpMin, ctpMax).map((ctp) => {
        const clippedCoords = clip(
          [xr(xpMin, ctp), ctr(xpMin, ctp)],
          [xr(xpMax, ctp), ctr(xpMax, ctp)],
          [xMin, xMax],
          [ctMin, ctMax],
        );
        if (clippedCoords == null) {
          return null;
        }
        const [x1c, ct1c, x2c, ct2c] = clippedCoords;
        const isAxis = ctp === 0;
        return (
          <URLine
            key={ctp}
            p1={[x1c, ct1c]}
            p2={[x2c, ct2c]}
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
