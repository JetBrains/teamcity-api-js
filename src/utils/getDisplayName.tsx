import type {
  ComponentType,
  LazyExoticComponent,
  MemoExoticComponent,
  NamedExoticComponent,
} from 'react'
import {
  isFragment,
  isPortal,
  isProfiler,
  isStrictMode,
  isSuspense,
  isContextConsumer,
  isContextProvider,
  isForwardRef,
  isMemo,
  isLazy,
} from 'react-is'

export function getDisplayName(
  // there's no better way to type a generic React component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Type: string | ComponentType<any> | NamedExoticComponent<any>,
): string {
  if (typeof Type === 'string') {
    return Type
  }

  if (typeof Type.displayName === 'string') {
    return Type.displayName
  }

  const propTypes = 'propTypes' in Type ? Type.propTypes : undefined
  if ('propTypes' in Type) {
    Type.propTypes = undefined
  }
  const element = <Type />

  const result = (() => {
    if (isFragment(element)) {
      return 'Fragment'
    }

    if (isPortal(element)) {
      return 'Portal'
    }

    if (isProfiler(element)) {
      return `Profiler`
    }

    if (isStrictMode(element)) {
      return 'StrictMode'
    }

    if (isSuspense(element)) {
      return 'Suspense'
    }

    if (isContextConsumer(element)) {
      return 'Context.Consumer'
    }

    if (isContextProvider(element)) {
      return 'Context.Provider'
    }

    if (isForwardRef(element)) {
      // render field is not available in the ForwardRefExoticComponent type definition
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-explicit-any
      return wrapDisplayName((Type as any).render, 'ForwardRef')
    }

    if (isMemo(element)) {
      return getDisplayName((Type as MemoExoticComponent<ComponentType>).type)
    }

    if (isLazy(element)) {
      const resolvedThenable =
        // _status field is not available in the LazyExoticComponent type definition
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Type as any)._status === 1 ? (Type as LazyExoticComponent<ComponentType>)._result : null

      if (resolvedThenable) {
        return getDisplayName(resolvedThenable)
      }
    }

    return Type.name ?? 'Anonymous'
  })()

  if ('propTypes' in Type) {
    Type.propTypes = propTypes
  }
  return result
}
export const wrapDisplayName = (
  // there's no better way to type a generic React component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: string | ComponentType<any> | NamedExoticComponent<any>,
  hocName: string,
): string => `${hocName}(${getDisplayName(component)})`
