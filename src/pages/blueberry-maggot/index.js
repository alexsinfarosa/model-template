import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import StationHeader from "../../components/stationHeader"
import GlobalStateContext from "../../context/globalStateContext"
import Map from "../../components/map"
import ManagementGuide from "../../components/managementGuide"
import ResultsTable from "../../components/resultsTable"
import ResultsGraph from "../../components/resultsGraph"
import EnvironmentalVariablesTable from "../../components/environmentalVariablesTable"
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
    showEnvironmentalVariablesTable,
  } = React.useContext(GlobalStateContext)
  const { data, isLoading } = useStationData()

  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-col">
        <StationHeader station={station}></StationHeader>

        {/* Always on top - flex order-0 */}
        {showMap && <Map></Map>}

        {showManagementGuide && (
          <div
            className={`mt-24 flex justify-center items-center order-${modelData.elements["managementGuide"].priority}`}
          >
            <ManagementGuide
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
            <ResultsGraph data={data} isLoading={isLoading}></ResultsGraph>
          </div>
        )}

        {showEnvironmentalVariablesTable && data && (
          <div
            className={`mt-24 flex justify-center items-center order-${modelData.elements["environmentalVariablesTable"].priority}`}
          >
            <EnvironmentalVariablesTable
              data={data}
              isLoading={isLoading}
              environmentalVariablesTable={
                modelData.elements["environmentalVariablesTable"]
              }
            ></EnvironmentalVariablesTable>
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
