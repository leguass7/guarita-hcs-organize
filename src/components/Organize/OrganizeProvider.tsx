import React, { createContext, useCallback, useContext, useState } from 'react'

import type { IReadedIndex } from '../../../electron/helpers/files'
import { IOrganizeContext } from './types'

export const OrganizeContext = createContext<IOrganizeContext>({} as IOrganizeContext)

export const OrganizeProvider: React.FC = ({ children }) => {
  const [loadedIndex, setLoadedIndex] = useState<IReadedIndex[][]>([])
  const [outPath, setOutPath] = useState<string>('')

  const findFileIndexies = useCallback(async path => {
    const indexies = await window.Main.findIndexies(path)
    if (indexies) {
      const loaded = await window.Main.loadIndexies(indexies)
      setLoadedIndex(loaded)
    }
  }, [])

  const processAllIndexFiles = useCallback(
    async (list: IReadedIndex[], outDir?: string) => {
      const processed = await window.Main.processAllIndexFiles(list, outDir || outPath)
      return processed
    },
    [outPath]
  )

  return (
    <OrganizeContext.Provider value={{ findFileIndexies, loadedIndex, processAllIndexFiles, outPath, setOutPath }}>
      {children}
    </OrganizeContext.Provider>
  )
}

export function useOrganize() {
  const { findFileIndexies, loadedIndex, processAllIndexFiles, outPath, setOutPath } = useContext(OrganizeContext)
  return { findFileIndexies, loadedIndex, processAllIndexFiles, outPath, setOutPath }
}
