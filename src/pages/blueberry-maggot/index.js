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

  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-col">
        <StationHeader station={station}></StationHeader>

        {/* Always on top - flex order-0 */}
        {showMap && <Map></Map>}

        {showManagementGuide && data && (
          <div
            className={`mt-24 flex justify-center items-center order-${modelData.elements["managementGuide"].priority}`}
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
            className={`mt-24 flex justify-center items-center order-${modelData.elements["resultsTable"].priority}`}
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
            className={`mt-24 flex justify-center items-center order-${modelData.elements["resultsGraph"].priority}`}
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
            className={`mt-24 flex justify-center items-center order-${modelData.elements["envirValuesTable"].priority}`}
          >
            <EnvirValuesTable
              data={data}
              isLoading={isLoading}
              envirValuesTable={modelData.elements["envirValuesTable"]}
            ></EnvirValuesTable>
          </div>
        )}

        {/* Always at the bottom - flex order-12 */}
        <div className="order-12 mt-24">
          <hr className="max-w-7xl mx-auto"></hr>
          <Disclaimer></Disclaimer>
          <Footer></Footer>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
