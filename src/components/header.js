import React from "react"

export default function Header({ modelData }) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between px-10 py-4 mb-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          {modelData.title}
        </h2>
        {/* <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            Last download: 2020-06-19 at 3:00 PM
          </div>
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
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
            Latitude: 41.93, Longitude: -72.11
          </div>
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Elevation: 690 ft
          </div>
        </div> */}
      </div>
      {/* <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block shadow-sm rounded-md">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            More...
          </button>
        </span>
      </div> */}
    </div>
  )
}
