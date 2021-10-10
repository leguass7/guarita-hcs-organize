import { Dispatch, SetStateAction } from 'react'

import type { IReadedIndex, ITaskCopy } from '../../../electron/helpers/files'

export interface IOrganizeContext {
  loading: boolean
  loadedIndex: IReadedIndex[]
  clearLoadedIndex: () => void
  findFileIndexies: (path: string) => Promise<void>
  processAllIndexFiles: (list: IReadedIndex[], outDir?: string) => Promise<ITaskCopy[]>
  processIndexFile: (readedFile: IReadedIndex, outDir?: string) => Promise<ITaskCopy>
  outPath?: string
  setOutPath: Dispatch<SetStateAction<string>>
  setLoading: Dispatch<SetStateAction<boolean>>
}
