import React, { useState, useMemo } from 'react'

import { ThemeContext } from './ThemeContext'
import type { MatchingRules, ThemeProviderProps } from './types'

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme: themeConfig }) => {
  const [isDark, setIsDark] = useState(false)

  const [theme, setTheme] = useState(themeConfig)

  // @ts-ignore
  const matchRules: MatchingRules = useMemo(
    () => [
      ['primary', 'secondary', 'contrast', 'black', theme.colors.white],
      ['white', theme.colors.black],
      ['border', theme.colors.black]
    ],
    [theme]
  )

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, theme, setTheme, matchRules }}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider
