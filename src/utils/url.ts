import {baseUri} from '../types/BS_types'

import {objectToQuery, type QueryParams} from './queryParams'

export const resolveRelative = (relative: string, params?: QueryParams, hash?: string): string =>
  baseUri +
  relative +
  (params ? `?${objectToQuery(params)}` : '') +
  (hash != null ? `#${hash}` : '')

export function isRelativeRootUrl(url: string | undefined) {
  return url?.startsWith('/')
}
