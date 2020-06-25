import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/globalStateContext"
import Map from "../components/map"
import ManagementGuide from "../components/managementGuide"
import ResultsTable from "../components/resultsTable"
import ResultsGraph from "../components/resultsGraph"
import Disclaimer from "../components/disclaimer"
import Footer from "../components/footer"
import useStationData from "../hooks/useStationData"

const IndexPage = () => {
  const {
    station,
    showMap,
    showManagementGuide,
    showResultsTable,
    showResultsGraph,
  } = React.useContext(GlobalStateContext)
  const { data, isLoading } = useStationData()

  return (
    <Layout>
      <SEO title="Home" />
      <div className="">
        {showMap && <Map></Map>}

        <div
          className={`${
            showMap ? `mt-24` : `mt-6`
          } border-4 border-dashed border-gray-200 rounded-lg flex flex-col md:flex-row justify-between items-center px-4 py-6`}
        >
          <h1 className="text-2xl leading-7 text-gray-500 sm:text-3xl sm:leading-9 py-3 text-center md:text-left mr-auto">
            Results for{" "}
            {station && (
              <span className="text-gray-900 font-semibold">
                {station.name}, {station.state}
              </span>
            )}
          </h1>

          <div className="flex justify-between md:flex-col text-sm leading-5 text-gray-500">
            <div className="flex-1 text-center md:text-left">
              <span className="font-semibold">Latitude:</span>{" "}
              <span className="ml-0">
                {station ? station.lat.toFixed(2) : ""}
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="font-semibold">Longitude:</span>{" "}
              <span className="ml-0">
                {station ? station.lon.toFixed(2) : ""}
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="font-semibold">Elevation:</span>{" "}
              <span className="ml-0">
                {station ? `${station.elev} ft` : ""}
              </span>
            </div>
          </div>
        </div>

        {showManagementGuide && (
          <div className="mt-24 flex justify-center items-center">
            <ManagementGuide></ManagementGuide>
          </div>
        )}

        {showResultsTable && data && (
          <div className="mt-24 flex justify-center items-center">
            <ResultsTable data={data} isLoading={isLoading}></ResultsTable>
          </div>
        )}

        {showResultsGraph && data && (
          <div className="mt-24 flex justify-center items-center">
            <ResultsGraph data={data} isLoading={isLoading}></ResultsGraph>
          </div>
        )}

        <hr className="max-w-7xl mx-auto my-12"></hr>
        <Disclaimer></Disclaimer>
        <Footer></Footer>
      </div>
    </Layout>
  )
}

export default IndexPage
