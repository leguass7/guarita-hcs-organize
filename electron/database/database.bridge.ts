import { ipcRenderer, ipcMain } from 'electron'

import * as ModuleService from './module/module.service'
import type { IModuleStore } from './module/ModuleStore'

export enum BridgeHandlers {
  ModuleList = 'db-module-list',
  ModuleCreate = 'db-module-create',
  ModuleUpdate = 'db-module-update'
}

export const databaseBridge = {
  modules: {
    findAll: () => ipcRenderer.invoke(BridgeHandlers.ModuleList) as Promise<IModuleStore[]>,
    create: (data: IModuleStore) => ipcRenderer.invoke(BridgeHandlers.ModuleCreate, data) as Promise<IModuleStore>,
    update: (id: number, data: Partial<IModuleStore>) =>
      ipcRenderer.invoke(BridgeHandlers.ModuleUpdate, { ...data, id }) as Promise<IModuleStore>
  }
}

export function registerDatabaseHandlers() {
  ipcMain.handle(BridgeHandlers.ModuleList, (event, filter?: any) => ModuleService.findAll(event, filter))
  ipcMain.handle(BridgeHandlers.ModuleCreate, (event, data: IModuleStore) => ModuleService.create(event, data))
  ipcMain.handle(BridgeHandlers.ModuleUpdate, (event, data: IModuleStore) => ModuleService.update(event, data))
}
