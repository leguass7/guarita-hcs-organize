// import { useState, useEffect } from 'react'

// import { modules, schema } from '../store/modules'

// type Schema = typeof schema

// export function useStoreModule<K extends keyof Schema>(key: K): Schema[K]['default'] {
//   const defaultValue = modules.get(key, schema[key].default) as Schema[K]['default']
//   const [value, setValue] = useState<Schema[K]['default']>(defaultValue)

//   useEffect(() => {
//     const unsubscribe = modules.onDidChange(key, newValue => {
//       setValue(newValue as Schema[K]['default'])
//     })

//     return unsubscribe
//   }, [key])

//   return value
// }

export {}
