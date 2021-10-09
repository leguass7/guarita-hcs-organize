import type { IAppTheme, IThemeSpacing } from '../components/AppTheme/types'

const rounded = 5
const spacing: IThemeSpacing = {
  s: 4,
  m: 6,
  l: 10,
  xl: 14
}

export const appTheme: IAppTheme = {
  colors: {
    primary: '#0E2841',
    secondary: '#0D7ECC',
    contrast: '#BB1806',
    text: '#ffffff',
    white: '#FFFFFF',
    black: '#000000',
    border: '#ccc',
    shadow: '#C3C3C3',
    textDark: '#808080',
    background: '#EDEDED'
  },
  spacing,
  rounded,
  borderWidth: 1
}
