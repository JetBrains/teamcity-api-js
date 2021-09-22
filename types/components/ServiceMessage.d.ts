import type {AlertType} from '../services/AlertService'

type Icon = React.ComponentType<JSX.IntrinsicElements['svg']>

export type ServiceMessageProps = {
  readonly icon?: Icon | string
  readonly description?: string
  readonly children?: React.ReactNode
  readonly controls?: React.ReactNode
  readonly titleClassName?: string
  readonly containerClassName?: string
  readonly closeButtonClassName?: string
  readonly captionClassName?: string
  readonly descriptionClassName?: string
  readonly iconClassName?: string
  readonly title?: string
  readonly closeable?: boolean
  readonly onClose?: () => void
  readonly onCloseRequest?: () => void
  readonly type?: AlertType
}

export type ServiceMessageType = React.ComponentType<ServiceMessageProps>
