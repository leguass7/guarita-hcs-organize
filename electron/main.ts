import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import update from 'update-electron-app'

import type { IReadedIndex } from './helpers/files'
import { findIndexies, loadIndexies, processAll, processFile } from './listeners/fileIndexies'
import { openDir } from './listeners/openDir'

if (require('electron-squirrel-startup')) app.quit()

app.setAppUserModelId('com.squirrel.hcsorganize.HcsOrganize')

update({
  updateInterval: '5 minutes',
  logger: require('electron-log')
})

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath = process.env.NODE_ENV === 'production' ? process.resourcesPath : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: join(assetsPath, 'assets', 'favicon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  ipcMain.on('appVersion', event => {
    event.sender.send('appVersion', { version: app.getVersion(), name: app.getName(), path: app.getAppPath() })
  })
  ipcMain.on('openDir', async (event, defaultPath?: string) => openDir(mainWindow!, event, defaultPath))
  ipcMain.on('findIndexies', async (event, path: string) => findIndexies(mainWindow!, event, path))
  ipcMain.on('loadIndexies', async (event, paths: string[]) => loadIndexies(mainWindow!, event, paths))
  ipcMain.on('processFile', async (event, fileReaded: IReadedIndex, outDir: string) =>
    processFile(mainWindow!, event, fileReaded, outDir)
  )
  ipcMain.on('processAll', async (event, list: IReadedIndex[], outDir: string) =>
    processAll(mainWindow!, event, list, outDir)
  )
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
