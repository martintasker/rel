import React, {ReactElement, useContext} from 'react';
import {URFigureContext} from './URFigure';
import useGetStrokeWidth from './useGetStrokeWidth';

type Props = {
  p1: [number, number];
  p2: [number, number];
  strokeColor?: string | undefined;
  strokeWidth?: 0 | 1 | -1 | undefined;
  dashStyle?: string | undefined;
  startArrow?: boolean | undefined;
};

export function URLine({
  p1: [x1, y1],
  p2: [x2, y2],
  strokeColor = '#fff',
  strokeWidth = 0,
  dashStyle,
  startArrow = true,
}: Props): ReactElement {
  const {xf, yf} = useContext(URFigureContext);
  const figureStrokeWidth = useGetStrokeWidth(strokeWidth);
  const markers = {
    markerEnd: 'url(#arrow)',
  };
  return (
    <line
      x1={xf(x1)}
      y1={yf(y1)}
      x2={xf(x2)}
      y2={yf(y2)}
      stroke={strokeColor}
      strokeWidth={figureStrokeWidth}
      strokeDasharray={strokeDashArray(dashStyle)}
      {...markers}
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
