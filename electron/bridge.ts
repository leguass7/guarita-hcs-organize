import { contextBridge, ipcRenderer } from 'electron'

import type { IReadedIndex, ITaskCopy } from './helpers/files'

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

  sendOpenDir: async (): Promise<string[]> => {
    return new Promise<string[]>(resolve => {
      ipcRenderer.once('openedDirs', (_, data: string[] = []) => {
        return resolve(data)
      })
      ipcRenderer.send('openDir')
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

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },

  once: (channel: string, callback: Function) => {
    ipcRenderer.once(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)