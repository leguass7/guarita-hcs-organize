import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import type { AppData } from '../../electron/bridge'

export const AppVersion: React.FC = () => {
  const [version, setVersion] = useState<AppData>()

  useEffect(() => {
    const whatVersion = async () => {
      if (!version) {
        const v = await window.Main.getAppVersion()
        console.log(v?.path)
        setVersion(v)
      }
    }
    whatVersion()
  }, [version])

  return (
    <Helmet>
      <title>{`Avatar HCS Organize ${version ? `v${version?.version}` : ''}`}</title>
    </Helmet>
  )
}
