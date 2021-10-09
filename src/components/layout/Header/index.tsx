import React from 'react'

import { LogoDSSvg } from '../../images/LogoDSSvg'
import { HeaderContainer, LogoContainer, HeaderRow } from './styles'

export const Header: React.FC = ({ children }) => {
  return (
    <HeaderContainer>
      <HeaderRow>
        <LogoContainer>
          <LogoDSSvg width={120} />
        </LogoContainer>
        {children}
      </HeaderRow>
    </HeaderContainer>
  )
}
