import type {ComponentType, ElementType} from 'react'
import ReactIS from 'react-is'

// By default, ReactIS.isValidElementType considers the string as a Valid React type and tries to create element based on it
export const isValidPluginReactElementType = (
  // there's no better way to type a generic React component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: HTMLElement | null | undefined | string | ComponentType<any>,
): content is Exclude<ElementType, string> =>
  typeof content !== 'string' && ReactIS.isValidElementType(content)
