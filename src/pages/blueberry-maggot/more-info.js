import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import BackButton from "../../components/backButton"
import { graphql } from "gatsby"

export default function MoreInfo({ data }) {
  let moreInfoData = null
  if (data) {
    moreInfoData = data.WPGraphQL.partnerResources.nodes.map(
      d => d.partnerResources
    )
  }

  return (
    <Layout>
      <SEO title="More Info" />
      <BackButton></BackButton>
      <h1>More Info</h1>

      <div className="mt-10">
        {moreInfoData !== null &&
          moreInfoData.map(d => {
            return (
              <div key={d.title} className="mb-4">
                <a
                  href={d.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.title}
                </a>
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query moreInfoQuery {
    WPGraphQL {
      partnerResources(where: { categoryName: "Blueberry Maggot", tag: "NJ" }) {
        nodes {
          partnerResources {
            title
            resourceUrl
          }
        }
      }
    }
  }
`
