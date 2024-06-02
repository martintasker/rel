import React, {ReactElement, useContext} from 'react';
import {FigureContext} from './Figure';
import {rangeFromTo} from './util/range';

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
  return (
    <>
      {rangeFromTo(xMin, xMax).map((x) => (
        <line
          key={x}
          x1={xf(x)}
          x2={xf(x)}
          y1={yf(tMin)}
          y2={yf(tMax)}
          stroke={strokeColor}
          strokeWidth={x === 0 ? fatStrokeWidth : thinStrokeWidth}
        />
      ))}
      {rangeFromTo(tMin, tMax).map((t) => (
        <line
          key={t}
          x1={xf(xMin)}
          x2={xf(xMax)}
          y1={yf(t)}
          y2={yf(t)}
          stroke={strokeColor}
          strokeWidth={t === 0 ? fatStrokeWidth : thinStrokeWidth}
        />
      ))}
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
        />
      ))}
    </>
  );
}
