import React from "react"
import statePartners from "../assets/state-partners.json"
import { useStaticQuery, graphql } from "gatsby"

const StatePartnerLogo = ({ newaStatePartner, smallLogo = true }) => {
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
  let logo

  if (smallLogo) {
    logo = data.allFile.edges.find(
      ({ node }) => node.base === partner.statePartnerSvgLogoSmall.sourceUrl
    )
  } else {
    logo = data.allFile.edges.find(
      ({ node }) => node.base === partner.statePartnerSvgLogo.sourceUrl
    )
  }

  return (
    <a
      href={partner.affiliationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${smallLogo ? `w-12` : `lg:w-64`}`}
      aria-label={partner.affiliation}
    >
      <img src={logo.node.publicURL} alt={partner.altText} />
    </a>
  )
}

export default StatePartnerLogo
