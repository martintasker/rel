import React, {ReactElement, ReactNode} from 'react';

type FlexDirection = 'row' | 'column';
type FlexGap = 0 | 4 | 8 | 12 | 16;

type Props = {
  direction: FlexDirection;
  gap?: FlexGap;
  children: ReactNode;
  style?: {[styleAttribute: string]: any};
  className?: string;
};

export default function UFlexbox({
  direction,
  children,
  gap,
  style,
  className,
}: Props): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        justifyContent: 'stretch',
        gap,
        ...style,
      }}
      {...{className}}
    >
      {children}
    </div>
  );
}
