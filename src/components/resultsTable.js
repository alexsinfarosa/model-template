import React from "react"
import { formatDateMonthDay } from "../utils/utils"
import HashLoader from "react-spinners/HashLoader"
import GlobalStateContext from "../context/globalStateContext"
import { CSVLink } from "react-csv"

export default function ResultsTable({ resultsTable, data, isLoading }) {
  const { station, dateOfInterest } = React.useContext(GlobalStateContext)
  const { title, base, formula, degreeDayRiskLevels, startDate } = resultsTable

  // Current year
  let stationDataTable = null
  let forecastDataTable = null
  let csvData = null
  const { dayOfYear } = dateOfInterest
  if (data.forecast !== null) {
    csvData = [
      ...data.stationData.map(d => ({
        date: d.date,
        degreeDay: d.dd,
        cumulativeDegreeDays: d.gdd,
      })),
      ...data.forecast.map(d => ({
        date: d.date,
        degreeDay: d.dd,
        cumulativeDegreeDays: d.gdd,
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
      degreeDay: d.dd,
      cumulativeDegreeDays: d.gdd,
    }))
  }

  if (isLoading) {
    return (
      <div>
        <HashLoader size={70} color={"#1987C2"} loading={isLoading} />
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
            {title}
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
                filename="results-table"
                data={csvData}
              >
                <span className="hidden sm:inline-block">Download</span> CSV
              </CSVLink>
            </button>
          </div>
        </div>

        {/* LEGEND */}
        {data && (
          <div className="flex flex-col sm:flex-row my-4 sm:justify-between sm:items-center">
            <div className="flex items-center order-2 sm:order-1">
              {forecastDataTable && (
                <>
                  <span className="inline-block text-gray-600 text-xs font-bold">
                    Forecast:
                  </span>
                  <span className="w-16 py-2 bg-secondary-400 inline-block mx-2 text-xs text-center font-semibold rounded"></span>

                  <span className="inline-block mr-4 py-2">
                    <a
                      className="text-xs sm:text-sm"
                      href={`http://forecast.weather.gov/MapClick.php?textField1=${station.lat}&textField2=${station.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Forecast Details
                    </a>
                  </span>
                </>
              )}
            </div>

            <div className="order-1 sm:order-2">
              <span className="w-auto text-gray-600 text-xs font-bold">
                Degree Days Risk Levels:{" "}
              </span>
              <span className="w-16 py-1 bg-green-600 inline-block mx-2 text-xs text-center text-white font-semibold rounded">
                Low
              </span>
              <span className="w-16 py-1 bg-yellow-300 inline-block mx-2 text-xs text-center text-white font-semibold rounded">
                Moderate
              </span>
              <span className="w-16 py-1 bg-red-600 inline-block ml-2 text-xs text-center text-white font-semibold rounded">
                High
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col">
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
                      className="px-6 py-3 border-r border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      rowSpan="2"
                    >
                      Date{" "}
                      <small>
                        ({new Date(dateOfInterest.date).getFullYear()})
                      </small>
                    </th>
                    <th
                      className="px-6 py-3 border-b border-r border-gray-200 bg-secondary-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider"
                      colSpan="2"
                    >
                      Degree Days (Base {base} {formula})
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th className="px-6 py-3 border-b border-gray-200 bg-secondary-600 text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      Daily
                    </th>
                    <th className="px-6 py-3 border-b border-r border-gray-200 bg-secondary-600  text-xs leading-4 font-medium text-white uppercase tracking-wider">
                      From {startDate.month}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {stationDataTable.map((day, i) => {
                    let riskLevel
                    if (day.gdd <= degreeDayRiskLevels.low)
                      riskLevel = "bg-green-600 text-white font-semibold"
                    if (
                      day.gdd >= degreeDayRiskLevels.lowerModerate &&
                      day.gdd <= degreeDayRiskLevels.upperModerate
                    )
                      riskLevel = "bg-yellow-300 text-white font-semibold"
                    if (day.gdd >= degreeDayRiskLevels.high)
                      riskLevel = "bg-red-600 text-white font-semibold"
                    return (
                      <tr
                        key={day.date}
                        className={
                          dayOfYear === day.dayOfYear
                            ? `font-bold text-center`
                            : `text-center`
                        }
                      >
                        <td className="w-3 py-4 border-b border-gray-200 leading-6 text-gray-700 "></td>
                        <td
                          className={`${
                            dayOfYear === day.dayOfYear ? `text-lg` : `text-sm`
                          } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                        >
                          <span className="w-36 inline-block">
                            {formatDateMonthDay(day.date)}
                          </span>
                        </td>
                        <td
                          className={`${
                            dayOfYear === day.dayOfYear ? `text-lg` : `text-sm`
                          } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                        >
                          {day.dd}
                        </td>
                        <td
                          className={`${
                            dayOfYear === day.dayOfYear ? `text-lg` : `text-sm`
                          } px-6 py-3 border-b border-gray-200 leading-6`}
                        >
                          <span
                            className={`${riskLevel} rounded w-20 py-1 inline-block`}
                          >
                            {day.gdd}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                  {forecastDataTable &&
                    forecastDataTable.map(day => {
                      let riskLevel
                      if (day.gdd <= degreeDayRiskLevels.low)
                        riskLevel = "bg-green-600 text-white font-semibold"
                      if (
                        day.gdd >= degreeDayRiskLevels.lowerModerate &&
                        day.gdd <= degreeDayRiskLevels.upperModerate
                      )
                        riskLevel = "bg-yellow-300 text-white font-semibold"
                      if (day.gdd >= degreeDayRiskLevels.high)
                        riskLevel = "bg-red-600 text-white font-semibold"
                      return (
                        <tr
                          key={day.date}
                          className={
                            dayOfYear === day.dayOfYear
                              ? `font-bold text-center`
                              : `text-center`
                          }
                        >
                          <td className="w-3 py-4 border-b border-gray-200 leading-6 text-gray-700 bg-secondary-400"></td>
                          <td
                            className={`${
                              dayOfYear === day.dayOfYear
                                ? `text-lg`
                                : `text-sm`
                            } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            <span className="w-36 inline-block">
                              {formatDateMonthDay(day.date)}
                            </span>
                          </td>
                          <td
                            className={`${
                              dayOfYear === day.dayOfYear
                                ? `text-lg`
                                : `text-sm`
                            } px-6 py-4 border-b border-gray-200 leading-6 text-gray-700`}
                          >
                            {day.dd}
                          </td>
                          <td
                            className={`${
                              dayOfYear === day.dayOfYear
                                ? `text-lg`
                                : `text-sm`
                            } px-6 py-3 border-b border-gray-200 leading-6`}
                          >
                            <span
                              className={`${riskLevel} rounded w-20 py-1 inline-block`}
                            >
                              {day.gdd}
                            </span>
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
