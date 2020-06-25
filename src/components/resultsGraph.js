import React from "react"
import {
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts"
import HashLoader from "react-spinners/HashLoader"

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

export default function ResultsGraph({ data, isLoading }) {
  const dataTable = [...data.stationData, ...data.forecast].map(d => ({
    ...d,
    gdd: +d.gdd,
  }))

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
            Results Graph
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
              Download PNG
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={dataTable}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            className="bg-white rounded-md shadow"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              interval={"preserveStartEnd"}
              axisLine={true}
              tick={<CustomXLabel />}
            />
            <YAxis tick={<CustomYLabel unit={""} />} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="gdd"
              stroke="#1987C2"
              dot={false}
              name="Cumulative Degree Day"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
