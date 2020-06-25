import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"
import modelData from "../assets/model-data.json"

export default function Header() {
  return (
    <div className="flex w-full bg-white shadow-sm sm:px-8 sm:py-4">
      <div className="w-2/6 hidden sm:block">
        <Logo></Logo>
      </div>
      <div className="w-full sm:w-4/6">
        <Link to="/" className="no-underline p-4 text-center md:text-left">
          <h2 className="text-2xl font-bold leading-7 text-gray-700 sm:text-4xl sm:leading-9">
            {modelData.title}
          </h2>
        </Link>
      </div>
    </div>
  )
}
