import React from "react"
import { Spinner } from "../components/spinner"

export const withFetchData = (Component) => ({
  isLoading,
  isError,
  error,
  ...rest
}) => {
  if (isLoading) return <Spinner className="flex justify-center pt-16" />
  if (isError) return <div className="text-center text-error">{error}</div>

  return <Component {...rest} />
}
