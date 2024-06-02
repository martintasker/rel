import React, {ReactElement} from 'react';
import UPage from './ui/UPage';
import {UThemeContextProvider} from './ui/UTheme';
import UFlexbox from './ui/UFlexbox';
import {XCTGrid, XTGrid} from './Grids';
import {Figure} from './Figure';

export default function App(): ReactElement {
  return (
    <UThemeContextProvider>
      <AppPage />
    </UThemeContextProvider>
  );
}

function AppPage(): ReactElement {
  return (
    <UPage>
      <UFlexbox direction="column" style={{width: '100%', height: '100%'}}>
        <Figure pixelSize={[400, 300]} xRange={[-1, 9]} yRange={[-1, 9]}>
          <XTGrid xRange={[0, 8]} tRange={[0, 8]} />
        </Figure>
        <Figure pixelSize={[400, 300]} xRange={[-4, 4]} yRange={[-4, 4]}>
          <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} />
        </Figure>
      </UFlexbox>
    </UPage>
  );
}
