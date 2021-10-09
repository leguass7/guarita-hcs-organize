import 'styled-components'
import { IAppTheme } from '../components/AppTheme/types'

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}
