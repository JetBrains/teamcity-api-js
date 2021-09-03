declare module '@jetbrains/teamcity-api' {
  type BranchType = {
    name: string
    internalName?: string
    groupFlag?: boolean
    default?: boolean
    active?: boolean
    wildcard?: boolean
    unspecified?: boolean
  }

  type AllBuildsProps = {
    readonly locatorHelpUrl?: string
    readonly withProjectBuildtypeFilter?: boolean
    readonly pageSize?: number
    readonly skipQuerySync?: boolean
    readonly branch?: BranchType | null | undefined
  }

  type RenderType = <P extends {} | null | undefined>(elementOrId: HTMLElement | string, Type: React.ComponentType<P>, props: P) => void

  type RequestTextType = (endpoint: string, options?: RequestInit) => Promise<string>

  type RequestJSONType = (endpoint: string, options?: RequestInit) => Promise<any>

  type UtilsType = {
    requestText: RequestTextType
    requestJSON: RequestJSONType
  }

  type ComponentsType = {
    readonly AllBuilds: React.ComponentType<AllBuildsProps>
  }

  export type PlaceIdList = {
    SAKURA_HEADER_NAVIGATION_AFTER: "SAKURA_HEADER_NAVIGATION_AFTER"
    SAKURA_HEADER_USERNAME_BEFORE: "SAKURA_HEADER_USERNAME_BEFORE"
    SAKURA_HEADER_RIGHT: "SAKURA_HEADER_RIGHT"
    SAKURA_FOOTER_RIGHT: "SAKURA_FOOTER_RIGHT"
    SAKURA_BEFORE_CONTENT: "SAKURA_BEFORE_CONTENT"
    SAKURA_SIDEBAR_TOP: "SAKURA_SIDEBAR_TOP"
    SAKURA_PROJECT_TRENDS: "SAKURA_PROJECT_TRENDS"
    SAKURA_BUILD_CONFIGURATION_TREND_CARD: "SAKURA_BUILD_CONFIGURATION_TREND_CARD"
    SAKURA_PROJECT_BUILDS: "SAKURA_PROJECT_BUILDS"
    SAKURA_BUILD_CONFIGURATION_BUILDS: "SAKURA_BUILD_CONFIGURATION_BUILDS"
    SAKURA_BUILD_CONFIGURATION_BRANCHES: "SAKURA_BUILD_CONFIGURATION_BRANCHES"
    SAKURA_BUILD_LINE_EXPANDED: "SAKURA_BUILD_LINE_EXPANDED"
    SAKURA_BUILD_OVERVIEW: 'SAKURA_BUILD_OVERVIEW'
    SAKURA_GUIDES_OVERVIEW: 'SAKURA_GUIDES_OVERVIEW'
    HEADER_HELP_DROPDOWN: 'HEADER_HELP_DROPDOWN'
    SAKURA_CUSTOM_AGENTS_COUNTER: 'SAKURA_CUSTOM_AGENTS_COUNTER'
    SAKURA_QUEUE_ACTIONS: 'SAKURA_QUEUE_ACTIONS'
    SAKURA_TEST_DETAILS_ACTIONS: 'SAKURA_TEST_DETAILS_ACTIONS'

    // Classic UI PlaceID Containers
    HEADER_RIGHT: 'HEADER_RIGHT'
    BEFORE_CONTENT: 'BEFORE_CONTENT'
    PROJECT_FRAGMENT: 'PROJECT_FRAGMENT'
    PROJECT_STATS_FRAGMENT: 'PROJECT_STATS_FRAGMENT'
    BUILD_CONF_STATISTICS_FRAGMENT: 'BUILD_CONF_STATISTICS_FRAGMENT'
    BUILD_RESULTS_FRAGMENT: 'BUILD_RESULTS_FRAGMENT'
    BUILD_RESULTS_BUILD_PROBLEM: 'BUILD_RESULTS_BUILD_PROBLEM'
  }

  export type PlaceId = keyof PlaceIdList
  export type UnsubscribeFromLifecycle = () => void
  export type PluginCallback = (context: PluginContext) => unknown

  export type PluginOptions = {
    containerTagName?: string
    containerClassNames?: string | Array<string>
    debug?: boolean
  }

  export type PluginConstructorArguments = {
    readonly name: string
    readonly content: string | HTMLElement | React.ComponentType<any>

    readonly options?: PluginOptions

    readonly onCreate?: () => unknown
    readonly onContentUpdate?: PluginCallback
    readonly onContextUpdate?: PluginCallback
    readonly onMount?: PluginCallback
    readonly onUnmount?: PluginCallback
    readonly onDelete?: PluginCallback
  }

  export type PluginContext = {
    location: {
      readonly projectId?: string | null | undefined
      readonly buildId?: string | null | undefined
      readonly buildTypeId?: string | null | undefined
      readonly agentId?: string | null | undefined
      readonly agentPoolId?: string | null | undefined
      readonly agentTypeId?: string | null | undefined
    }
  }

  declare class PluginCommon {
    debug: boolean
    name: string
    placeId: PlaceId

    content: string | HTMLElement | React.ComponentType<any>
  }

  declare class PluginCallbacks extends PluginCommon {
    readonly onCreate: (callback: () => unknown) => () => void
    readonly onMount: (callback: PluginCallback) => UnsubscribeFromLifecycle
    readonly onContextUpdate: (callback: PluginCallback) => UnsubscribeFromLifecycle
    readonly onUnmount: (callback: PluginCallback) => UnsubscribeFromLifecycle
    readonly onDelete: (callback: PluginCallback) => UnsubscribeFromLifecycle
  }

  declare class PluginClass extends PluginCallbacks {
    static placeIds: PlaceIdList
    options: PluginOptions
    content: string | HTMLElement | React.ComponentType<any>
    container: HTMLElement
    readonly mount: () => void
    readonly unmount: () => void
    readonly updateContext: (context: PluginContext) => void
    constructor(placeId: PlaceId, args: PluginConstructorArguments): void
    replaceContent(content: string | HTMLElement | React.ComponentType<any>): void
    registerEventHandler(element: HTMLElement, event: string, callback: () => unknown): void
  }

  type PluginType = typeof PluginClass

  export interface PluginRegistry {
    searchByPlaceId(placeId: PlaceId, pluginName: string): (PluginClass | null | undefined) | Array<PluginClass>
    findUniquePlugin(placeId: PlaceId, pluginName: string): PluginClass | null | undefined
    search(pluginName: string): Array<PluginClass>
  }

  export type TeamCityAPIType = {
    render: RenderType
    Components: ComponentsType
    utils: UtilsType
    Plugin: PluginType
    pluginRegistry: PluginRegistry
  }

  export var render: RenderType
  export var utils: UtilsType
  export var pluginRegistry: PluginRegistry
  export var Components: ComponentsType
  export var Plugin: PluginType
  import * as React from 'react'
  export {React}
  import * as ReactDOM from 'react-dom'
  export {ReactDOM}

  const TeamCityAPI: TeamCityAPIType
  export default TeamCityAPI
}

declare module '@jetbrains/teamcity-api/plugin' {
  import {Plugin} from '@jetbrains/teamcity-api'
  export default Plugin
}

declare module '@jetbrains/teamcity-api/plugin-registry' {
  import {pluginRegistry} from '@jetbrains/teamcity-api'
  export default pluginRegistry
}

declare module '@jetbrains/teamcity-api/components' {
  import {Components} from '@jetbrains/teamcity-api'
  export default Components
}

declare module '@jetbrains/teamcity-api/utils' {
  import {utils} from '@jetbrains/teamcity-api'
  export default utils
}

declare module '@jetbrains/teamcity-api/react' {
  import * as module from 'react'
  export default module
}

declare module '@jetbrains/teamcity-api/react-dom' {
  import * as module from 'react-dom'
  export default module
}