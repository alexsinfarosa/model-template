import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="flex flex-col h-screen justify-center items-center">
      <p>You just hit a route that doesn&#39;t exist.</p>

      <button
        type="button"
        className="inline-flex items-center p-2 sm:px-3 sm:py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-500 focus:outline-none focus:border-secondary-700 focus:shadow-outline-secondary active:bg-secondary-700 transition ease-in-out duration-150"
      >
        <Link to="/blueberry-maggot" className="no-underline text-white">
          Return to Homepage
        </Link>
      </button>
    </div>
  </Layout>
)

export default NotFoundPage
