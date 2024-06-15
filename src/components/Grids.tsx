import React, {ReactElement, useContext} from 'react';
import {FigureContext} from './Figure';
import {rangeFromTo} from '../util/range';
import {clip} from '../util/clip';

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
  beta?: number;
};

export function XCTGrid({
  xRange: [xMin, xMax],
  ctRange: [ctMin, ctMax],
  beta = 0,
}: XCTGridProps): ReactElement {
  const thinStrokeDashArray = beta === 0 ? undefined : '0.1';
  const {xf, yf, fatStrokeWidth, thinStrokeWidth, strokeColor} =
    useContext(FigureContext);

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
          xr(xp, ctpMin),
          ctr(xp, ctpMin),
          xr(xp, ctpMax),
          ctr(xp, ctpMax),
          xMin,
          xMax,
          ctMin,
          ctMax,
        );
        if (clippedCoords == null) {
          return <></>;
        }
        const [x1c, ct1c, x2c, ct2c] = clippedCoords;
        return (
          <line
            key={xp}
            x1={xf(x1c)}
            y1={yf(ct1c)}
            x2={xf(x2c)}
            y2={yf(ct2c)}
            stroke={strokeColor}
            strokeWidth={xp === 0 ? fatStrokeWidth : thinStrokeWidth}
            strokeDasharray={strokeDashArray(xp, thinStrokeDashArray)}
          />
        );
      })}
      {rangeFromTo(ctpMin, ctpMax).map((ctp) => {
        const clippedCoords = clip(
          xr(xpMin, ctp),
          ctr(xpMin, ctp),
          xr(xpMax, ctp),
          ctr(xpMax, ctp),
          xMin,
          xMax,
          ctMin,
          ctMax,
        );
        if (clippedCoords == null) {
          return <></>;
        }
        const [x1c, ct1c, x2c, ct2c] = clippedCoords;
        return (
          <line
            key={ctp}
            x1={xf(x1c)}
            y1={yf(ct1c)}
            x2={xf(x2c)}
            y2={yf(ct2c)}
            stroke={strokeColor}
            strokeWidth={ctp === 0 ? fatStrokeWidth : thinStrokeWidth}
            strokeDasharray={strokeDashArray(ctp, thinStrokeDashArray)}
          />
        );
      })}
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
