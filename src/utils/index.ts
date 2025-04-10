import {requestJSON, requestText} from '../services/rest/request'

import addMarkdownAlert from './addMarkdownAlert'
import {resolveRelative as resolveRelativeURL} from './url'

const isSakuraUI = (): boolean => window.ReactUI.isSakuraUI

export {requestJSON, requestText, addMarkdownAlert, resolveRelativeURL, isSakuraUI}
export default {
  requestJSON,
  requestText,
  addMarkdownAlert,
  resolveRelativeURL,
  isSakuraUI,
}
