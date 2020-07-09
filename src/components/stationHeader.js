import React from "react"
import { formatDate, formatAMPM } from "../utils/utils"

export default function StationHeader({ data, station }) {
  let lastDownload = ""
  if (data && data.currentHour) {
    lastDownload = `Last download: ${formatDate(new Date())} ${formatAMPM(
      data.currentHour
    )}`
  }
  return (
    <div
      className={`border-4 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-between sm:flex-row px-4 py-6`}
    >
      <div>
        <h1 className="text-2xl leading-7 text-gray-500 sm:text-3xl sm:leading-9 text-center md:text-left md:mr-auto mb-5 sm:mb-2">
          Results for{" "}
          {station && (
            <span className="text-gray-900 font-semibold">
              {station.name}, {station.state}
            </span>
          )}
        </h1>
        <div className="text-sm text-gray-500 font-semibold">
          {lastDownload}
        </div>
      </div>

      {station && (
        <div className="mt-2 sm:mt-0 flex justify-between sm:flex-col text-sm leading-5 text-gray-500 w-full sm:w-auto">
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
