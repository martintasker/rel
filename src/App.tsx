import React, {ReactElement} from 'react';
import UPage from './ui/UPage';
import {UThemeContextProvider} from './ui/UTheme';
import TestGridsPage from './pages/TestGridsPage';
import XTIntroPage from './pages/XTIntroPage';

export default function App(): ReactElement {
  return (
    <UThemeContextProvider>
      <AppPage />
    </UThemeContextProvider>
  );
}

function AppPage(): ReactElement {
  return (
    <UPage isScrollable={true}>
      <TestGridsPage />
      <XTIntroPage />
    </UPage>
  );
}
