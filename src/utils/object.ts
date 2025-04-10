export type WritableKeyValue<K extends PropertyKey, V> = Partial<Record<K, V>>
export type KeyValue<K extends PropertyKey, V> = Readonly<WritableKeyValue<K, V>>
export const objectEntries = <T extends Record<string, unknown>>(object: T) =>
  Object.entries(object) as [keyof T, Required<T>[keyof T]][]
// Workaround for https://github.com/Microsoft/TypeScript/issues/12870
export const objectKeys = <T extends Record<string, unknown>>(object: T) =>
  Object.keys(object) as (keyof T)[]
export const objectValues = <T extends Record<string, unknown>>(object: T) =>
  Object.values(object) as Required<T>[keyof T][]
