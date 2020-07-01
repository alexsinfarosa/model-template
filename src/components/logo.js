import React from "react"
import { Link } from "gatsby"
import newaLogo from "../assets/newa-logo.svg"
import ipmLogo from "../assets/ipm-logo-small.svg"
import StatePartnerLogo from "./statePartnerLogo"
import GlobalStateContext from "../context/globalStateContext"

export default function Logo() {
  const { user } = React.useContext(GlobalStateContext)
  return (
    <div className="flex flex-col w-64">
      <a
        href="http://newa.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={newaLogo}
          alt="NEWA (Network for Environment and Weather Applications)"
          className="w-36"
        />
      </a>
      <div className="flex items-center ml-8">
        <div className="text-xs">a partnership of</div>
        <span className="ml-3 flex items-center">
          <a
            href="https://nysipm.cornell.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-10"
          >
            <img
              src={ipmLogo}
              alt="New York State Integrated Pest Management Program"
            />
          </a>
        </span>
        <span className="ml-4 flex items-center w-12">
          <StatePartnerLogo
            newaStatePartner={user ? user.stateOrProvince : "New York"}
          ></StatePartnerLogo>
        </span>
      </div>
    </div>
  )
}
