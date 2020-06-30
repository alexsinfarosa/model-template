import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"
import GlobalStateContext from "../context/globalStateContext"

export default function Header() {
  const { modelName } = React.useContext(GlobalStateContext)
  return (
    <div className="flex w-full bg-white shadow-lg sm:px-8 sm:py-2">
      <div className="hidden sm:block">
        <Logo></Logo>
      </div>
      <div className="w-full ml-6">
        <Link to="/" className="no-underline p-4 text-center sm:text-left">
          <h2 className="text-3xl font-semibold leading-7 text-gray-700 sm:text-4xl md:text-5xl sm:leading-9">
            {modelName}
          </h2>
        </Link>
      </div>
    </div>
  )
}
