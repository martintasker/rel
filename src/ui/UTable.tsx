import './UTable.css';
import React, {CSSProperties, ReactElement} from 'react';

export type ColumnSpec = {
  name: string;
  cell: (props: any) => string;
  width?: string;
  noWrap?: boolean;
  textAlign?: 'end';
};

type Props = {
  columns: ColumnSpec[];
  data: {[key: string]: any}[];
};

export default function UTable({columns, data}: Props): ReactElement {
  const padding = '0 4px';
  return (
    <table className="UTable">
      <colgroup>
        {columns.map(({width, textAlign}, index) => {
          return (
            <col
              key={index}
              style={{
                width,
                textAlign,
                verticalAlign: 'top',
              }}
            />
          );
        })}
      </colgroup>

      <thead>
        <tr>
          {columns.map(({name, width, textAlign}, index) => {
            return (
              <td
                key={index}
                style={{width, maxWidth: width, textAlign, padding}}
              >
                {name}
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(({cell, noWrap, textAlign, width}, cellIndex) => {
              const wrapStyles: CSSProperties = noWrap
                ? {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }
                : undefined;
              return (
                <td
                  key={cellIndex}
                  style={{
                    width,
                    maxWidth: width,
                    padding,
                    textAlign,
                    ...wrapStyles,
                  }}
                >
                  {cell(row)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
