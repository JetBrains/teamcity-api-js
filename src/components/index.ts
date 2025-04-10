import '@jetbrains/ring-ui-built/components/style.css'
import Button from '@jetbrains/ring-ui-built/components/button/button'
import deprecate from 'util-deprecate'

import ContentPanel from './ContentPanel/ContentPanel'
import IconButton from './IconButton/IconButton'
import SvgIcon from './SvgIcon/SvgIcon'

/**
 * @deprecated TeamcityAPI.Components.AllBuilds is no longer supported
 */
const AllBuilds = deprecate(() => null, 'TeamcityAPI.Components.AllBuilds is no longer supported') // probably never used
/**
 * @deprecated TeamcityAPI.Components.ServiceMessage is no longer supported
 */
const ServiceMessage = deprecate(
  () => null,
  'TeamcityAPI.Components.ServiceMessage is no longer supported',
)
/**
 * @deprecated TeamcityAPI.Components.BuildNumber is no longer supported
 */
const BuildNumber = deprecate(
  () => null,
  'TeamcityAPI.Components.BuildNumber is no longer supported',
)
/**
 * @deprecated TeamcityAPI.Components.EntityPath is no longer supported
 */
const EntityPath = deprecate(() => null, 'TeamcityAPI.Components.EntityPath is no longer supported')
/**
 * @deprecated TeamcityAPI.Components.RouterLink is no longer supported
 */
const RouterLink = deprecate(() => null, 'TeamcityAPI.Components.RouterLink is no longer supported')
/**
 * @deprecated TeamcityAPI.Components.RouterButton is no longer supported
 */
const RouterButton = deprecate(
  () => null,
  'TeamcityAPI.Components.RouterButton is no longer supported',
)

export {
  ContentPanel,
  IconButton,
  SvgIcon,

  // TODO remove in 2.0
  Button,
  AllBuilds,
  ServiceMessage,
  BuildNumber,
  EntityPath,
  RouterLink,
  RouterButton,
}
export default {
  ContentPanel,
  IconButton,
  SvgIcon,

  // TODO remove in 2.0
  Button,
  AllBuilds,
  ServiceMessage,
  BuildNumber,
  EntityPath,
  RouterLink,
  RouterButton,
}
