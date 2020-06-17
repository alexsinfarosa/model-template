import React from "react"

export default function Footer() {
  return (
    <div className="p-6">
      <div className="flex justify-center items-center pb-8">
        <span>More Info</span>
        <span className="mx-4 md:mx-8 text-gray-400">|</span>
        <span>Acknowledgments</span>
        <span className="mx-4 md:mx-8 text-gray-400">|</span>
        <span>References</span>
      </div>

      <div className="">
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
