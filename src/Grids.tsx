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
  const {xf, yf} = useContext(FigureContext);
  return (
    <>
      <line
        x1={xf(xMin)}
        x2={xf(xMax)}
        y1={yf(0)}
        y2={yf(0)}
        strokeWidth="0.05"
        stroke="#666"
      />
      <line
        x1={xf(0)}
        x2={xf(0)}
        y1={yf(tMin)}
        y2={yf(tMax)}
        strokeWidth="0.05"
        stroke="#666"
      />
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
  const {xf, yf} = useContext(FigureContext);
  return (
    <>
      <line
        x1={xf(xMin)}
        x2={xf(xMax)}
        y1={yf(0)}
        y2={yf(0)}
        strokeWidth="0.05"
        stroke="#666"
      />
      <line
        x1={xf(0)}
        x2={xf(0)}
        y1={yf(ctMin)}
        y2={yf(ctMax)}
        strokeWidth="0.05"
        stroke="#666"
      />
    </>
  );
}
