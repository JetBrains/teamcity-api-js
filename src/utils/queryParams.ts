import type {KeyValue} from './object'
import {objectEntries} from './object'

export type QueryParams = KeyValue<string, string | null | undefined>
export const entriesToQuery = (
  entries: ReadonlyArray<[string, string | null | undefined]>,
): string => {
  const params = new URLSearchParams()

  for (const [key, value] of entries) {
    if (value != null) {
      params.append(key, String(value))
    }
  }

  return params.toString()
}
export const objectToQuery = (obj: QueryParams): string => entriesToQuery(objectEntries(obj))
