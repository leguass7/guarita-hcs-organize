import React from 'react'

import { AppContainer } from '../../AppContainer'
import { TreeReport } from '../../TreeReport'
import { CircularProgressFiles } from '../CircularProgressFiles'
import { useOrganizeLoading } from '../OrganizeProvider'

export const SideLoaded: React.FC = () => {
  const [loading] = useOrganizeLoading()

  return (
    <AppContainer horizontalSpaced verticalSpaced>
      {loading ? <CircularProgressFiles /> : <TreeReport />}
    </AppContainer>
  )
}
