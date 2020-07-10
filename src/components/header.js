import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"
import GlobalStateContext from "../context/globalStateContext"

export default function Header() {
  const { url, modelName } = React.useContext(GlobalStateContext)
  return (
    <div className="hidden sm:flex w-full bg-white shadow-lg sm:px-8 sm:py-2">
      <div className="">
        <Logo></Logo>
      </div>
      <div className="md:ml-6 mx-auto w-full">
        <Link to={url.pathname} className="no-underline p-4">
          <h2 className="text-3xl font-semibold leading-7 text-gray-600 sm:text-4xl lg:text-5xl sm:leading-9 text-center sm:text-left">
            {modelName}
          </h2>
        </Link>
      </div>
    </div>
  )
}
