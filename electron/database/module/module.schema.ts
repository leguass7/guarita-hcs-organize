import { JSONSchemaType, JSONSchema } from 'json-schema-typed'

export const moduleSchema: JSONSchema = {
  type: JSONSchemaType.Object,
  properties: {
    id: {
      type: JSONSchemaType.Integer,
      default: ''
    },
    name: {
      type: JSONSchemaType.String,
      default: 0
    },
    lasdModified: {
      type: JSONSchemaType.Number,
      default: 0
    }
  }
}
