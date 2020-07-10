import React from "react"
import { formatDateMonthDay } from "../utils/utils"
import HashLoader from "react-spinners/HashLoader"
import GlobalStateContext from "../context/globalStateContext"
import { CSVLink } from "react-csv"

export default function EnvirValuesTable({
  data,
  isLoading,
  envirValuesTable,
}) {
  const { dateOfInterest } = React.useContext(GlobalStateContext)

  let stationDataTable = null
  let forecastDataTable = null
  let csvData = null
  const { dayOfYear } = dateOfInterest

  if (data.forecast !== null) {
    csvData = [
      ...data.stationData.map(d => ({
        date: d.date,
        avgT: d.avgT,
        maxT: d.maxT,
        minT: d.minT,
      })),
      ...data.forecast.map(d => ({
        date: d.date,
        avgT: d.avgT,
        maxT: d.maxT,
        minT: d.minT,
      })),
    ]
    const currentDateIndex = data.stationData.slice(-1)[0].dayOfYear

    if (currentDateIndex - dayOfYear === 0) {
      stationDataTable = data.stationData.slice(
        currentDateIndex - 3,
        currentDateIndex - 1
      )
      forecastDataTable = data.forecast
    }
    if (currentDateIndex - dayOfYear === 1) {
      stationDataTable = data.stationData.slice(
        currentDateIndex - 4,
        currentDateIndex - 1
      )
      forecastDataTable = data.forecast.slice(0, 5)
    }
    if (currentDateIndex - dayOfYear === 2) {
      stationDataTable = data.stationData.slice(
        currentDateIndex - 5,
        currentDateIndex - 1
      )
      forecastDataTable = data.forecast.slice(0, 4)
    }
    if (currentDateIndex - dayOfYear === 3) {
      stationDataTable = data.stationData.slice(
        currentDateIndex - 6,
        currentDateIndex - 1
      )
      forecastDataTable = data.forecast.slice(0, 3)
    }
    if (currentDateIndex - dayOfYear === 4) {
      stationDataTable = data.stationData.slice(
        currentDateIndex - 7,
        currentDateIndex - 1
      )
      forecastDataTable = data.forecast.slice(0, 2)
    }
    if (currentDateIndex - dayOfYear === 5) {
      stationDataTable = data.stationData.slice(
        currentDateIndex - 8,
        currentDateIndex - 1
      )
      forecastDataTable = data.forecast.slice(0, 1)
    }
    if (currentDateIndex - dayOfYear > 5) {
      stationDataTable = data.stationData.slice(dayOfYear - 3, dayOfYear + 5)
    }
  } else {
    stationDataTable = data.stationData.slice(dayOfYear - 3, dayOfYear + 5)
    csvData = data.stationData.map(d => ({
      date: d.date,
      avgT: d.avgT,
      maxT: d.maxT,
      minT: d.minT,
    }))
  }

  if (isLoading) {
    return (
      <div>
        <HashLoader size={61} color={"#1987C2"} loading={isLoading} />
      </div>
    )
  }

  if (!isLoading && !stationDataTable) {
    return null
  }

  if (!isLoading && stationDataTable) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-3 ">
          <h2 className="font-semibold text-gray-600 text-xl md:text-2xl">
            {envirValuesTable.title}
          </h2>

          <div className="rounded-md shadow-sm flex justify-center">
            <button
              type="button"
              className="inline-flex items-center p-2 sm:px-3 sm:py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-500 focus:outline-none focus:border-secondary-700 focus:shadow-outline-secondary active:bg-secondary-700 transition ease-in-out duration-150"
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
              <CSVLink
                className="text-white no-underline"
                filename="environmental-values-table"
                data={csvData}
              >
                <span className="hidden sm:inline-block">Download</span> CSV
              </CSVLink>
            </button>
          </div>
        </div>
        <div className="flex my-4">
          {forecastDataTable && (
            <>
              <span className="text-gray-600 text-xs font-bold">Forecast:</span>
              <span className="w-16 py-2 bg-secondary-300 inline-block mx-2 text-xs text-center font-semibold rounded"></span>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      className="py-3 border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-secondary-600 uppercase tracking-wider"
                      rowSpan="2"
                    >
                      x
                    </th>
                    <th
                      className="sm:px-6 py-3 border-r border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      rowSpan="2"
                    >
                      Date{" "}
                      <small>
                        ({new Date(dateOfInterest.date).getFullYear()})
                      </small>
                    </th>
                    <th
                      className="sm:px-6 py-3 border-b border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-white tracking-wider"
                      colSpan="3"
                    >
                      Temperature (˚F)
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th className="sm:px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Avg
                    </th>
                    <th className="sm:px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Max
                    </th>
                    <th className="sm:px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Min
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {stationDataTable.map(day => {
                    return (
                      <tr
                        key={day.date}
                        className={
                          dayOfYear === day.dayOfYear
                            ? `font-bold text-center`
                            : `text-center`
                        }
                      >
                        <td className="w-3 py-4 border-b border-gray-200 leading-6 text-gray-700"></td>
                        <td
                          className={`${
                            dayOfYear === day.dayOfYear
                              ? `text-base sm:text-lg`
                              : `text-xs sm:text-sm`
                          } sm:px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                        >
                          <span className="sm:w-36 inline-block">
                            {formatDateMonthDay(day.date)}
                          </span>
                        </td>

                        {envirValuesTable.variables.map(variable => {
                          return (
                            <td
                              key={variable}
                              className={`${
                                dayOfYear === day.dayOfYear
                                  ? `text-base sm:text-lg`
                                  : `text-xs sm:text-sm`
                              } sm:px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                            >
                              {day[variable]}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  {forecastDataTable &&
                    forecastDataTable.map(day => {
                      return (
                        <tr key={day.date} className="text-center">
                          <td className="sm:w-3 bg-secondary-300"></td>
                          <td
                            className={`${
                              dayOfYear === day.dayOfYear
                                ? `text-base sm:text-lg font-bold`
                                : `text-xs sm:text-sm`
                            } sm:px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            <span className="sm:w-36 inline-block">
                              {formatDateMonthDay(day.date)}
                            </span>
                          </td>
                          {envirValuesTable.variables.map(variable => {
                            return (
                              <td
                                key={variable}
                                className={`${
                                  dayOfYear === day.dayOfYear
                                    ? `text-base sm:text-lg font-bold`
                                    : `text-xs sm:text-sm`
                                } sm:px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                              >
                                {day[variable]}
                              </td>
                            )
                          })}
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
