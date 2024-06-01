import React, {ReactElement} from 'react';
import UPage from './ui/UPage';
import {UThemeContextProvider} from './ui/UTheme';
import UFlexbox from './ui/UFlexbox';
import {XCTGrid, XTGrid} from './Grids';
import {Diagram} from './Diagram';

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
        <Diagram pixelSize={[400, 300]} figureSize={[10, 10]}>
          <XTGrid xRange={[0, 8]} tRange={[0, 8]} />
        </Diagram>
        <Diagram pixelSize={[400, 300]} figureSize={[10, 10]}>
          <XCTGrid xRange={[-4, 4]} ctRange={[-4, 4]} />
        </Diagram>
      </UFlexbox>
    </UPage>
  );
}
