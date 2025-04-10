import {createContext} from 'react'

export type ContentPanelParams = {
  panelType: string
  expandedByDefault: boolean
}

export type ContentPanelContextValue = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  setParams: (params: ContentPanelParams) => void
}

export const contentPanelContextDefaultValue: ContentPanelContextValue = {
  expanded: false,
  setExpanded: () => {},
  setParams: () => {},
}
export const ContentPanelContext = createContext(contentPanelContextDefaultValue)
