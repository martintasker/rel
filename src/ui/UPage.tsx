import './UPage.css';
import React, {ReactElement, ReactNode, useContext} from 'react';
import {UThemeContext} from './UTheme';

type Props = {
  children: ReactNode;
};

export default function UPage({children}: Props): ReactElement {
  const {backgroundColor, color} = useContext(UThemeContext);
  return (
    <div
      className="UPage"
      style={{
        backgroundColor,
        color,
      }}
    >
      {children}
    </div>
  );
}
