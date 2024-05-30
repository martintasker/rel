import React, {createContext, ReactElement, ReactNode} from 'react';

type UThemeType = {
  backgroundColor: string;
  backgroundEmphasisColor: string;
  scrollHandleColor: string;
  color: string;
};

const DARK_THEME: UThemeType = {
  backgroundColor: '#222228',
  backgroundEmphasisColor: '#33333a',
  scrollHandleColor: '#55555e',
  color: 'white',
};

export const UThemeContext = createContext(DARK_THEME);

type UThemeContextProviderProps = {
  children: ReactNode;
};

export function UThemeContextProvider({
  children,
}: UThemeContextProviderProps): ReactElement {
  return (
    <UThemeContext.Provider value={DARK_THEME}>
      {children}
    </UThemeContext.Provider>
  );
}
