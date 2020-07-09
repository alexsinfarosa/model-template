import React from "react"
import statePartners from "../assets/state-partners.json"
import { useStaticQuery, graphql } from "gatsby"
import GlobalStateContext from "../context/globalStateContext"

const StatePartnerLogo = ({ smallLogo = true }) => {
  const { user } = React.useContext(GlobalStateContext)

  let newaStatePartner = ""
  if (!Object.keys(user).length) {
    newaStatePartner = "NY"
  } else {
    const stateIsValid = statePartners.find(
      d => d.state === user.stateOrProvince
    )
    if (stateIsValid) {
      newaStatePartner = user.stateOrProvince
    } else {
      newaStatePartner = "NY"
    }
  }

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

  const partner = statePartners.find(s => s.state === newaStatePartner)
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
