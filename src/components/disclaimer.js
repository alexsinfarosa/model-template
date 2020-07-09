import React from "react"
import { Link } from "gatsby"
import GlobalStateContext from "../context/globalStateContext"

const activeStyle = `text-primary-600 font-bold`
export default function Disclaimer() {
  const { url } = React.useContext(GlobalStateContext)
  return (
    <div className="p-6">
      <div className="flex justify-center items-center h-16 mb-12">
        <div className="max-w-md w-full flex justify-between">
          <Link
            to={`${url.pathname}/more-info`}
            className="text-gray-900 text-center"
            activeClassName={activeStyle}
          >
            More Info
          </Link>

          <Link
            to={`${url.pathname}/acknowledgments`}
            className="text-gray-900 text-center"
            activeClassName={activeStyle}
          >
            Acknowledgments
          </Link>

          <Link
            to={`${url.pathname}/references`}
            className="text-gray-900 text-center"
            activeClassName={activeStyle}
          >
            References
          </Link>
        </div>
      </div>

      <div>
        <p className="leading-relaxed text-sm">
          <span className="font-semibold">
            Disclaimer: These are theoretical predictions and forecasts.
          </span>{" "}
          The theoretical models predicting pest development, disease risk, or
          crop development use the weather data collected (or forecasted) from
          the weather station location. These results should not be substituted
          for actual observations of plant growth stage, pest presence, and
          disease occurrence determined through field observations, scouting, or
          insect trapping.{" "}
          <span className="font-semibold">
            In no event shall Cornell University or any weather station be
            liable to any party for direct, indirect, special, incidental, or
            consequential damages, including lost profits, arising out of the
            use of NEWA.
          </span>
        </p>
      </div>
    </div>
  )
}
