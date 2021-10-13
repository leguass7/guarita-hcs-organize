import { JSONSchema } from 'json-schema-typed'

import { BaseStore } from '../base.store'
import { moduleSchema } from './module.schema'

export interface IModuleStore {
  id: number
  name: string
}

class ModuleStore extends BaseStore<IModuleStore> {
  constructor(private tableName: string, private schema: JSONSchema) {
    super(tableName, schema)
    this.db.ensureIndex({ fieldName: 'name', unique: true })
    this.db.ensureIndex({ fieldName: 'id', unique: true })
  }

  async teste(): Promise<boolean> {
    const test = await this.findAll()
    console.log('ModuleStore teste', test)
    return true
  }
}

export default new ModuleStore('modules', moduleSchema)
