import {isRelativeRootUrl} from '../../utils/url'

import {LinkOpenPolicy} from './Markdown.consts'

export function getLinkOpenPolicy(policy: LinkOpenPolicy, url: string | undefined) {
  if (policy === LinkOpenPolicy.EXTERNAL_IN_NEW_TAB) {
    return isRelativeRootUrl(url) ? {} : {target: '_blank', rel: 'noreferrer'}
  }

  if (policy === LinkOpenPolicy.ALL_IN_NEW_TAB) {
    return {target: '_blank', rel: 'noreferrer'}
  }

  return {}
}
