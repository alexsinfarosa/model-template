import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
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
