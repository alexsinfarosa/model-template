import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStateContext from "../context/globalStateContext"
import Map from "../components/map"
import Disclaimer from "../components/disclaimer"
import Footer from "../components/footer"

const IndexPage = () => {
  const { showMap } = React.useContext(GlobalStateContext)
  return (
    <Layout>
      <SEO title="Home" />
      <div className="">
        {showMap && <Map></Map>}
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
          Management
        </div>

        <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
          Predictions
        </div>

        <div className="mt-24 border-4 border-dashed border-gray-200 rounded-lg h-72 flex justify-center items-center">
          More...
        </div>
        <hr className="max-w-7xl mx-auto my-12"></hr>
        <Disclaimer></Disclaimer>
        <Footer></Footer>
      </div>
    </Layout>
  )
}

export default IndexPage
