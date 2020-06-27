import React from "react"
import { formatDateMonthDay } from "../utils/utils"
import HashLoader from "react-spinners/HashLoader"

export default function EnvironmentalVariablesTable({
  environmentalVariablesTable,
  data,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div>
        <HashLoader size={70} color={"#1987C2"} loading={isLoading} />
      </div>
    )
  }

  if (!data) {
    return null
  }

  if (!isLoading && data) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-3 ">
          <h2 className="font-semibold text-gray-600 md:text-2xl">
            Environmental Variables Table
          </h2>

          <div className="rounded-md shadow-sm flex justify-center">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-500 focus:outline-none focus:border-secondary-700 focus:shadow-outline-secondary active:bg-secondary-700 transition ease-in-out duration-150"
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
                      className="px-6 py-3 border-r border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      rowSpan="2"
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      colSpan="3"
                    >
                      Temperature (˚F)
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Min
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Avg
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Max
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data &&
                    data.stationData.slice(-3).map((day, i) => {
                      return (
                        <tr
                          key={day.date}
                          className={
                            i === 2 ? `font-bold text-center` : `text-center`
                          }
                        >
                          <td
                            className={`${
                              i === 2 ? `text-lg` : `text-xs`
                            } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            {i === 2 ? "Today" : formatDateMonthDay(day.date)}
                          </td>
                          <td
                            className={`${
                              i === 2 ? `text-lg` : `text-xs`
                            } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            {day.min}
                          </td>
                          <td
                            className={`${
                              i === 2 ? `text-lg` : `text-xs`
                            } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            {day.avg}
                          </td>
                          <td
                            className={`${
                              i === 2 ? `text-lg` : `text-xs`
                            } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            {day.max}
                          </td>
                        </tr>
                      )
                    })}
                  {data &&
                    data.forecast.map(day => {
                      return (
                        <tr key={day.date} className="text-center">
                          <td className="px-6 py-4 border-b border-gray-200 text-sm leading-6  text-gray-700">
                            {formatDateMonthDay(day.date)}
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
