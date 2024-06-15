import './UPage.css';
import React, {ReactElement, ReactNode, useContext} from 'react';
import {UThemeContext} from './UTheme';

type Props = {
  children: ReactNode;
  isScrollable?: boolean;
};

export default function UPage({
  isScrollable = false,
  children,
}: Props): ReactElement {
  const {backgroundColor, color} = useContext(UThemeContext);
  return (
    <div
      className="UPage"
      style={{
        backgroundColor,
        color,
        overflowY: isScrollable ? 'auto' : 'hidden',
      }}
    >
      {children}
    </div>
  );
}
