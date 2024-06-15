import React, {ReactElement} from 'react';
import UFlexbox from '../ui/UFlexbox';
import {Figure} from '../components/Figure';
import {XTGrid} from '../components/XTGrid';
import {XCTGrid} from '../components/XCTGrid';

export default function TestGridsPage(): ReactElement {
  return (
    <>
      <h1>Introducing (x, t)</h1>
      <UFlexbox direction="row">
        <UFlexbox direction="column">
          <Figure pixelSize={[800, 600]} xRange={[-1, 9]} yRange={[-1, 9]}>
            <XTGrid xRange={[0, 8]} tRange={[0, 8]} />
            <XTGrid xRange={[0, 8]} tRange={[0, 8]} v={0.5} />
          </Figure>
        </UFlexbox>
      </UFlexbox>
    </>
  );
}
