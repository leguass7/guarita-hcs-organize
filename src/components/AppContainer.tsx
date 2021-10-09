import React from 'react'
import styled from 'styled-components'

import { useAppTheme } from './AppTheme/useAppTheme'

const Wrapper = styled.div<{ padding: string; mainWidth?: string }>`
  max-width: 100%;
  margin: 0;
  width: ${({ mainWidth }) => mainWidth}px;
  display: block;
  overflow-x: hidden;
  border: 0;
  padding: ${({ padding }) => padding};
`

type ContainerProps = {
  horizontalSpaced?: boolean
  verticalSpaced?: boolean
  width?: number
}

export const AppContainer: React.FC<ContainerProps> = ({ children, horizontalSpaced, verticalSpaced, width }) => {
  const { theme } = useAppTheme()
  const hs = `${horizontalSpaced ? theme.spacing.l : 0}px`
  const vs = `${verticalSpaced ? theme.spacing.l : 0}px`
  const padding = [vs, hs, vs, hs].join(' ')

  return (
    <Wrapper padding={padding} mainWidth={width ? `${width}px` : 'auto'}>
      {children}
    </Wrapper>
  )
}
