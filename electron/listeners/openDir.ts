import { BrowserWindow, dialog } from 'electron'
import { IpcMainEvent } from 'electron/common'

export async function openDir(mainWindow: BrowserWindow, event: IpcMainEvent): Promise<void> {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  event.sender.send('openedDirs', result.filePaths || [])
}
