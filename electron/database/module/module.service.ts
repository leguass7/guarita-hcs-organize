import type { IpcMainInvokeEvent } from 'electron'

import ModuleStore, { IModuleStore } from './ModuleStore'

export async function findAll(_event: IpcMainInvokeEvent, filter?: any) {
  const result = await ModuleStore.findAll(filter)

  return result
}

export async function update(_event: IpcMainInvokeEvent, { id, ...data }: IModuleStore) {
  const result = await ModuleStore.update(id, data as IModuleStore)
  return result
}

export async function create(_event: IpcMainInvokeEvent, data: IModuleStore) {
  const result = await ModuleStore.create(data)
  return result
}

export async function remove(_event: IpcMainInvokeEvent, id: number) {
  const result = await ModuleStore.remove(id)
  return result
}
