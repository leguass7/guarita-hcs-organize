import type { BrowserWindow, IpcMainEvent } from 'electron'
import { resolve } from 'path'

import { copyAllHCSFilesAsync } from '../helpers/asyncCopy'
import { builderTasks, findIndexiesFiles, IReadedIndex, loadIndexFile } from '../helpers/files'

// const wait = (timeout: number): Promise<any> => {
//   return new Promise(resolve => setTimeout(resolve, timeout))
// }

export function findIndexies(mainWindow: BrowserWindow, event: IpcMainEvent, path?: string) {
  const listFiles = path ? findIndexiesFiles(path) : []
  event.sender.send('foundIndexies', listFiles || [])
}

export function loadIndexies(mainWindow: BrowserWindow, event: IpcMainEvent, paths: string[] = []) {
  const indexFiles = paths.map(loadIndexFile)
  event.sender.send('loadedIndexies', indexFiles)
  return indexFiles
}

export async function processAll(
  mainWindow: BrowserWindow,
  event: IpcMainEvent,
  list: IReadedIndex[] = [],
  outDir: string
) {
  const tasks = await Promise.all(
    builderTasks(list).map(async task => {
      const copied = await copyAllHCSFilesAsync(task.from, resolve(outDir, task.outDir))
      event.sender.send(`processedItem-${task.id}`, copied.length)
      return { ...task, copied: true }
    })
  )
  event.sender.send('processedAll', tasks)
}
