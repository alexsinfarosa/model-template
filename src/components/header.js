import React from "react"
import { Link } from "gatsby"
import Logo from "./logo"

export default function Header() {
  let title = ""
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname
    title = pathname
      .slice(1)
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  }

  return (
    <div className="flex w-full bg-white shadow-lg sm:px-8 sm:py-2">
      <div className="hidden sm:block">
        <Logo></Logo>
      </div>
      <div className="w-full ml-6">
        <Link to="/" className="no-underline p-4 text-center sm:text-left">
          <h2 className="text-3xl font-semibold leading-7 text-gray-700 sm:text-4xl md:text-5xl sm:leading-9">
            {title}
          </h2>
        </Link>
      </div>
    </div>
  )
}
