import React from "react"
import { formatDate, formatAMPM } from "../utils/utils"
import GlobalStateContext from "../context/globalStateContext"
import HashLoader from "react-spinners/HashLoader"

export default function StationHeader({ data, isLoading, station }) {
  const { dateOfInterest } = React.useContext(GlobalStateContext)

  let lastDownload = ""
  if (
    new Date(dateOfInterest.date).getFullYear() === new Date().getFullYear()
  ) {
    if (data && data.currentHour) {
      lastDownload = `Last download: ${formatDate(new Date())} ${formatAMPM(
        data.currentHour
      )}`
    }
  }

  if (isLoading) {
    return (
      <div>
        <HashLoader size={61} color={"#1987C2"} loading={isLoading} />
      </div>
    )
  }

  return (
    <div
      className={`border-4 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-between sm:flex-row px-4 py-6 w-full`}
    >
      <div>
        <h1 className="text-xl leading-7 text-gray-500 sm:text-3xl sm:leading-9 text-center md:text-left md:mr-auto mb-5 sm:mb-2 truncate">
          Results for{" "}
          {station && (
            <span className="text-gray-900 font-semibold">
              {station.name}, {station.state}
            </span>
          )}
        </h1>

        <div className="text-sm text-gray-500 font-semibold text-center sm:text-left">
          {lastDownload}
        </div>
      </div>

      {station && (
        <div className="mt-2 sm:mt-0 flex flex-col items-center text-sm leading-5 text-gray-500 w-full sm:w-auto">
          <div className="flex-1 text-center md:text-left">
            <span className="font-semibold">Latitude:</span>{" "}
            <span className="ml-0">
              {station.lat ? station.lat.toFixed(2) : ""}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="font-semibold">Longitude:</span>{" "}
            <span className="ml-0">
              {station.lon ? station.lon.toFixed(2) : ""}
            </span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="font-semibold">Elevation:</span>{" "}
            <span className="ml-0">
              {station.elev ? `${station.elev} ft` : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
