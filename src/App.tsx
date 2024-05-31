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
        <Diagram width={400} height={300}>
          <XTGrid />
        </Diagram>
        <Diagram width={400} height={300}>
          <XCTGrid />
        </Diagram>
      </UFlexbox>
    </UPage>
  );
}
