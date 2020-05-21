import React, { Suspense, useReducer } from "react"
import { Link, navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "./spinner"
import Navigation from "./navigation"
import BottomNavBar from "./bottom-nav-bar"
import { LayoutContext } from "../context"
import { TextButton } from "./button"

const reducer = (state, { layout, options }) => ({
  ...state,
  ...(layout !== "same" && { layout }),
  options,
})

const initialState = {
  layout: "none",
  options: {},
}

export const Layout = ({ ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { layout, options } = state

  return (
    <LayoutContext.Provider value={dispatch}>
      {(() => {
        switch (layout) {
          case "user":
            return <User {...options} {...rest} />
          case "simple":
            return <Simple {...options} {...rest} />
          case "none":
            return <>{rest.children}</>
          default:
            throw new Error(`Invalid layout '${layout}'`)
        }
      })()}
    </LayoutContext.Provider>
  )
}

const Simple = ({ children, title }) => (
  <div className="max-w-sm container mx-auto px-5 py-3">
    <Link
      to="/"
      className="text-2xl font-bold font-brand text-brand block mb-5"
    >
      Cottage
    </Link>

    {title && (
      <div className="mb-3">
        <h1 className="text-lg font-bold m-0">{title}</h1>
      </div>
    )}
    {children}
  </div>
)

const User = ({ children, focus }) => (
  <div className="max-w-screen-sm container h-full mx-auto">
    <div className="flex flex-col h-full md:flex-row">
      <div className="flex-none h-full px-3 pb-3 w-40 hidden md:block">
        <div className="fixed">
          <Navigation />
        </div>
      </div>
      <div className="flex-1 min-h-0 relative overflow-y-auto md:overflow-y-visible">
        <div className="min-h-full sm:border-l sm:border-r pb-5">
          <Suspense
            fallback={<Spinner className="flex justify-center pt-16" />}
          >
            {children}
          </Suspense>
        </div>
      </div>
      {!focus && (
        <div className="flex-none md:hidden">
          <div className="bg-white">
            <BottomNavBar />
          </div>
        </div>
      )}
    </div>
  </div>
)

export const TopBar = ({
  children,
  back = false,
  onBack = () => navigate(-1),
  title,
}) => (
  <div className="sticky top-0 z-30 box-content h-10 mb-3 p-3 bg-white border-b flex items-center justify-between">
    {title && (
      <>
        <div className="flex-none flex items-center">
          {back && (
            <div className="mr-3">
              <TextButton onClick={onBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </TextButton>
            </div>
          )}
          <div className="font-bold text-lg">{title}</div>
        </div>
        <div className="flex-none">{children}</div>
      </>
    )}
    {!title && children}
  </div>
)

export const TopPanel = ({ children }) => (
  <div className="mb-3 p-3 bg-white border-b">{children}</div>
)
