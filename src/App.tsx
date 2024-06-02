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
        <Figure pixelSize={[400, 300]} xRange={[-3, 7]} yRange={[-3, 7]}>
          <XTGrid xRange={[-2, 6]} tRange={[-2, 6]} />
        </Figure>
        <Figure pixelSize={[400, 300]} xRange={[-5, 5]} yRange={[-5, 5]}>
          <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} />
        </Figure>
      </UFlexbox>
    </UPage>
  );
}
