import type {KeyValue, WritableKeyValue} from '../utils/object'
import {objectValues} from '../utils/object'

import type {PlaceId, PluginInterface, PluginRegistry as PluginRegistryInterface} from './types'

type Handler = () => void

declare global {
  interface Window {
    // this format should be simple and stable across library versions
    TEAMCITY_PLUGINS: {
      store: WritableKeyValue<PlaceId, Array<PluginInterface>>
      handlers: Array<Handler>
    }
  }
}

window.TEAMCITY_PLUGINS ??= {
  store: {},
  handlers: [],
}

class PluginRegistry implements PluginRegistryInterface {
  subscribe(handler: Handler) {
    window.TEAMCITY_PLUGINS.handlers.push(handler)
    return () => this.unsubscribe(handler)
  }

  unsubscribe(handler: Handler) {
    window.TEAMCITY_PLUGINS.handlers = window.TEAMCITY_PLUGINS.handlers.filter(fn => handler !== fn)
  }

  getStore(): KeyValue<PlaceId, Array<PluginInterface>> {
    return window.TEAMCITY_PLUGINS.store
  }

  add(placeId: PlaceId, plugin: PluginInterface) {
    if (!window.TEAMCITY_PLUGINS.store[placeId]) {
      window.TEAMCITY_PLUGINS.store[placeId] = []
    }

    const place = window.TEAMCITY_PLUGINS.store[placeId]

    if (Array.isArray(place)) {
      if (place.some(item => item.name === plugin.name)) {
        throw Error(`Plugin ${plugin.name} has been already registered in PlaceId ${placeId}. `)
      }

      window.TEAMCITY_PLUGINS.store[placeId] = place.concat(plugin)
    }

    window.TEAMCITY_PLUGINS.handlers.forEach(hander => hander())
  }

  remove(placeId: PlaceId, plugin: PluginInterface) {
    const place = window.TEAMCITY_PLUGINS.store[placeId]
    if (!place?.includes(plugin)) {
      return
    }
    window.TEAMCITY_PLUGINS.store[placeId] = place?.filter(item => item !== plugin)

    window.TEAMCITY_PLUGINS.handlers.forEach(hander => hander())
  }

  searchByPlaceId(
    placeId: PlaceId,
    pluginName?: string,
  ): (PluginInterface | null | undefined) | Array<PluginInterface> {
    const place = window.TEAMCITY_PLUGINS.store[placeId]

    if (place && !pluginName) {
      return place
    }

    return place?.find(plugin => plugin.name === pluginName) || null
  }

  findUniquePlugin(placeId: PlaceId, pluginName: string): PluginInterface | null | undefined {
    if (!placeId || !pluginName) {
      return null
    }

    const result = this.searchByPlaceId(placeId, pluginName)

    if (!Array.isArray(result)) {
      return result
    } else {
      return null
    }
  }

  search(pluginName: string): Array<PluginInterface> {
    return objectValues(window.TEAMCITY_PLUGINS.store)
      .flat()
      .filter(plugin => plugin.name === pluginName)
  }
}

const pluginRegistry: PluginRegistry = new PluginRegistry()
export default pluginRegistry
