import Ajv, { DefinedError, ValidateFunction } from 'ajv'
import { JSONSchema } from 'json-schema-typed'
import Datastore from 'nedb-promises'

const path = process.cwd()

export type StoreDocument = {
  _id: string
  createdAt?: Date
  updatedAt?: Date
}

export class BaseStore<Interface = unknown> {
  private schemaValidator: ValidateFunction<Interface>
  public db: Datastore

  constructor(tableName: string, schema: JSONSchema) {
    const ajv = new Ajv({ allErrors: true, useDefaults: true })
    this.schemaValidator = ajv.compile(schema)

    const filename = `${path}/${tableName}.db`
    this.db = Datastore.create({ filename, timestampData: true })
  }

  emitError(scope: string, error?: any) {
    if (error) {
      console.log('BaseStore ERROR', scope, error)
    } else {
      for (const err of this.schemaValidator.errors as DefinedError[]) {
        console.log('BaseStore ERROR', scope, err.keyword, err.message)
      }
    }
  }

  validate(data: Interface) {
    const isValid = this.schemaValidator(data)
    if (!isValid) this.emitError('validation')
    return isValid
  }

  async create(data: Interface) {
    try {
      const isValid = this.validate(data)
      if (isValid) {
        return this.db.insert(data)
      }
      return null
    } catch (error) {
      this.emitError('create', error)
      return null
    }
  }

  async update(id: number, data: Interface) {
    try {
      const isValid = this.validate({ id, ...data })
      if (isValid) return this.db.update({ id }, data)
      return null
    } catch (error) {
      this.emitError('update', error)
      return null
    }
  }

  async findAll<T = Interface>(query?: any) {
    return this.db.find<T[]>(query)
  }

  async remove(id?: number): Promise<boolean> {
    try {
      await this.db.remove({ id }, { multi: false })
      return true
    } catch (error) {
      return false
    }
  }
}
