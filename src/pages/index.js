import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/globalStateContext"
import Map from "../components/map"
import PestManagement from "../components/pestManagement"
import Disclaimer from "../components/disclaimer"
import Footer from "../components/footer"

const IndexPage = () => {
  const {
    station,
    showMap,
    showGraph,
    showPestManagement,
    showMessages,
  } = React.useContext(GlobalStateContext)
  return (
    <Layout>
      <SEO title="Home" />
      <div className="">
        {showMap && <Map></Map>}

        <div
          className={`${
            showMap ? `mt-24` : `mt-6`
          } border-4 border-dashed border-gray-200 rounded-lg flex flex-col md:flex-row justify-between items-center px-2 py-6`}
        >
          <h1 className="w-full md:w-5/6 text-2xl leading-7 text-gray-500 sm:text-3xl sm:leading-9 py-3 text-center md:text-left">
            Results for{" "}
            {station && (
              <span className="text-gray-900 font-semibold">
                {station.name}, {station.state}
              </span>
            )}
          </h1>

          <div className="w-full md:w-1/6 flex justify-between md:flex-col text-sm leading-5 text-gray-500">
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

        {showPestManagement && (
          <div className="mt-24 h-72 flex justify-center items-center">
            <PestManagement></PestManagement>
          </div>
        )}

        <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
          Predictions
        </div>

        {showGraph && (
          <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
            Graph...
          </div>
        )}

        {showMessages && (
          <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
            Messages...
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
