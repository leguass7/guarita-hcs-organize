import { AppTheme } from './components/AppTheme'
import { AppVersion } from './components/AppVersion'
import { PageOrganize } from './pages/PageOrganize'
import { GlobalStyle } from './styles/GlobalStyle'
import { appTheme } from './styles/theme'

export function App() {
  // ...
  return (
    <AppTheme theme={appTheme}>
      <AppVersion />
      <GlobalStyle />
      <PageOrganize />
    </AppTheme>
  )
}
