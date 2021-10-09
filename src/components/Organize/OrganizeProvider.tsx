import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { OnReadDirType } from '../../../electron/bridge'
import type { IReadedIndex } from '../../../electron/helpers/files'
import { IOrganizeContext } from './types'

export const OrganizeContext = createContext<IOrganizeContext>({} as IOrganizeContext)

export const OrganizeProvider: React.FC = ({ children }) => {
  const refRegister = useRef(false)
  const [loading, setLoading] = useState(false)
  const [loadedIndex, setLoadedIndex] = useState<IReadedIndex[]>([])
  const [outPath, setOutPath] = useState<string>('')

  const addLoadedIndex = useCallback((dirIndex: IReadedIndex) => {
    setLoadedIndex(old => {
      return [...old.filter(f => f.id !== dirIndex.id), dirIndex]
    })
  }, [])

  const clearLoadedIndex = useCallback(() => {
    setLoadedIndex([])
  }, [])

  const findFileIndexies = useCallback(async path => {
    setLoading(true)
    const indexies = await window.Main.findIndexies(path)
    if (indexies) {
      await window.Main.loadIndexies(indexies)
      setLoading(false)
    }
  }, [])

  const processAllIndexFiles = useCallback(
    async (list: IReadedIndex[], outDir?: string) => {
      const processed = await window.Main.processAllIndexFiles(list, outDir || outPath)
      return processed
    },
    [outPath]
  )

  const onReadFile: OnReadDirType = useCallback(
    (_, file) => {
      addLoadedIndex(file)
    },
    [addLoadedIndex]
  )

  useEffect(() => {
    if (!refRegister.current) {
      window.Main.registerReadDir(onReadFile)
      console.log('REGISTREI')
    }
    return () => window.Main.unregisterReadDir(onReadFile)
  }, [onReadFile])

  return (
    <OrganizeContext.Provider
      value={{ loading, findFileIndexies, loadedIndex, clearLoadedIndex, processAllIndexFiles, outPath, setOutPath }}
    >
      {children}
    </OrganizeContext.Provider>
  )
}

export function useOrganize() {
  const { findFileIndexies, loadedIndex, processAllIndexFiles, outPath, setOutPath, loading, clearLoadedIndex } =
    useContext(OrganizeContext)
  return { findFileIndexies, loadedIndex, processAllIndexFiles, outPath, setOutPath, loading, clearLoadedIndex }
}
