import React from "react"
import { navigate } from "gatsby"

export default function BackButton() {
  return (
    <span className="rounded-md shadow-sm">
      <svg
        role="button"
        className="w-10 mb-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline-indigo active:text-black transition ease-in-out duration-150"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => navigate("/")}
      >
        <path d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
      </svg>
    </span>
  )
}
