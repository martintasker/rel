import './UTitle.css';
import React, {ReactElement, useContext} from 'react';
import {UThemeContext} from './UTheme';

type Props = {
  title: string;
};

export default function UTitle({title}: Props): ReactElement {
  const {backgroundEmphasisColor: backgroundColor} = useContext(UThemeContext);
  return (
    <div className="UTitle" style={{backgroundColor}}>
      <h2>{title}</h2>
    </div>
  );
}
