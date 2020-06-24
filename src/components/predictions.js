import React from "react"
import useStationData from "../hooks/useStationData"

export default function Predictions() {
  const { data, isLoading } = useStationData()
  console.log(data, isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && data) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-3 ">
          <h2 className="font-semibold text-gray-600 md:text-2xl">
            Predictions
          </h2>

          <div className="rounded-md shadow-sm flex justify-center">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-primary active:bg-primary-700 transition ease-in-out duration-150"
            >
              <svg
                className="-ml-0.5 mr-2 h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download CSV
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-3 border-r border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      rowSpan="2"
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-3 border-b border-r border-gray-200 bg-primary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      colSpan="2"
                    >
                      Degree Days (Base 50 ˚F BE)
                    </th>
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      colSpan="3"
                    >
                      Temperature (˚F)
                    </th>
                  </tr>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Daily
                    </th>
                    <th className="px-6 py-3 border-b border-r border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      From Jan 1st
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Min
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Avg
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-primary-600 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Max
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.stationData.slice(-3).map((day, i) => {
                    return (
                      <tr key={day.date}>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6  text-gray-700">
                          {i === 2 ? "Today" : day.date}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 text-gray-700">
                          {day.dd}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 text-gray-700">
                          {day.gdd}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 text-gray-700">
                          {day.min}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 text-gray-700">
                          {day.avg}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6 text-gray-700">
                          {day.max}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
