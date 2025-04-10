import Plugin from '../plugin'
import type {PluginConstructorArguments} from '../plugin/types'
import {PlaceId} from '../plugin/types'

class TabPlugin extends Plugin {
  constructor(plugin: PluginConstructorArguments) {
    super(PlaceId.TAB_PLUGIN_CONTAINER, plugin)
  }

  unmount() {
    super.unmount()
    super.remove()
  }
}

export default TabPlugin
