import type { BrowserWindow, IpcMainEvent } from 'electron'
import { resolve } from 'path'

import { copyAllHCSFilesAsync } from '../helpers/asyncCopy'
import { builderTasks, findIndexiesFiles, IReadedIndex, listFiles, loadIndexFile } from '../helpers/files'

export function findIndexies(mainWindow: BrowserWindow, event: IpcMainEvent, path?: string) {
  const listFiles = path ? findIndexiesFiles(path) : []
  event.sender.send('foundIndexies', listFiles || [])
}

export function loadIndexies(mainWindow: BrowserWindow, event: IpcMainEvent, paths: string[] = []) {
  const indexFiles = paths
    .map(loadIndexFile)
    .reduce((acc, items) => {
      items.forEach(item => acc.push(item))
      return acc
    }, [])
    .map((item, i, arr) => {
      const report = resolve(item.inDir, item.dateDir, item.timeDir)
      arr[i].files = listFiles(report)
      event.sender.send('onReadProgress', { total: arr.length, current: i + 1 })
      if (arr[i].files.length) {
        event.sender.send('onReadDir', arr[i])
        return arr[i]
      }
      return null
    })
    .filter(f => !!f?.files?.length)

  event.sender.send('loadedIndexies', indexFiles)
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
