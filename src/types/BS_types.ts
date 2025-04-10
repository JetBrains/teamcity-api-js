declare global {
  interface Window {
    base_uri: string
    ReactUI: {
      isSakuraUI?: boolean
    }
    BS: {
      SubscriptionManager?: {
        closeSocket(message: string | null | undefined): unknown
      }
      ServerLink?: {
        getTotalFailuresNum?: () => number
      }
      CSRF?: {
        getCachedToken: () => string | null | undefined
        handleCSRFError: (
          request: {
            status: number
            responseText: string
          },
          retryCallback: (() => unknown) | null | undefined,
          csrfToken: string | null | undefined,
        ) => boolean
        refreshCSRFToken: (callback?: () => unknown, force?: boolean) => unknown
      }
    }
  }
}

export const baseUri = window.base_uri
