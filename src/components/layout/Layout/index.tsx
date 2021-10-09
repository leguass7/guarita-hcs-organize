import React, { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import { Header } from '../Header'
import { LayoutContainer, LayoutHeader, LayoutContent } from './styles'

type Props = {
  onLayout?: (width: number, height: number) => void
}
export const Layout: React.FC<Props> = ({ children, onLayout }) => {
  const { ref, width, height } = useResizeDetector()

  useEffect(() => {
    if (ref.current && onLayout) {
      onLayout(width, height - 64)
    }
  }, [onLayout, ref, width, height])

  return (
    <LayoutContainer ref={ref}>
      <LayoutHeader>
        <Header />
      </LayoutHeader>
      <LayoutContent>{children}</LayoutContent>
    </LayoutContainer>
  )
}
