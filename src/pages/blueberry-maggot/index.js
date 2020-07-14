import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import StationHeader from "../../components/stationHeader"
import GlobalStateContext from "../../context/globalStateContext"
import Map from "../../components/map"
import ManagementGuide from "../../components/managementGuide"
import ResultsTable from "../../components/resultsTable"
import ResultsGraph from "../../components/resultsGraph"
import EnvirValuesTable from "../../components/envirValuesTable"
import Disclaimer from "../../components/disclaimer"
import Footer from "../../components/footer"
import useStationData from "../../hooks/useStationData"
import modelData from "../../assets/blueberry-maggot.json"
import { isModelInSeason } from "../../utils/utils"

const IndexPage = () => {
  const {
    station,
    showMap,
    showManagementGuide,
    showResultsTable,
    showResultsGraph,
    showEnvirValuesTable,
    dateOfInterest,
  } = React.useContext(GlobalStateContext)
  const { data, isLoading } = useStationData()
  const {
    managementGuide,
    resultsTable,
    resultsGraph,
    envirValuesTable,
  } = modelData.elements

  let resMngGuide = null
  let isInSeason = true
  if (data) {
    const res = isModelInSeason(
      modelData,
      data.stationData[dateOfInterest.dayOfYear - 1]
    )
    if (res) {
      resMngGuide = res.resMngGuide
      isInSeason = res.isInSeason
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="h-full flex flex-col">
        <div className="hidden sm:flex sm:justify-around sm:items-center py-2 sm:py-4 mb-4">
          <div className="py-3">
            <a
              href="https://newa.rcc-acis.workers.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold leading-6 no-underline hover:underline tracking-wider"
            >
              Home
            </a>
          </div>
          <div className="py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/crop-and-pest-management"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold leading-6 no-underline hover:underline tracking-wider"
            >
              Crop & IPM Tools
            </a>
          </div>

          <div className="py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/weather-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold leading-6 no-underline hover:underline tracking-wider"
            >
              Weather Tools
            </a>
          </div>
        </div>

        {station === null && (
          <div className="mt-2 md:mt-4 mb-12">
            <div className="bg-primary-600 px-5 py-4 rounded-lg text-white font-medium text-center">
              <span>
                Select a weather station from the map or from dropdown menu.
              </span>
            </div>
          </div>
        )}

        <div
          className={`${
            isInSeason && station ? `flex` : `hidden`
          } mt-2 md:mt-4 justify-center items-center w-full`}
        >
          <StationHeader
            data={data}
            isLoading={isLoading}
            station={station}
          ></StationHeader>
        </div>

        <div
          id="stationsMap"
          className={`${station ? "mt-16 sm:mt-20 md:mt-24" : "mt-2 md:mt-4"} ${
            showMap ? `block` : `hidden`
          }`}
        >
          <h2 className="mb-3 sm:mb-5 md:mb-8 font-semibold text-gray-600 md:text-2xl">
            Station Selection Map
          </h2>
          <div className="h-72 lg:h-96">
            <Map></Map>
          </div>
        </div>

        {data !== null && (
          <div
            id="managementGuide"
            className={`${
              showManagementGuide
                ? `mt-12 sm:mt-20 md:mt-24 flex justify-center items-center`
                : `hidden`
            } `}
          >
            <ManagementGuide
              resMngGuide={resMngGuide}
              isLoading={isLoading}
              managementGuide={managementGuide}
            ></ManagementGuide>
          </div>
        )}

        {isInSeason && data !== null && (
          <div
            id="resultsTable"
            className={`${
              showResultsTable
                ? `mt-12 sm:mt-20 md:mt-24 flex justify-center items-center`
                : `hidden`
            } `}
          >
            <ResultsTable
              data={data}
              isLoading={isLoading}
              resultsTable={resultsTable}
            ></ResultsTable>
          </div>
        )}

        {isInSeason && data !== null && (
          <div
            id="resultsGraph"
            className={`${
              showResultsGraph
                ? `mt-12 sm:mt-20 md:mt-24 flex justify-center items-center`
                : `hidden`
            }`}
          >
            <ResultsGraph
              data={data}
              isLoading={isLoading}
              resultsGraph={resultsGraph}
              ddRiskLevels={resultsTable.degreeDayRiskLevels}
            ></ResultsGraph>
          </div>
        )}

        {isInSeason && showEnvirValuesTable && data !== null && (
          <div
            id="envirValuesTable"
            className={`${
              showEnvirValuesTable
                ? `mt-12 sm:mt-20 md:mt-24 flex justify-center items-center`
                : `hidden`
            }`}
          >
            <EnvirValuesTable
              data={data}
              isLoading={isLoading}
              envirValuesTable={envirValuesTable}
            ></EnvirValuesTable>
          </div>
        )}

        {/* Always at the bottom - flex order-12 */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <hr className="max-w-7xl mx-auto"></hr>
          <Disclaimer></Disclaimer>
          <Footer></Footer>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
