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
      <div className="h-full flex flex-col min-w-full">
        <div className="hidden sm:flex sm:justify-end sm:items-center py-2 sm:py-4 mb-4 space-x-12">
          <div className="py-3">
            <a
              href="https://newa.rcc-acis.workers.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold leading-6 no-underline border-b-2 border-gray-600 border-opacity-0 hover:border-opacity-100 tracking-wider pb-1"
            >
              Home/Dashboard
            </a>
          </div>
          <div className="py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/weather-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold leading-6 no-underline border-b-2 border-gray-600 border-opacity-0 hover:border-opacity-100 tracking-wider pb-1"
            >
              Weather Tools
            </a>
          </div>
          <div className="py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/crop-and-pest-management"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold leading-6 no-underline border-b-2 border-gray-600 border-opacity-0 hover:border-opacity-100 tracking-wider pb-1"
            >
              Crop & IPM Tools
            </a>
          </div>
        </div>

        {isInSeason && station === null && !isLoading && (
          <div
            className={`mt-2 md:mt-4 mb-12 bg-primary-600 px-5 py-4 rounded-lg text-white font-medium text-center`}
          >
            Select a weather station from the map or from dropdown menu.
          </div>
        )}

        {isInSeason && station !== null && (
          <div
            className={`flex mt-2 md:mt-4 justify-center items-center w-full`}
          >
            <StationHeader
              data={data}
              isLoading={isLoading}
              station={station}
            ></StationHeader>
          </div>
        )}

        <div
          id="stationsMap"
          className={`${station ? "mt-16 sm:mt-20 md:mt-24" : "mt-2 md:mt-4"} ${
            showMap ? `` : `hidden`
          }`}
        >
          <h2 className="mb-3 sm:mb-5 md:mb-8 font-semibold text-gray-600 md:text-2xl">
            Station Selection Map
          </h2>

          <Map></Map>
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

        {isInSeason && data !== null && (
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
