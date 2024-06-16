import React, {ReactElement} from 'react';
import UFlexbox from '../ui/UFlexbox';
import {URFigure} from '../components/URFigure';
import {XTGrid} from '../components/XTGrid';
import {XCTGrid} from '../components/XCTGrid';

export default function TestGridsPage(): ReactElement {
  return (
    <>
      <h1>Test grids</h1>
      <UFlexbox direction="row">
        <UFlexbox direction="column">
          <URFigure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
            <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} />
          </URFigure>
          <URFigure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
            <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} />
          </URFigure>
        </UFlexbox>
        <UFlexbox direction="column">
          <URFigure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
            <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} v={0.5} />
          </URFigure>
          <URFigure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
            <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} beta={0.5} />
          </URFigure>
        </UFlexbox>
        <UFlexbox direction="column">
          <URFigure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
            <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} v={-0.25} />
          </URFigure>
          <URFigure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
            <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} beta={-0.25} />
          </URFigure>
        </UFlexbox>
      </UFlexbox>
    </>
  );
}
