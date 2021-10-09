import { useContext, useCallback } from 'react'

import { ThemeContext } from './ThemeContext'
import type { MatchingRules, VariantColorsTypes, TextColor, IUseAppTheme } from './types'

export function useAppTheme(): IUseAppTheme {
  const { theme, isDark, matchRules, setTheme, setIsDark } = useContext(ThemeContext)

  /**
   * @function matchingBackgroudText
   * @description
   * Procura a cor ideal para o texto correspondendo com a cor de fundo do tema.
   * As regras são configuradas na constante `matchRules`
   * @example
   * matchingBackgroudText('primary') // return #ffffff
   */
  const matchingBackgroudText = useCallback(
    (themeKeyColor?: VariantColorsTypes, defColor?: TextColor) => {
      return themeKeyColor
        ? findMatches(matchRules, themeKeyColor, defColor || theme.colors.text)
        : defColor || theme.colors.text
    },
    [theme, matchRules]
  )

  return { theme, isDark, setIsDark, matchingBackgroudText, setTheme }
}

function findMatches(rules: MatchingRules, value: VariantColorsTypes, defaultValue = ''): string {
  const [themeColor] = rules.find(word => !!(word && word.slice(0, word.length - 1)?.includes(value)))?.slice(-1) || [
    defaultValue
  ]
  return themeColor
}
