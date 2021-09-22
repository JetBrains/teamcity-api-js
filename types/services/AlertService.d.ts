type AlertKey = string

export enum Type {
  ERROR = 'error',
  MESSAGE = 'message',
  SUCCESS = 'success',
  WARNING = 'warning',
  LOADING = 'loading',
}
export type AlertType = Type

type Alert = {
  key: string
  message: string
  timeout?: number
  onCloseRequest?: (event: React.MouseEvent<HTMLElement>) => void
  onClose?: () => void
  isShaking?: boolean
  isClosing?: boolean
  inline?: boolean
  showWithAnimation?: boolean
  closeable?: boolean
  type?: AlertType
  className?: string | null
  captionClassName?: string | null
  closeButtonClassName?: string | null
  'data-test'?: string | null
}

export type AlertServiceType = {
  defaultTimeout: number
  showingAlerts: Alert[]
  containerElement: HTMLElement
  renderAlertContainer(alerts: readonly Alert[]): React.ReactElement
  renderAlerts(): void
  findSameAlert(message: string, type: string): Alert[]
  startAlertClosing(alert: Alert): void
  remove(key: string): void
  removeWithoutAnimation(key: string): void
  stopShakingWhenAnimationDone(shakingAlert: Alert): void
  addAlert: (
    content: React.ReactNode,
    type?: AlertType,
    timeout?: number | null,
    restOptions?: Partial<Alert>,
  ) => AlertKey
  setDefaultTimeout(timeout: number): void
  error(message: string, timeout?: number): string
  message(message: string, timeout?: number): string
  warning(message: string, timeout?: number): string
  successMessage(message: string, timeout?: number): string
  loadingMessage(message: string, timeout?: number): string
}
