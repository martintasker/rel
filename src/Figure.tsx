import React, {ReactElement, ReactNode, createContext, useMemo} from 'react';

type Props = {
  pixelSize: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  children: ReactNode;
};

type FigureContextType = {
  pixelSize: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  xf: (x: number) => number;
  yf: (y: number) => number;
};

export const FigureContext = createContext<FigureContextType>({
  pixelSize: [100, 100],
  xRange: [0, 1],
  yRange: [0, 1],
  xf: (x) => x,
  yf: (y) => y,
});

export function Figure({
  pixelSize,
  xRange,
  yRange,
  children,
}: Props): ReactElement {
  const [width, height] = pixelSize;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const figWidth = xMax - xMin;
  const figHeight = yMax - yMin;
  const xScale = width / figWidth;
  const yScale = height / figHeight;
  const scale = Math.min(xScale, yScale);

  const value: FigureContextType = useMemo(
    () => ({
      pixelSize,
      xRange,
      yRange,
      xf: (x) => x - xMin,
      yf: (y) => yMax - y,
    }),
    [pixelSize, xMin, xRange, yMax, yRange],
  );

  return (
    <FigureContext.Provider value={value}>
      <div style={{width, height}}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
        >
          <rect width="100%" height="100%" fill="#222" />
          <g transform={`scale(${scale})`}>{children}</g>
        </svg>
      </div>
    </FigureContext.Provider>
  );
}
