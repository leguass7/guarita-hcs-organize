import React from 'react'

import { OrganizeProvider } from './OrganizeProvider'
import { SideLoaded } from './SideLoaded'
import { SideSummary } from './SideSummary'
import { OreganizeContainer, Content, Side } from './styles'

type Props = {
  height?: number
}
export const Organize: React.FC<Props> = ({ height }) => {
  return (
    <OrganizeProvider>
      <OreganizeContainer>
        <Side>
          <SideSummary />
        </Side>
        <Content layoutHeight={height}>
          <SideLoaded />
        </Content>
      </OreganizeContainer>
    </OrganizeProvider>
  )
}
