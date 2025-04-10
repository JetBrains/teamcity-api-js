import '@jetbrains/ring-ui-built/components/style.css'
import {H2} from '@jetbrains/ring-ui-built/components/heading/heading'
import LoaderInline from '@jetbrains/ring-ui-built/components/loader-inline/loader-inline'
import classNames from 'classnames'
import * as React from 'react'
import {Suspense, useContext, useLayoutEffect} from 'react'

import SvgIcon from '../SvgIcon/SvgIcon'

import {ContentPanelContext} from './ContentPanel.context'

import styles from './ContentPanel.module.css'

export type ContentPanelProps = {
  readonly className?: string
  readonly headingClassName?: string
  readonly subheadingClassName?: string
  readonly contentClassName?: string
  readonly panelType: string
  readonly heading: string | React.ReactNode
  readonly subheading?: string | React.ReactNode
  /**
   * @deprecated href prop doesn't have any effect
   */
  readonly href?: string
  readonly headerSnippet?: React.ReactNode
  readonly content: React.ReactNode
  readonly expandable?: boolean
  readonly withBorder?: boolean
  readonly expandedByDefault?: boolean
}

function ContentPanel({
  className,
  headingClassName,
  subheadingClassName,
  contentClassName,
  panelType,
  heading,
  subheading,
  headerSnippet,
  content,
  expandable = true,
  withBorder = true,
  expandedByDefault = true,
  ...restProps
}: ContentPanelProps) {
  const {expanded, setExpanded, setParams} = useContext(ContentPanelContext)
  useLayoutEffect(() => {
    setParams({panelType, expandedByDefault})
  }, [expandedByDefault, panelType, setParams])
  const HeadingHtml = React.useMemo(
    () => (
      <H2 className={styles.htmlHeading}>
        {expandable === true && (
          <SvgIcon
            className={styles.chevronIcon}
            title={expanded ? 'Collapse section' : 'Expand section'}
            icon={expanded ? 'chevron-down' : 'chevron-right'}
            onClick={() => setExpanded(!expanded)}
          />
        )}
        <span
          className={classNames(headingClassName, styles.heading)}
          data-test-panel-heading={panelType}
        >
          {heading}
        </span>
        {subheading != null && (
          <span
            className={classNames(styles.subheading, subheadingClassName)}
            data-test-panel-subheading={panelType}
          >
            {subheading}
          </span>
        )}
      </H2>
    ),
    [
      expandable,
      expanded,
      headingClassName,
      panelType,
      heading,
      subheading,
      subheadingClassName,
      setExpanded,
    ],
  )
  return (
    <div
      className={classNames(className, styles.wrapper, {
        [styles.expandable]: expandable === true,
        [styles.expanded]: expanded,
      })}
      {...restProps}
    >
      <div className={styles.header}>
        {HeadingHtml}
        {expanded && headerSnippet}
      </div>
      <div
        className={classNames(contentClassName, styles.content, {
          [styles.border]: withBorder,
        })}
        data-test-panel-content={panelType}
        style={{
          display: expanded ? 'block' : 'none',
        }}
      >
        <Suspense
          fallback={
            <span>
              <LoaderInline>{'Loading...'}</LoaderInline>
            </span>
          }
        >
          {content}
        </Suspense>
      </div>
    </div>
  )
}

export type ContentPanelType = typeof ContentPanel
const ContentPanelMemo = React.memo(ContentPanel)
export default ContentPanelMemo
