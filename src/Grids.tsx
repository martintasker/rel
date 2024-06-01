import React, {ReactElement} from 'react';

type XTGridProps = {
  xRange: [number, number];
  tRange: [number, number];
};

export function XTGrid({
  xRange: [xMin, xMax],
  tRange: [tMin, tMax],
}: XTGridProps): ReactElement {
  return (
    <>
      <line
        x1={x(xMin)}
        x2={x(xMax)}
        y1={y(0)}
        y2={y(0)}
        strokeWidth="0.05"
        stroke="#666"
      />
      <line
        x1={x(0)}
        x2={x(0)}
        y1={y(tMin)}
        y2={y(tMax)}
        strokeWidth="0.05"
        stroke="#666"
      />
    </>
  );

  function x(xDiagram: number): number {
    return xDiagram - xMin;
  }

  function y(tDiagram: number): number {
    return tMax - tDiagram;
  }
}

type XCTGridProps = {
  xRange: [number, number];
  ctRange: [number, number];
};

export function XCTGrid({
  xRange: [xMin, xMax],
  ctRange: [ctMin, ctMax],
}: XCTGridProps): ReactElement {
  return (
    <>
      <line
        x1={x(xMin)}
        x2={x(xMax)}
        y1={y(0)}
        y2={y(0)}
        strokeWidth="0.05"
        stroke="#666"
      />
      <line
        x1={x(0)}
        x2={x(0)}
        y1={y(ctMin)}
        y2={y(ctMax)}
        strokeWidth="0.05"
        stroke="#666"
      />
    </>
  );

  function x(xDiagram: number): number {
    return xDiagram - xMin;
  }

  function y(ctDiagram: number): number {
    return ctMax - ctDiagram;
  }
}
