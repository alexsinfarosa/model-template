import React from "react"

export default function StationHeader({ station }) {
  return (
    <div
      className={`border-4 border-dashed border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between items-center px-4 py-6`}
    >
      <h1 className="text-2xl leading-7 text-gray-500 sm:text-3xl sm:leading-9 text-center md:text-left md:mr-auto">
        Results for{" "}
        {station && (
          <span className="text-gray-900 font-semibold">
            {station.name}, {station.state}
          </span>
        )}
      </h1>

      <div className="mt-3 sm:mt-0 flex justify-between sm:flex-col text-sm leading-5 text-gray-500 w-full sm:w-auto">
        <div className="flex-1 text-center md:text-left">
          <span className="font-semibold">Latitude:</span>{" "}
          <span className="ml-0">{station ? station.lat.toFixed(2) : ""}</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="font-semibold">Longitude:</span>{" "}
          <span className="ml-0">{station ? station.lon.toFixed(2) : ""}</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="font-semibold">Elevation:</span>{" "}
          <span className="ml-0">{station ? `${station.elev} ft` : ""}</span>
        </div>
      </div>
    </div>
  )
}