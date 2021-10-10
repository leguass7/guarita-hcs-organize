import { BrowserWindow, dialog } from 'electron'
import { IpcMainEvent } from 'electron/common'

export async function openDir(mainWindow: BrowserWindow, event: IpcMainEvent, defaultPath?: string): Promise<void> {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    defaultPath
  })
  event.sender.send('openedDirs', result.filePaths || [])
}
