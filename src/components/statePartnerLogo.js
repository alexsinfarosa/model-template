import React from "react"
import statePartners from "../assets/state-partners.json"
import { useStaticQuery, graphql } from "gatsby"

const StatePartnerLogo = ({ newaStatePartner }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "svgLogos" } }) {
        edges {
          node {
            base
            publicURL
          }
        }
      }
    }
  `)

  const partner = statePartners.find(s => s.stateName === newaStatePartner)
  const logo = data.allFile.edges.find(
    ({ node }) => node.base === partner.statePartnerSvgLogoSmall.sourceUrl
  )

  return (
    <a
      href={partner.affiliationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-12"
      aria-label={partner.affiliation}
    >
      <img src={logo.node.publicURL} alt={partner.altText} />
    </a>
  )
}

export default StatePartnerLogo
