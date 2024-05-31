import React, {ReactElement, ReactNode, useMemo} from 'react';

type Props = {
  width: number;
  height: number;
  children: ReactNode;
};

export function Diagram({width, height, children}: Props): ReactElement {
  const style = useMemo(
    () => ({
      width: `${width}px`,
      height: `${height}px`,
      border: '1px solid #444',
    }),
    [width, height],
  );
  return <div style={style}>{children}</div>;
}
