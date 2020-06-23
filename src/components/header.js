import React from "react"
import { Link } from "gatsby"

export default function Header({ modelData }) {
  return (
    <Link to="/" className="no-underline p-6 text-center md:text-left bg-white">
      <h2 className="text-xl font-extrabold leading-7 text-gray-900 sm:text-2xl sm:leading-9 sm:truncate">
        {modelData.title}
      </h2>
    </Link>
  )
}
