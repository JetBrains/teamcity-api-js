export type RequestTextType = (endpoint: string, options?: RequestInit, omitErrorMessage?: boolean) => Promise<string>
export type RequestJSONType = <T>(endpoint: string, options?: RequestInit, omitErrorMessage?: boolean) => Promise<T>

export type RestServiceType = {
  requestText: RequestTextType
  requestJSON: RequestJSONType
}
