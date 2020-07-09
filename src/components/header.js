import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"
import GlobalStateContext from "../context/globalStateContext"

export default function Header() {
  const { url, modelName } = React.useContext(GlobalStateContext)
  return (
    <div className="flex w-full bg-white shadow-lg sm:px-8 sm:py-2">
      <div className="hidden sm:block">
        <Logo></Logo>
      </div>
      <div className="md:ml-6 mx-auto">
        <Link
          to={url.pathname}
          className="no-underline p-4 text-center sm:text-left"
        >
          <h2 className="text-2xl font-extrabold leading-7 text-gray-600 sm:text-3xl md:text-4xl sm:leading-9 tracking-wide">
            {modelName}
          </h2>
        </Link>
      </div>
    </div>
  )
}
