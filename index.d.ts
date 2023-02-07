declare module '@jetbrains/teamcity-api' {
  import type {
    BuildNumberType,
    ContentPanelType,
    EntityPathType,
    RouterLinkType,
    RouterButtonType,
    ServiceMessageType,
  } from '@jetbrains/teamcity-api/types/components'

  import type {
    RestServiceType,
    AlertServiceType,
    HintsServiceType,
  } from '@jetbrains/teamcity-api/types/services'

  import type {
    RequestTextType,
    RequestJSONType,
  } from '@jetbrains/teamcity-api/types/services/REST'

  import type {
    Alert,
    AlertKey,
    AlertType,
  } from '@jetbrains/teamcity-api/types/services/AlertService'

  export type {
    BuildNumberProps,
    ContentPanelProps,
    EntityPathProps,
    RouterLinkProps,
    RouterButtonProps,
    ServiceMessageProps,
  } from '@jetbrains/teamcity-api/types/components'

  type RenderType = <P extends {} | null | undefined>(elementOrId: HTMLElement | string, Type: React.ComponentType<P>, props: P) => void

  type UtilsType = {
    requestText: RequestTextType
    requestJSON: RequestJSONType
    isSakuraUI: () => boolean
    resolveRelativeURL: (relativePath: string, params?: {}, hash?: string) => string
    addMarkdownAlert: (source: string, type?: AlertType, timeout?: number | null, options?: Partial<Alert>) => AlertKey
  }

  type ComponentsType = {
    readonly BuildNumber: BuildNumberType
    readonly ContentPanel: ContentPanelType
    readonly EntityPath: EntityPathType
    readonly RouterLink: RouterLinkType
    readonly RouterButton: RouterButtonType
    readonly ServiceMessage: ServiceMessageType
  }

  type ServicesType = {
    readonly AlertService: AlertServiceType
    readonly HintsService: HintsServiceType
    readonly REST: RestServiceType
  }

  export type PlaceIdList = {
    SAKURA_HEADER_NAVIGATION_AFTER: "SAKURA_HEADER_NAVIGATION_AFTER"
    SAKURA_HEADER_USERNAME_BEFORE: "SAKURA_HEADER_USERNAME_BEFORE"
    SAKURA_HEADER_RIGHT: "SAKURA_HEADER_RIGHT"
    SAKURA_FOOTER_RIGHT: "SAKURA_FOOTER_RIGHT"
    SAKURA_BEFORE_CONTENT: "SAKURA_BEFORE_CONTENT"
    SAKURA_SIDEBAR_TOP: "SAKURA_SIDEBAR_TOP"
    SAKURA_PROJECT_LINKS: "SAKURA_PROJECT_LINKS"
    SAKURA_PROJECT_TRENDS: "SAKURA_PROJECT_TRENDS"
    SAKURA_BUILD_CONFIGURATION_TREND_CARD: "SAKURA_BUILD_CONFIGURATION_TREND_CARD"
    SAKURA_PROJECT_BUILDS: "SAKURA_PROJECT_BUILDS"
    SAKURA_BUILD_CONFIGURATION_BUILDS: "SAKURA_BUILD_CONFIGURATION_BUILDS"
    SAKURA_BUILD_CONFIGURATION_BRANCHES: "SAKURA_BUILD_CONFIGURATION_BRANCHES"
    SAKURA_BUILD_LINE_EXPANDED: "SAKURA_BUILD_LINE_EXPANDED"
    SAKURA_BUILD_OVERVIEW: 'SAKURA_BUILD_OVERVIEW'
    SAKURA_GUIDES_OVERVIEW: 'SAKURA_GUIDES_OVERVIEW'
    SAKURA_CUSTOM_AGENTS_COUNTER: 'SAKURA_CUSTOM_AGENTS_COUNTER'
    SAKURA_QUEUE_ACTIONS: 'SAKURA_QUEUE_ACTIONS'
    SAKURA_TEST_DETAILS_ACTIONS: 'SAKURA_TEST_DETAILS_ACTIONS'
    SAKURA_AGENTS_TOOLBAR: 'SAKURA_AGENTS_TOOLBAR'

    // Classic UI PlaceID Containers
    HEADER_RIGHT: "HEADER_RIGHT"
    BEFORE_CONTENT: "BEFORE_CONTENT"
    PROJECT_FRAGMENT: "PROJECT_FRAGMENT"
    PROJECT_STATS_FRAGMENT: "PROJECT_STATS_FRAGMENT"
    BUILD_CONF_STATISTICS_FRAGMENT: "BUILD_CONF_STATISTICS_FRAGMENT"
    BUILD_RESULTS_FRAGMENT: "BUILD_RESULTS_FRAGMENT"
    BUILD_RESULTS_BUILD_PROBLEM: "BUILD_RESULTS_BUILD_PROBLEM"
    TAB_PLUGIN_CONTAINER: "TAB_PLUGIN_CONTAINER"
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
      readonly testRunId?: string | null | undefined
    }
  }

  interface PluginCommon {
    debug: boolean
    name: string
    placeId: PlaceId

    content: string | HTMLElement | React.ComponentType<any>
  }

  export interface PluginCallbacks extends PluginCommon {
    readonly onCreate: (callback: () => unknown) => () => void
    readonly onMount: (callback: PluginCallback) => UnsubscribeFromLifecycle
    readonly onContextUpdate: (callback: PluginCallback) => UnsubscribeFromLifecycle
    readonly onUnmount: (callback: PluginCallback) => UnsubscribeFromLifecycle
    readonly onDelete: (callback: PluginCallback) => UnsubscribeFromLifecycle
  }

  export interface PluginInterface extends PluginCallbacks {
    options: PluginOptions
    content: string | HTMLElement | React.ComponentType<any>
    container: HTMLElement | void
    readonly mount: () => void
    readonly unmount: () => void
    readonly updateContext: (context: PluginContext) => void
    replaceContent(content: string | HTMLElement | React.ComponentType<any>): void
    registerEventHandler(element: HTMLElement, event: string, callback: () => unknown): void
  }

  type PluginType = {
    new (placeId: PlaceId | Array<PlaceId>, args: PluginConstructorArguments): PluginInterface
    placeIds: PlaceIdList
  }

  type TabPluginType = {
    new (args: PluginConstructorArguments): PluginInterface
    placeIds: PlaceIdList
  }

  export interface PluginRegistry {
    searchByPlaceId(placeId: PlaceId, pluginName?: string): (PluginInterface | null | undefined) | Array<PluginInterface>
    findUniquePlugin(placeId: PlaceId, pluginName: string): PluginInterface | null | undefined
    search(pluginName: string): Array<PluginInterface>
  }

  export type TeamCityAPIType = {
    render: RenderType
    Components: ComponentsType
    Services: ServicesType
    utils: UtilsType
    Plugin: PluginType
    TabPlugin: TabPluginType
    pluginRegistry: PluginRegistry
  }

  export var render: RenderType
  export var utils: UtilsType
  export var pluginRegistry: PluginRegistry
  export var Services: ServicesType
  export var Components: ComponentsType
  export var Plugin: PluginType
  export var TabPlugin: TabPluginType
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

