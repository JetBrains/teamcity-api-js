export type BuildNumberProps = {
  buildId: number | null | undefined
  className?: number
  number?: string
  withLink?: boolean
  hideStar?: boolean
}

export type BuildNumberType = React.ComponentType<BuildNumberProps>
