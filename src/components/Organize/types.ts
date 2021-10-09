import { Dispatch, SetStateAction } from 'react'

import type { IReadedIndex, ITaskCopy } from '../../../electron/helpers/files'

export interface IOrganizeContext {
  loadedIndex: IReadedIndex[][]
  findFileIndexies: (path: string) => void
  processAllIndexFiles: (list: IReadedIndex[], outDir?: string) => Promise<ITaskCopy[]>
  outPath?: string
  setOutPath: Dispatch<SetStateAction<string>>
}
