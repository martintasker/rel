import React, {ReactElement, ReactNode, createContext, useMemo} from 'react';

type Props = {
  pixelSize: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  children: ReactNode;
};

type URFigureContextType = {
  pixelSize: [number, number];
  xRange: [number, number];
  yRange: [number, number];
  xf: (x: number) => number;
  yf: (y: number) => number;
  backgroundColor: string;
  strokeColor: string;
  unitStrokeWidth: number;
};

const defaultFigureContext: URFigureContextType = {
  pixelSize: [100, 100],
  xRange: [0, 1],
  yRange: [0, 1],
  xf: (x) => x,
  yf: (y) => y,
  backgroundColor: '#111',
  strokeColor: '#888',
  unitStrokeWidth: 0.03,
};

export const URFigureContext =
  createContext<URFigureContextType>(defaultFigureContext);

export function URFigure({
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
  const {backgroundColor} = defaultFigureContext;
  const xScale = width / figWidth;
  const yScale = height / figHeight;
  const scale = Math.min(xScale, yScale);
  const dx = 0.5 * (width - scale * (xMax - xMin));
  const dy = 0.5 * (height - scale * (yMax - yMin));
  const unitStrokeWidth = 1 / scale;

  const value: URFigureContextType = useMemo(
    () => ({
      ...defaultFigureContext,
      pixelSize,
      xRange,
      yRange,
      xf: (x) => x - xMin,
      yf: (y) => yMax - y,
      unitStrokeWidth,
    }),
    [pixelSize, unitStrokeWidth, xMin, xRange, yMax, yRange],
  );

  return (
    <URFigureContext.Provider value={value}>
      <div style={{width, height}}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" orient="auto">
              <line x1="100" y1="0" x2="0" y2="5" stroke="context-stroke" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill={backgroundColor} />
          <g transform={`translate(${dx}, ${dy}) scale(${scale})`}>
            {children}
          </g>
        </svg>
      </div>
    </URFigureContext.Provider>
  );
}
