import React from 'react'

import { AppContainer } from '../../AppContainer'
import { TreeReport } from '../../TreeReport'
import { useOrganize } from '../OrganizeProvider'

export const SideLoaded: React.FC = () => {
  const { loadedIndex } = useOrganize()

  return (
    <AppContainer horizontalSpaced verticalSpaced>
      <TreeReport treeList={loadedIndex} />
    </AppContainer>
  )
}
