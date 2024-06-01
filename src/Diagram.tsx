import React, {ReactElement, ReactNode} from 'react';

type Props = {
  pixelSize: [number, number];
  figureSize: [number, number];
  children: ReactNode;
};

export function Diagram({
  pixelSize: [width, height],
  figureSize: [figWidth, figHeight],
  children,
}: Props): ReactElement {
  const xScale = width / figWidth;
  const yScale = height / figHeight;
  const scale = Math.min(xScale, yScale);
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <rect width="100%" height="100%" fill="#222" />
      <g transform={`scale(${scale})`}>{children}</g>
    </svg>
  );
}
