import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"
import GlobalStateContext from "../context/globalStateContext"

const IndexPage = () => {
  const { showMap } = React.useContext(GlobalStateContext)
  return (
    <Layout>
      <SEO title="Home" />
      {showMap && <Map></Map>}

      <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
        Management
      </div>

      <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
        Predictions
      </div>

      <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
        More...
      </div>
    </Layout>
  )
}

export default IndexPage