declare module '@jetbrains/teamcity-api/tab-plugin' {
  import {TabPlugin} from '@jetbrains/teamcity-api'
  export default TabPlugin
}

declare module '@jetbrains/teamcity-api/plugin-registry' {
  import {pluginRegistry} from '@jetbrains/teamcity-api'
  export default pluginRegistry
}

declare module '@jetbrains/teamcity-api/components' {
  import {Components} from '@jetbrains/teamcity-api'
  import type {
    BuildNumberType,
    ContentPanelType,
    EntityPathType,
    RouterButtonType,
    RouterLinkType,
    ServiceMessageType,
  } from '@jetbrains/teamcity-api/types/components'

  export const BuildNumber: BuildNumberType
  export const ContentPanel: ContentPanelType
  export const EntityPath: EntityPathType
  export const RouterButton: RouterButtonType
  export const RouterLink: RouterLinkType
  export const ServiceMessage: ServiceMessageType

  export {
    BuildNumberProps,
    ContentPanelProps,
    EntityPathProps,
    RouterButtonProps,
    RouterLinkProps,
    ServiceMessageProps,
  } from '@jetbrains/teamcity-api/types/components'
  export default Components
}

declare module '@jetbrains/teamcity-api/services' {
  import {Services} from '@jetbrains/teamcity-api'
  import {
    RestServiceType,
    AlertServiceType,
    HintsServiceType,
  } from '@jetbrains/teamcity-api/types/services'

  export const REST: RestServiceType
  export const AlertService: AlertServiceType
  export const HintsService: HintsServiceType

  export default Services
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
