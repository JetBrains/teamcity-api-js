export type ContentPanelProps = {
  readonly className?: string
  readonly headingClassName?: string
  readonly subheadingClassName?: string
  readonly contentClassName?: string
  readonly panelType: string
  readonly heading: string | React.ReactNode
  readonly subheading?: string | React.ReactNode
  readonly href?: string
  readonly headerSnippet?: React.ReactNode
  readonly content: React.ReactNode
  readonly expandable?: boolean
  readonly withBorder?: boolean
  readonly expandedByDefault?: boolean
}

export type ContentPanelType = React.ComponentType<ContentPanelProps>
