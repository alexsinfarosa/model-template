import React from "react"
import cornellLogo from "../assets/cornell-logo.svg"
import ipmLogo from "../assets/ipm-logo.svg"
import acisLogo from "../assets/acis-logo.svg"
import usdaLogo from "../assets/usda-logo.svg"
import StatePartnerLogo from "../components/statePartnerLogo"
import GlobalStateContext from "../context/globalStateContext"
import webAccessibilityIcon from "../assets/web-accessibility-icon.png"

export default function Footer() {
  const { user } = React.useContext(GlobalStateContext)

  return (
    <div className="bg-white mt-8">
      <div className="max-w-screen-xl mx-auto overflow-hidden">
        <nav className="flex justify-between flex-wrap sm:justify-around bg-secondary-600 rounded py-3">
          <div className="px-5 py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-6 text-white  no-underline hover:underline"
            >
              About Us
            </a>
          </div>
          <div className="px-5 py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/become-partner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-6 text-white  no-underline hover:underline"
            >
              Become a Partner
            </a>
          </div>
          <div className="px-5 py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-6 text-white  no-underline hover:underline"
            >
              Blog
            </a>
          </div>
          <div className="px-5 py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/press-room"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-6 text-white  no-underline hover:underline"
            >
              Press Room
            </a>
          </div>
          <div className="px-5 py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-6 text-white  no-underline hover:underline"
            >
              Partners
            </a>
          </div>
          <div className="px-5 py-3">
            <a
              href="https://newa.rcc-acis.workers.dev/help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-6 text-white  no-underline hover:underline"
            >
              Get Help
            </a>
          </div>
        </nav>

        <div className="">
          <h2 className="my-12 text-3xl font-bold text-gray-600 text-center">
            Brought to You By
          </h2>

          <div className="flex-grow w-full sm:mb-10">
            <div className="flex flex-col lg:flex lg:flex-row">
              {/* CORNELL */}
              <span className="w-64 m-auto mb-12 lg:mb-0 lg:w-72">
                <a
                  href="https://www.cornell.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={cornellLogo} alt="Cornell University" />
                </a>
              </span>

              {/* IPM */}
              <span className="w-64 m-auto mb-12 lg:mb-0 lg:w-72">
                <a
                  href="https://nysipm.cornell.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ipmLogo}
                    alt="New York State Integrated Pest Management Program"
                  />
                </a>
              </span>

              {/* ACIS */}
              <span className="w-64 m-auto mb-12 lg:mb-0 lg:w-72">
                <a
                  href="http://www.nrcc.cornell.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={acisLogo} alt="Northeast Regional Climate Center" />
                </a>
              </span>
            </div>

            {/* Two logos */}
            <div className="flex flex-col mt-6 lg:mt-20 lg:flex-row lg:items-center">
              {/* USDA */}
              <span className="w-64 m-auto lg:w-72">
                <a
                  href="https://nifa.usda.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={usdaLogo}
                    alt="United State Department of Agriculture, National Institute of Food and Agriculture"
                  />
                </a>
              </span>

              {/* NEWA STATE PARTNER */}
              <span className="w-64 m-auto mt-12 lg:mb-0 lg:w-72 lg:mt-0">
                <StatePartnerLogo
                  newaStatePartner={user ? user.stateOrProvince : "New York"}
                  smallLogo={false}
                ></StatePartnerLogo>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-center text-base leading-6 text-gray-400">
            &copy; 1996-2020 NYS IPM Program, Cornell University
          </p>
          <div className="my-8 flex justify-center">
            <a
              href="https://www.facebook.com"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="mailto:support@newa.zendesk.com"
              className="ml-6 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Email the NEWA Help Desk</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-500 leading-6 px-5">
            <span className="mr-4">
              <img
                src={webAccessibilityIcon}
                alt="web accessability"
                className="w-20 sm:w-16 md:w-14"
              />
            </span>
            <span className="md:text-justify">
              If you have a disability and are having trouble accessing
              information on this website or need materials in an alternate
              format, contact{" "}
              <a href="mailto:web-accessibility@cornell.edu">
                web-accessibility@cornell.edu
              </a>{" "}
              for assistance.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
