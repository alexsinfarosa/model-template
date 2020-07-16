import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import BackButton from "../../components/backButton"
import modelData from "../../assets/blueberry-maggot.json"

export default function MoreInfo() {
  const { moreInfo } = modelData

  return (
    <Layout>
      <SEO title="More Info" />
      <BackButton></BackButton>
      <h1>More Info</h1>

      <div className="mt-10">
        {moreInfo
          .filter(
            d =>
              d.statesOrProvinces.includes("ALL") ||
              d.statesOrProvinces.includes("NY")
          )
          .map(d => {
            return (
              <div key={d.url} className="mb-4">
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  {d.title}
                </a>
              </div>
            )
          })}
      </div>
    </Layout>
  )
}
