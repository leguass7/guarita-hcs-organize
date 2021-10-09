import React from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'

import ThemeProvider from './Provider'
import { ThemeProviderProps } from './types'

export const AppTheme: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeProvider>
  )
}
