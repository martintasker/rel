import React, {ReactElement, useContext} from 'react';
import {FigureContext} from './Figure';

type XTGridProps = {
  xRange: [number, number];
  tRange: [number, number];
};

export function XTGrid({
  xRange: [xMin, xMax],
  tRange: [tMin, tMax],
}: XTGridProps): ReactElement {
  const {xf, yf, fatStrokeWidth, thinStrokeWidth, strokeColor} =
    useContext(FigureContext);
  const xLines = [];
  for (let x = xMin; x <= xMax; x += 1) {
    xLines.push(
      <line
        key={x}
        x1={xf(x)}
        x2={xf(x)}
        y1={yf(tMin)}
        y2={yf(tMax)}
        stroke={strokeColor}
        strokeWidth={x === 0 ? fatStrokeWidth : thinStrokeWidth}
      />,
    );
  }
  const tLines = [];
  for (let t = tMin; t <= tMax; t += 1) {
    tLines.push(
      <line
        key={t}
        x1={xf(xMin)}
        x2={xf(xMax)}
        y1={yf(t)}
        y2={yf(t)}
        stroke={strokeColor}
        strokeWidth={t === 0 ? fatStrokeWidth : thinStrokeWidth}
      />,
    );
  }
  return (
    <>
      {xLines}
      {tLines}
    </>
  );
}

type XCTGridProps = {
  xRange: [number, number];
  ctRange: [number, number];
};

export function XCTGrid({
  xRange: [xMin, xMax],
  ctRange: [ctMin, ctMax],
}: XCTGridProps): ReactElement {
  const {xf, yf, fatStrokeWidth, strokeColor} = useContext(FigureContext);
  return (
    <>
      <line
        x1={xf(xMin)}
        x2={xf(xMax)}
        y1={yf(0)}
        y2={yf(0)}
        strokeWidth={fatStrokeWidth}
        stroke={strokeColor}
      />
      <line
        x1={xf(0)}
        x2={xf(0)}
        y1={yf(ctMin)}
        y2={yf(ctMax)}
        strokeWidth={fatStrokeWidth}
        stroke={strokeColor}
      />
    </>
  );
}
