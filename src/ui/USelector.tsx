import React, {useContext} from 'react';
import UFlexbox from './UFlexbox';
import {UThemeContext} from './UTheme';

type Props<T> = {
  options: Readonly<T[]>;
  currentOption: T;
  onChange: (selectedOption: T) => void;
  title?: string;
};

export default function USelector<T>({
  options,
  currentOption,
  onChange,
  title,
}: Props<T>) {
  const {color, backgroundEmphasisColor: backgroundColor} =
    useContext(UThemeContext);
  return (
    <UFlexbox direction="column">
      {title && <div>{title}</div>}
      <select
        value={options.indexOf(currentOption)}
        onChange={handleChange}
        style={{color, backgroundColor}}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {String(option)}
          </option>
        ))}
      </select>
    </UFlexbox>
  );

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const index = e.target.value;
    const option = options[index];
    onChange(option);
  }
}
