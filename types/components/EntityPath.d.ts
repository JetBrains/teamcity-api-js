export type EntityPathProps = {
  readonly className?: string
  readonly linkClassName?: string
  readonly withCollapsing?: boolean
  readonly withIcons?: boolean
  readonly withLeafIcon?: boolean
  readonly withLeafStatusIcon?: boolean
  readonly buildId?: string
  readonly hideFilterPath?: boolean
  readonly hideIfSameAsFilter?: boolean
  readonly projectId?: string
  readonly buildTypeId?: string
}

export type EntityPathType = React.ComponentType<EntityPathProps>
