import React from 'react'

import { AppContainer } from '../../AppContainer'
import { TreeReport } from '../../TreeReport'
import { CircularProgressFiles } from '../CircularProgressFiles'
import { useOrganize } from '../OrganizeProvider'

export const SideLoaded: React.FC = () => {
  const { loadedIndex, loading } = useOrganize()

  return (
    <AppContainer horizontalSpaced verticalSpaced>
      {loading ? <CircularProgressFiles /> : <TreeReport treeList={loadedIndex} />}
    </AppContainer>
  )
}
