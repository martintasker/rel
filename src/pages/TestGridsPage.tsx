import React, {ReactElement} from 'react';
import UFlexbox from '../ui/UFlexbox';
import {XCTGrid, XTGrid} from '../components/Grids';
import {Figure} from '../components/Figure';

export default function TestGridsPage(): ReactElement {
  return (
    <>
      <h1>Test grids</h1>
      <UFlexbox direction="row">
        <UFlexbox direction="column">
          <Figure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
            <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} />
          </Figure>
          <Figure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
            <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} />
          </Figure>
        </UFlexbox>
        <UFlexbox direction="column">
          <Figure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
            <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} v={0.5} />
          </Figure>
          <Figure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
            <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} beta={0.5} />
          </Figure>
        </UFlexbox>
        <UFlexbox direction="column">
          <Figure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
            <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} v={-0.25} />
          </Figure>
          <Figure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
            <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} beta={-0.25} />
          </Figure>
        </UFlexbox>
      </UFlexbox>
    </>
  );
}
