import React, {ReactElement, useContext} from 'react';
import {URFigureContext} from './URFigure';

type Props = {
  p1: [number, number];
  p2: [number, number];
  strokeColor?: string | undefined;
  strokeWidth?: number | undefined;
  dashStyle?: string | undefined;
};

export function URLine({
  p1: [x1, y1],
  p2: [x2, y2],
  strokeColor = '#fff',
  strokeWidth = 1,
  dashStyle,
}: Props): ReactElement {
  const {xf, yf} = useContext(URFigureContext);
  return (
    <line
      x1={xf(x1)}
      y1={yf(y1)}
      x2={xf(x2)}
      y2={yf(y2)}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDashArray(dashStyle)}
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
