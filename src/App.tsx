import React, {ReactElement} from 'react';
import UPage from './ui/UPage';
import {UThemeContextProvider} from './ui/UTheme';
import UFlexbox from './ui/UFlexbox';

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
        <div>Hello!</div>
      </UFlexbox>
    </UPage>
  );
}
