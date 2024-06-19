import React, {ReactElement, useContext} from 'react';
import {URFigureContext} from './URFigure';
import useGetStrokeWidth from './useGetStrokeWidth';

type Props = {
  p1: [number, number];
  p2: [number, number];
  strokeColor?: string | undefined;
  strokeWidth?: 0 | 1 | -1 | undefined;
  dashStyle?: string | undefined;
  hasEndArrow?: boolean;
};

export function URLine({
  p1: [x1, y1],
  p2: [x2, y2],
  strokeColor = '#fff',
  strokeWidth = 0,
  dashStyle,
  hasEndArrow = false,
}: Props): ReactElement {
  const {xf, yf} = useContext(URFigureContext);
  const figureStrokeWidth = useGetStrokeWidth(strokeWidth);
  const xf1 = xf(x1);
  const yf1 = yf(y1);
  const xf2 = xf(x2);
  const yf2 = yf(y2);
  return (
    <>
      <line
        x1={xf1}
        y1={yf1}
        x2={xf2}
        y2={yf2}
        stroke={strokeColor}
        strokeWidth={figureStrokeWidth}
        strokeDasharray={strokeDashArray(dashStyle)}
      />
      {hasEndArrow && (
        <EndArrow
          p1={[xf1, yf1]}
          p2={[xf2, yf2]}
          stroke={strokeColor}
          strokeWidth={figureStrokeWidth}
        />
      )}
    </>
  );
}

type EndArrowProps = {
  p1: [number, number];
  p2: [number, number];
  stroke: string;
  strokeWidth: number;
};

function EndArrow({
  p1: [x1, y1],
  p2: [x2, y2],
  stroke,
  strokeWidth,
}: EndArrowProps): ReactElement {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.sqrt(dx * dx + dy * dy);
  const {unitStrokeWidth: w} = useContext(URFigureContext);
  if (d === 0) {
    return null;
  }
  const u = [dx / d, dy / d];
  const v = [-dy / d, dx / d];
  const um = 10 * w;
  const vm = 3 * w;
  const arrowPoints = [];
  arrowPoints.push([x2 - um * u[0] + vm * v[0], y2 - um * u[1] + vm * v[1]]);
  arrowPoints.push([x2, y2]);
  arrowPoints.push([x2 - um * u[0] - vm * v[0], y2 - um * u[1] - vm * v[1]]);
  return (
    <polyline
      points={arrowPoints
        .map((point) => point.map((coord) => String(coord)).join(','))
        .join(' ')}
      {...{stroke, strokeWidth}}
      fill="transparent"
    />
  );
}

function strokeDashArray(dashStyle: string): string | undefined {
  switch (dashStyle) {
    case '...':
      return '0.1';
    default:
      return undefined;
  }
}
