import React, {ReactElement} from 'react';
import UFlexbox from '../ui/UFlexbox';
import {URFigure} from '../components/URFigure';
import {XTGrid} from '../components/XTGrid';

export default function TestGridsPage(): ReactElement {
  return (
    <>
      <h1>Introducing (x, t)</h1>
      <UFlexbox direction="row">
        <UFlexbox direction="column">
          <URFigure pixelSize={[800, 600]} xRange={[-1, 9]} yRange={[-1, 9]}>
            <XTGrid xRange={[0, 8]} tRange={[0, 8]} />
            <XTGrid xRange={[0, 8]} tRange={[0, 8]} v={0.5} />
          </URFigure>
        </UFlexbox>
      </UFlexbox>
    </>
  );
}
