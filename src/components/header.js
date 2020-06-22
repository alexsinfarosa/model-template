import React from "react"
import { Link } from "gatsby"

export default function Header({ modelData }) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between px-10 py-4 mb-4">
      <div className="flex-1 min-w-0">
        <Link to="/" className="no-underline">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
            {modelData.title}
          </h2>
        </Link>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="mt-3 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">Latitude:</span>{" "}
            <span className="ml-0 mr-6">41.93</span>
            <span className="font-semibold">Longitude:</span>{" "}
            <span className="ml-0 mr-6">-72.11</span>
            <span className="font-semibold">Elevation:</span>{" "}
            <span className="ml-0 mr-6">960 ft</span>
          </div>
        </div>
      </div>
    </div>
  )
}
