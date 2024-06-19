import React, {ReactElement} from 'react';
import UFlexbox from '../ui/UFlexbox';
import {URFigure} from '../components/URFigure';
import {XTGrid} from '../components/XTGrid';
import {URLine} from '../components/URLine';

export default function TestGridsPage(): ReactElement {
  return (
    <>
      <h1>Introducing (x, t)</h1>
      <UFlexbox direction="row">
        <UFlexbox direction="column">
          <h2>Alice and Charlie throwing rocks, Bob's frame</h2>
          <URFigure pixelSize={[600, 600]} xRange={[-1, 9]} yRange={[-1, 9]}>
            <XTGrid xRange={[0, 8]} tRange={[0, 8]} />
            <URLine
              p1={[0, 0]}
              p2={[0, 8]}
              strokeWidth={1}
              hasEndArrow={true}
            />
            <URLine
              p1={[0, 0]}
              p2={[4, 8]}
              strokeWidth={1}
              hasEndArrow={true}
            />
            <URLine
              p1={[4, 0]}
              p2={[8, 8]}
              strokeWidth={1}
              hasEndArrow={true}
            />
            <URLine p1={[1, 2]} p2={[7, 6]} hasEndArrow={true} />
            <URLine p1={[5, 2]} p2={[3, 6]} hasEndArrow={true} />
          </URFigure>
        </UFlexbox>
        <UFlexbox direction="column">
          <h2>Alice and Charlie throwing rocks, Alice's frame</h2>
          <URFigure pixelSize={[600, 600]} xRange={[-5, 5]} yRange={[-1, 9]}>
            <XTGrid xRange={[-4, 4]} tRange={[0, 8]} />
            <URLine
              p1={[0, 0]}
              p2={[-4, 8]}
              strokeWidth={1}
              hasEndArrow={true}
            />
            <URLine
              p1={[0, 0]}
              p2={[0, 8]}
              strokeWidth={1}
              hasEndArrow={true}
            />
            <URLine
              p1={[4, 0]}
              p2={[4, 8]}
              strokeWidth={1}
              hasEndArrow={true}
            />
            <URLine p1={[0, 2]} p2={[4, 6]} hasEndArrow={true} />
            <URLine p1={[4, 2]} p2={[0, 6]} hasEndArrow={true} />
          </URFigure>
        </UFlexbox>
      </UFlexbox>
    </>
  );
}
