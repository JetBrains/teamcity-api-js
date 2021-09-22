type HintId = string
type HintImage = {
  readonly src: string
  readonly alt: string
}
type HintCategoryType = Readonly<{
  tabs: 'Tabs'
  buildLog: 'Build Log'
  sidebar: 'Sidebar'
  dependencyChain: 'Dependencies'
  header: 'Header'
  navigation: 'Navigation'
  miscellaneous: 'Miscellaneous'
  whatsNew: "What's new"
  projectOverview: 'Project'
  buildOverview: 'Build'
  agents: 'Agents'
  administration: 'Administration'
  guide: 'Guide'
}>
type HintCategory = HintCategoryType[keyof HintCategoryType]

export enum Directions {
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_CENTER = 'TOP_CENTER',
  RIGHT_TOP = 'RIGHT_TOP',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
  RIGHT_CENTER = 'RIGHT_CENTER',
  LEFT_TOP = 'LEFT_TOP',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  LEFT_CENTER = 'LEFT_CENTER',
}

type HintType = {
  readonly id: HintId
  readonly name: string
  readonly text: string
  readonly category?: HintCategory
  readonly className?: string
  readonly directions?: ReadonlyArray<Directions>
  readonly offset?: number
  readonly viewed?: boolean
  readonly lessonId?: string
  readonly highlightTop?: boolean
  readonly helpLink?: string
  readonly selector?: string
  readonly image?: HintImage
}

export type HintsServiceType = {
  registerHint: (hint: HintType) => void
  unregisterHint: (id: string) => void
  categories: HintCategoryType
}
