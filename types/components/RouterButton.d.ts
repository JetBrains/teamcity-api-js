export type RouterButtonProps = {
  readonly to: string
  readonly className?: string
  readonly children?: React.ReactNode
}

export type RouterButtonType = React.ComponentType<RouterButtonProps>
