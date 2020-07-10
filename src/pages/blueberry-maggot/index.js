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
import HashLoader from "react-spinners/HashLoader"

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
      <>
        {station === null && (
          <div className="mt-2 md:mt-4 mb-12">
            <div className="bg-primary-600 px-5 py-4 rounded-lg text-white font-medium text-center">
              <span>
                Select a weather station from the map or from dropdown menu.
              </span>
            </div>
          </div>
        )}

        {isInSeason && station && (
          <div className="mt-2 md:mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center px-4 py-6">
                <HashLoader size={61} color={"#1987C2"} loading={isLoading} />
              </div>
            ) : (
              <StationHeader data={data} station={station}></StationHeader>
            )}
          </div>
        )}

        {showMap && (
          <div
            id="stationsMap"
            className={`${
              station ? "mt-16 sm:mt-20 md:mt-24" : "mt-2 md:mt-4"
            }`}
          >
            <h2 className="mb-3 sm:mb-5 md:mb-8 font-semibold text-gray-600 md:text-2xl">
              Station Selection Map
            </h2>
            <div className="h-72 lg:h-96">
              <Map></Map>
            </div>
          </div>
        )}

        {showManagementGuide && data !== null && (
          <div
            id="managementGuide"
            className={`mt-16 sm:mt-20 md:mt-24 flex justify-center items-center`}
          >
            <ManagementGuide
              resMngGuide={resMngGuide}
              isLoading={isLoading}
              managementGuide={managementGuide}
            ></ManagementGuide>
          </div>
        )}

        {isInSeason && showResultsTable && data !== null && (
          <div
            id="resultsTable"
            className={`mt-16 sm:mt-20 md:mt-24 flex justify-center items-center`}
          >
            <ResultsTable
              data={data}
              isLoading={isLoading}
              resultsTable={resultsTable}
            ></ResultsTable>
          </div>
        )}

        {isInSeason && showResultsGraph && data !== null && (
          <div
            id="resultsGraph"
            className={`mt-16 sm:mt-20 md:mt-24 flex justify-center items-center`}
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
            className={`mt-16 sm:mt-20 md:mt-24 flex justify-center items-center`}
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
      </>
    </Layout>
  )
}

export default IndexPage
