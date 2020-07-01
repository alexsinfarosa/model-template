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
        <div className="flex-1">
          <StationHeader station={station}></StationHeader>
        </div>

        {showMap && (
          <div className="flex-1 mt-24">
            <Map></Map>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {showManagementGuide && data && (
            <div
              className={`flex-1 mt-24 flex justify-center items-center ${
                managementGuide ? `order-${managementGuide.priority}` : ``
              }`}
            >
              <ManagementGuide
                currentDate={data.stationData[dateOfInterest.dayOfYear - 1]}
                isLoading={isLoading}
                managementGuide={modelData.elements["managementGuide"]}
              ></ManagementGuide>
            </div>
          )}

          {showResultsTable && data && (
            <div
              className={`flex-1 mt-24 flex justify-center items-center ${
                resultsTable ? `order-${resultsTable.priority}` : ``
              }`}
            >
              <ResultsTable
                data={data}
                isLoading={isLoading}
                resultsTable={modelData.elements["resultsTable"]}
              ></ResultsTable>
            </div>
          )}

          {showResultsGraph && data && (
            <div
              className={`flex-1 mt-24 flex justify-center items-center ${
                resultsGraph ? `order-${resultsGraph.priority}` : ``
              }`}
            >
              <ResultsGraph
                data={data}
                isLoading={isLoading}
                resultsGraph={modelData.elements["resultsGraph"]}
                ddRiskLevels={
                  modelData.elements["resultsTable"].degreeDayRiskLevels
                }
              ></ResultsGraph>
            </div>
          )}

          {showEnvirValuesTable && data && (
            <div
              className={`flex-1 mt-24 flex justify-center items-center ${
                envirValuesTable ? `order-${envirValuesTable.priority}` : ``
              }`}
            >
              <EnvirValuesTable
                data={data}
                isLoading={isLoading}
                envirValuesTable={modelData.elements["envirValuesTable"]}
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
