import React, { useCallback, useState } from 'react'

import { Layout } from '../components/layout/Layout'
import { Organize } from '../components/Organize'

export const PageOrganize: React.FC = () => {
  const [layoutDimensions, setLayoutDimensions] = useState({ width: 0, height: 0 })
  const onLayout = useCallback((width: number, height: number) => {
    setLayoutDimensions({ width, height })
  }, [])
  return (
    <Layout onLayout={onLayout}>
      <Organize height={layoutDimensions.height} />
    </Layout>
  )
}
