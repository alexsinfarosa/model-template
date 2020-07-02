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

  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-col h-full">
        {station && (
          <div className="flex-1">
            <StationHeader station={station}></StationHeader>
          </div>
        )}

        {showMap && (
          <div id="stationsMap" className={`flex-1 ${station ? "mt-24" : ""}`}>
            <Map></Map>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {showManagementGuide && data !== null && (
            <div
              id="managementGuide"
              className={`flex-1 mt-24 flex justify-center items-center`}
            >
              <ManagementGuide
                currentDate={data.stationData[dateOfInterest.dayOfYear - 1]}
                isLoading={isLoading}
                managementGuide={managementGuide}
              ></ManagementGuide>
            </div>
          )}

          {showResultsTable && data !== null && (
            <div
              id="resultsTable"
              className={`flex-1 mt-24 flex justify-center items-center`}
            >
              <ResultsTable
                data={data}
                isLoading={isLoading}
                resultsTable={resultsTable}
              ></ResultsTable>
            </div>
          )}

          {showResultsGraph && data !== null && (
            <div
              id="resultsGraph"
              className={`flex-1 mt-24 flex justify-center items-center`}
            >
              <ResultsGraph
                data={data}
                isLoading={isLoading}
                resultsGraph={resultsGraph}
                ddRiskLevels={resultsTable.degreeDayRiskLevels}
              ></ResultsGraph>
            </div>
          )}

          {showEnvirValuesTable && data !== null && (
            <div
              id="envirValuesTable"
              className={`flex-1 mt-24 flex justify-center items-center`}
            >
              <EnvirValuesTable
                data={data}
                isLoading={isLoading}
                envirValuesTable={envirValuesTable}
              ></EnvirValuesTable>
            </div>
          )}
        </div>

        {/* Always at the bottom - flex order-12 */}
        <div className="flex-1 mt-24">
          <hr className="max-w-7xl mx-auto"></hr>
          <Disclaimer></Disclaimer>
          <Footer></Footer>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
