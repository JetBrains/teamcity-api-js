import type {RouterButtonProps} from './RouterButton'

export type RouterLinkProps = RouterButtonProps & {
  readonly title?: string
  readonly innerClassName?: string
  readonly innerRef?: React.Ref<HTMLAnchorElement>
}

export type RouterLinkType = React.ComponentType<RouterLinkProps>
