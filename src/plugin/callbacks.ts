import type * as React from 'react'

import {contentPanelContextDefaultValue} from '../components/ContentPanel/ContentPanel.context'
import {objectKeys} from '../utils/object'

import type {
  PluginCallback,
  PluginConstructorArguments,
  PluginContext,
  UnsubscribeFromLifecycle,
  PluginCallbacks as PluginCallbacksInterface,
} from './types'
import {PlaceId, PluginLifecycle} from './types'
import {isValidPluginReactElementType} from './utils'

type CallbacksStore = Record<PluginLifecycle, Array<PluginCallback>>
type State = null | 'mounted' | 'deleted' | 'unmounted'
export const defaultContext: PluginContext = {
  location: {},
  contentPanel: contentPanelContextDefaultValue,
}
export abstract class PluginCallbacks implements PluginCallbacksInterface {
  debug = false
  name = ''
  placeId: PlaceId = PlaceId.SAKURA_BEFORE_CONTENT
  state: State = null
  context: PluginContext = defaultContext
  // there's no better way to type a generic React component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: string | HTMLElement | React.ComponentType<any> = ''
  callbacks: CallbacksStore = {
    ON_CREATE: [],
    ON_MOUNT: [],
    ON_CONTENT_UPDATE: [],
    ON_CONTEXT_UPDATE: [],
    ON_UNMOUNT: [],
    ON_DELETE: [],
  }

  constructor(plugin: PluginConstructorArguments) {
    if (plugin.onCreate) {
      this.onCreate(plugin.onCreate)
    }
    if (plugin.onMount) {
      this.onMount(plugin.onMount)
    }
    if (plugin.onContentUpdate) {
      this.onContentUpdate(plugin.onContentUpdate)
    }
    if (plugin.onContextUpdate) {
      this.onContextUpdate(plugin.onContextUpdate)
    }
    if (plugin.onUnmount) {
      this.onUnmount(plugin.onUnmount)
    }
    if (plugin.onDelete) {
      this.onDelete(plugin.onDelete)
    }
  }

  isControlled(): boolean {
    return (
      this.callbacks.ON_CONTEXT_UPDATE.length > 0 || isValidPluginReactElementType(this.content)
    )
  }

  setState(state: State) {
    if (this.state === 'deleted') {
      return
    }

    this.state = state
  }

  cleanCallbacks() {
    objectKeys(this.callbacks).forEach((lifecycle: PluginLifecycle) => {
      if (this.callbacks.hasOwnProperty(lifecycle)) {
        this.callbacks[lifecycle] = []
      }
    })
  }

  subscribe(stage: PluginLifecycle, callback: PluginCallback): UnsubscribeFromLifecycle {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.debug(
        `Plugin debugging. ${this.name} / ${this.placeId}. Subscribe to Lifecycle. `,
        stage,
        callback,
      )
    }
    this.callbacks[stage].push(callback)
    return () => {
      this.callbacks[stage] = this.callbacks[stage].filter(item => item !== callback)
    }
  }

  invokeCallbacks(stage: PluginLifecycle) {
    if (this.state === 'deleted') {
      return
    }

    if (this.debug) {
      // eslint-disable-next-line no-console
      console.debug(
        `Plugin debugging. ${this.name} / ${this.placeId}. Invoke callbacks. `,
        stage,
        this,
      )
    }
    this.callbacks[stage].forEach(
      callback => typeof callback === 'function' && callback.call(this, this.context),
    )
  }

  onCreate(callback: () => unknown): UnsubscribeFromLifecycle {
    return this.subscribe(PluginLifecycle.ON_CREATE, callback)
  }

  onMount(callback: PluginCallback): UnsubscribeFromLifecycle {
    if (this.state === 'mounted') {
      callback.call(this, this.context)
    }

    return this.subscribe(PluginLifecycle.ON_MOUNT, callback)
  }

  onContentUpdate(callback: PluginCallback): UnsubscribeFromLifecycle {
    return this.subscribe(PluginLifecycle.ON_CONTENT_UPDATE, callback)
  }

  onContextUpdate(callback: PluginCallback): UnsubscribeFromLifecycle {
    return this.subscribe(PluginLifecycle.ON_CONTEXT_UPDATE, callback)
  }

  onDelete(callback: PluginCallback): UnsubscribeFromLifecycle {
    return this.subscribe(PluginLifecycle.ON_DELETE, callback)
  }

  onUnmount(callback: PluginCallback): UnsubscribeFromLifecycle {
    return this.subscribe(PluginLifecycle.ON_UNMOUNT, callback)
  }

  create() {
    this.invokeCallbacks(PluginLifecycle.ON_CREATE)
  }

  mount() {
    this.setState('mounted')
    this.invokeCallbacks(PluginLifecycle.ON_MOUNT)
  }

  updateContext(context: PluginContext) {
    this.context = context
    this.invokeCallbacks(PluginLifecycle.ON_CONTEXT_UPDATE)
  }

  updateContent() {
    this.invokeCallbacks(PluginLifecycle.ON_CONTENT_UPDATE)
  }

  unmount() {
    this.setState('unmounted')
    this.invokeCallbacks(PluginLifecycle.ON_UNMOUNT)
  }

  delete() {
    this.invokeCallbacks(PluginLifecycle.ON_DELETE)
    this.cleanCallbacks()
    this.setState('deleted')
  }
}
