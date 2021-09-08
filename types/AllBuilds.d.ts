type BranchType = {
    name: string
    internalName?: string
    groupFlag?: boolean
    default?: boolean
    active?: boolean
    wildcard?: boolean
    unspecified?: boolean
}

export type AllBuildsProps = {
    readonly locatorHelpUrl?: string
    readonly withProjectBuildtypeFilter?: boolean
    readonly pageSize?: number
    readonly skipQuerySync?: boolean
    readonly branch?: BranchType | null | undefined
}
