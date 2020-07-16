import React from "react"
import {
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ReferenceLine,
  ReferenceDot,
} from "recharts"
import HashLoader from "react-spinners/HashLoader"
import GlobalStateContext from "../context/globalStateContext"
import domtoimage from "dom-to-image"
import { saveAs } from "file-saver"
import { formatDate } from "../utils/utils"

const CustomXLabel = props => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        fontSize={11}
        textAnchor="middle"
        fill="#666"
        transform="rotate(-15)"
      >
        {payload.value}
      </text>
    </g>
  )
}

const CustomYLabel = props => {
  const { x, y, payload, unit } = props
  return (
    <g>
      <text
        x={x}
        y={y}
        dy={5}
        dx={-15}
        fontSize={11}
        textAnchor="middle"
        fill="#666"
      >
        {payload.value}
        {unit}
      </text>
    </g>
  )
}

const CustomizedReferenceLineLabel = props => {
  const { date, viewBox } = props
  return (
    <g>
      <text
        x={viewBox.x}
        y={viewBox.y}
        dy={-5}
        // dx={-15}
        fontSize={11}
        textAnchor="middle"
        fill="#666"
      >
        {date}
      </text>
    </g>
  )
}
export default function ResultsGraph({
  data,
  isLoading,
  ddRiskLevels,
  resultsGraph,
}) {
  const { dateOfInterest } = React.useContext(GlobalStateContext)

  let dataGraph = null
  let data1 = null
  const { dayOfYear } = dateOfInterest
  if (data.forecast !== null) {
    const currentDateIndex = data.stationData.slice(-1)[0].dayOfYear

    if (currentDateIndex - dayOfYear === 0) {
      const stationData = data.stationData.slice(0, currentDateIndex - 1)
      const forecastData = data.forecast.slice(0, 6)
      data1 = [...stationData, ...forecastData]
    }
    if (currentDateIndex - dayOfYear === 1) {
      const stationData = data.stationData.slice(0, currentDateIndex - 1)
      const forecastData = data.forecast.slice(0, 5)
      data1 = [...stationData, ...forecastData]
    }
    if (currentDateIndex - dayOfYear === 2) {
      const stationData = data.stationData.slice(0, currentDateIndex - 1)
      const forecastData = data.forecast.slice(0, 4)
      data1 = [...stationData, ...forecastData]
    }
    if (currentDateIndex - dayOfYear === 3) {
      const stationData = data.stationData.slice(0, currentDateIndex - 1)
      const forecastData = data.forecast.slice(0, 3)
      data1 = [...stationData, ...forecastData]
    }
    if (currentDateIndex - dayOfYear === 4) {
      const stationData = data.stationData.slice(0, currentDateIndex - 1)
      const forecastData = data.forecast.slice(0, 2)
      data1 = [...stationData, ...forecastData]
    }
    if (currentDateIndex - dayOfYear === 5) {
      const stationData = data.stationData.slice(0, currentDateIndex - 1)
      const forecastData = data.forecast.slice(0, 1)
      data1 = [...stationData, ...forecastData]
    }
    if (currentDateIndex - dayOfYear > 5) {
      const stationData = data.stationData.slice(0, dayOfYear + 5)
      data1 = [...stationData]
    }
  } else {
    const stationData = data.stationData.slice(0, dayOfYear + 5)
    data1 = [...stationData]
  }

  if (data1 !== null) {
    dataGraph = data1.map(d => ({
      ...d,
      gdd: d.gdd === "N/A" ? null : +d.gdd,
      low: ddRiskLevels.low,
      moderate: ddRiskLevels.upperModerate,
      high: ddRiskLevels.high,
    }))
  }

  if (isLoading) {
    return (
      <div>
        <HashLoader size={61} color={"#1987C2"} loading={isLoading} />
      </div>
    )
  }

  if (dataGraph === null) {
    return null
  }

  function downloadPNG() {
    domtoimage
      .toBlob(document.getElementById("chart"))
      .then(blob => saveAs(blob, "chart.png"))
  }

  if (!isLoading && dataGraph) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="inline-block font-semibold text-gray-600 text-lg sm:text-xl md:text-2xl">
            {resultsGraph.title}
          </h2>

          <div className="rounded-md flex justify-center items-center">
            <button
              type="button"
              onClick={downloadPNG}
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
              <span className="hidden sm:inline-block mr-1">Download </span> PNG
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400} id="chart">
          <ComposedChart
            data={dataGraph}
            margin={{ top: 20, right: 30, left: -30, bottom: 20 }}
            className="bg-white sm:rounded-lg shadow border-b border-gray-200"
          >
            <XAxis
              dataKey="date"
              interval={"preserveStartEnd"}
              axisLine={true}
              tick={<CustomXLabel />}
            ></XAxis>
            <YAxis
              width={110}
              dataKey="gdd"
              tick={<CustomYLabel />}
              label={{
                value: "Cumulative Degree Days",
                angle: -90,
                position: "center",
                offset: 0,
              }}
            />
            <Tooltip formatter={value => [value, "DD"]} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value, entry) => {
                const { color } = entry
                return (
                  <span
                    className="text-xs sm:text-sm md:text-lg"
                    style={{ color }}
                  >
                    {value}
                  </span>
                )
              }}
            />

            {/* <Area
              stackId="riskLevel"
              type="monotone"
              dataKey="low"
              fill="#357858"
              stroke="#357858"
            />
            <Area
              stackId="riskLevel"
              type="monotone"
              dataKey="moderate"
              fill="#F3CC49"
              stroke="#F3CC49"
            />
            <Area
              stackId="riskLevel"
              type="monotone"
              dataKey="high"
              fill="#CE3A31"
              stroke="#CE3A31"
            /> */}
            <Line
              type="monotone"
              dataKey="gdd"
              stroke="#1987C2"
              strokeWidth={3}
              dot={false}
              name="Blueberry Maggot DD (Base 50 ˚F BE)"
            />
            <ReferenceLine
              x={formatDate(dateOfInterest.date)}
              stroke="#B2B2B2"
              label={
                <CustomizedReferenceLineLabel
                  date={formatDate(dateOfInterest.date)}
                />
              }
            />
            <ReferenceDot
              x={formatDate(dateOfInterest.date)}
              y={dataGraph[dateOfInterest.dayOfYear - 1].gdd}
              r={3}
              fill="#4085BD"
              stroke="none"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
