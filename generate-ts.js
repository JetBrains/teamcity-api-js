const fs = require('fs')
const path = require('path')

const convert = require('@khanacademy/flow-to-ts/src/convert')

const flowCode = fs.readFileSync(path.join(__dirname, 'index.js.flow'), 'utf-8')
const tsCode = convert(flowCode, {inlineUtilityTypes: true})
  .replace(/;\n/g, '\n')
  .replace(/\n\s*\n(\s*)}\n/g, '\n$1}\n')
  .replace(/import {(.*)} from "utility-types"\n/g, '')
  .replace(/React\$ComponentType/g, 'React.ComponentType')
  .replace(/React\$Node/g, 'React.Node')
  .replace(/React\$Ref/g, 'React.Ref')
  .replace(/RequestOptions/g, 'RequestInit')
  .replace(/declare type/g, 'type')
  .replace(/export declare/g, 'export')
  .replace(/export var ([\w-]+): \$Exports<"([\w-]+)">/g, "import * as $1 from '$2'\n  export {$1}  ")
  .replace(/export declare var ([\w-]+): \$Exports<"([\w-]+)">/g, "import * as $1 from '$2'\n  export ${$1}")
  .replace(
    /declare module.exports: \$Exports<"([\w-]+)">/g,
    "import * as module from '$1'\n  export default module",
  )
  .replace(
    /declare module.exports: \$PropertyType<\$Exports<"@jetbrains\/teamcity-api">, "([\w-]+)">/g,
    "import {$1} from '@jetbrains/teamcity-api'\n  export default $1",
  )
  .replace(/export default ([\w-]+)Type/g, 'const $1: $1Type\n  export default $1')
  .replace(
    'export interface PluginInterface extends PluginCallbacks {',
    'declare class PluginClass extends PluginCallbacks {\n    static placeIds: PlaceIdList',
  )
  .replace(
    'type PluginType = Class<PluginInterface> & {\n    placeIds: PlaceIdList\n  }',
    'type PluginType = typeof PluginClass',
  )
  .replace('declare interface PluginCommon', 'declare class PluginCommon')
  .replace(
    'export interface PluginCallbacks extends PluginCommon',
    'declare class PluginCallbacks extends PluginCommon',
  )
  .replace(/PluginInterface/g, 'PluginClass')

fs.writeFileSync(path.join(__dirname, 'index.d.ts'), tsCode)
