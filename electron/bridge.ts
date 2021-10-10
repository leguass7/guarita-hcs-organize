import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

import type { IReadedIndex, ITaskCopy } from './helpers/files'

export type OnReadDirType = (event: IpcRendererEvent, file: IReadedIndex) => void
export interface AppData {
  version: string
  name: string
  path?: string
}

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  getAppVersion: async () => {
    return new Promise<AppData>(resolve => {
      ipcRenderer.once('appVersion', (_, data: AppData) => {
        return resolve(data)
      })
      ipcRenderer.send('appVersion')
    }).catch(() => {
      return Promise.resolve({ version: '0.0.0', name: '', path: '' })
    })
  },

  sendOpenDir: async (defaultPath?: string): Promise<string[]> => {
    return new Promise<string[]>(resolve => {
      ipcRenderer.once('openedDirs', (_, data: string[] = []) => {
        return resolve(data)
      })
      ipcRenderer.send('openDir', defaultPath)
    }).catch(() => {
      return Promise.resolve([])
    })
  },

  findIndexies: async (path: string): Promise<string[]> => {
    return new Promise<string[]>(resolve => {
      ipcRenderer.once('foundIndexies', (_, data: string[] = []) => {
        return resolve(data)
      })
      ipcRenderer.send('findIndexies', path)
    }).catch(() => {
      return Promise.resolve([])
    })
  },

  loadIndexies: async (path: string[]): Promise<IReadedIndex[][]> => {
    return new Promise<IReadedIndex[][]>(resolve => {
      ipcRenderer.once('loadedIndexies', (_, data: IReadedIndex[][] = []) => {
        return resolve(data)
      })
      ipcRenderer.send('loadIndexies', path)
    }).catch(() => {
      return Promise.resolve([])
    })
  },

  processAllIndexFiles: async (list: IReadedIndex[], outDir: string): Promise<ITaskCopy[]> => {
    return new Promise<ITaskCopy[]>(resolve => {
      ipcRenderer.once('processedAll', (_, data: ITaskCopy[] = []) => {
        return resolve(data)
      })
      ipcRenderer.send('processAll', list, outDir)
    }).catch(() => {
      return Promise.resolve([])
    })
  },

  processIndexFile: async (fileReaded: IReadedIndex, outDir: string): Promise<ITaskCopy> => {
    return new Promise<ITaskCopy>(resolve => {
      ipcRenderer.once(`processedFile-${fileReaded.id}`, (_, data: ITaskCopy) => {
        return resolve(data)
      })
      ipcRenderer.send('processFile', fileReaded, outDir)
    }).catch(() => {
      return Promise.resolve(null)
    })
  },

  registerReadDir(callback: OnReadDirType): void {
    ipcRenderer.on('onReadDir', callback)
  },

  unregisterReadDir(callback: OnReadDirType): void {
    ipcRenderer.removeListener('onReadDir', callback)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  once: (channel: string, callback: Function) => {
    ipcRenderer.once(channel, (_, data) => callback(data))
  },

  remove(channel: string, callback: (...args: any[]) => void) {
    ipcRenderer.removeListener(channel, callback)
  }
}

contextBridge.exposeInMainWorld('Main', api)
