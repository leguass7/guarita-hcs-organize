import { Dispatch, SetStateAction } from 'react'

export interface IThemeSpacing {
  s: number
  m: number
  l: number
  xl: number
}

export interface ThemeColors {
  primary: string
  secondary: string
  contrast: string
  text: string
  border: string
  white: string
  black: string
  shadow: string
  textDark: string
  background: string
}
export interface IAppTheme {
  colors: ThemeColors
  spacing: IThemeSpacing
  rounded: number
  borderWidth: number
}

export interface IThemeContext {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
  theme: IAppTheme
  setTheme: Dispatch<SetStateAction<IAppTheme>>
  matchRules: MatchingRules
}

export type VariantColorsTypes = keyof ThemeColors

export type TextColor = string
// @ts-ignore
export type MatchingRules = [...VariantColorsTypes[], TextColor][]

export interface IUseAppTheme extends Omit<IThemeContext, 'matchRules'> {
  matchingBackgroudText: (themeKeyColor?: VariantColorsTypes, defColor?: string) => string
}

export type ThemeProviderProps = {
  theme: IAppTheme
}
