import React from 'react'

import type { FlexJustify } from '../styled'
import { Tools } from './styles'

type ToolBarProps = {
  justify?: FlexJustify
  size?: number
}

export const ToolBar: React.FC<ToolBarProps> = ({ children, justify = 'flex-start', size = 32 }) => {
  return (
    <Tools size={size} justify={justify}>
      {children}
    </Tools>
  )
}
