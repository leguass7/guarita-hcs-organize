import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

const schema = {
  modules: {
    type: JSONSchemaType.Array,
    default: [],
    items: {
      type: JSONSchemaType.Object,
      default: {},
      properties: {
        id: {
          type: JSONSchemaType.String,
          default: ''
        },
        name: {
          type: JSONSchemaType.Integer,
          default: 0
        }
      }
    }
  }
}

const modules = new Store({
  schema,
  watch: true
})

export { schema, modules }
