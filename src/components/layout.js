import React from "react"
import newaFavicon from "../assets/newa-favicon.png"
import ipmLogo from "../assets/ipm-logo-small.svg"
import Toggle from "../components/toggle"
import StationsDropdown from "../components/stationsDropdown"
import DateOfInterest from "../components/dateOfInterest"
import GlobalStateContext from "../context/globalStateContext"
import Header from "../components/header"
import Transition from "../components/transition"
import StatePartnerLogo from "./statePartnerLogo"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const {
    user,
    station,
    showMap,
    showManagementGuide,
    showResultsTable,
    showResultsGraph,
    showEnvirValuesTable,
  } = React.useContext(GlobalStateContext)

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* <!-- Off-canvas menu for mobile --> */}
      <div className="md:hidden">
        <Transition show={sidebarOpen}>
          <div className="fixed inset-0 flex z-40">
            <Transition
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
              </div>
            </Transition>

            <Transition
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="absolute top-0 right-0 -mr-14 p-1">
                  <button
                    className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  {/* <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      src={newaLogo}
                      alt="NEWA (Network for Environment and Weather Applications)"
                      className="flex items-center w-32"
                    />
                  </div> */}
                  <div className="flex-1 px-2">
                    <div className="h-32">
                      <StationsDropdown user={user}></StationsDropdown>
                    </div>

                    <div className="mt-24 h-80">
                      <span className="block text-sm leading-5 text-secondary-600 font-extrabold mb-1">
                        Date of Interest
                      </span>
                      <DateOfInterest></DateOfInterest>
                    </div>

                    {/* Toggle components On/Off */}
                    <div className="mt-24">
                      <span className="block text-sm leading-5 text-secondary-600 font-extrabold mb-1">
                        Show/Hide
                      </span>
                      <div className="bg-gray-100 rounded  flex justify-center items-center">
                        <div className="flex-1">
                          <Toggle
                            text="Stations Map"
                            isChecked={showMap}
                            toggleElement="toggleMap"
                          ></Toggle>
                          {station && (
                            <Toggle
                              text="Management Guide"
                              isChecked={showManagementGuide}
                              toggleElement="toggleManagementGuide"
                            ></Toggle>
                          )}
                          {station && (
                            <Toggle
                              text="Results Table"
                              isChecked={showResultsTable}
                              toggleElement="toggleResultsTable"
                            ></Toggle>
                          )}
                          {station && (
                            <Toggle
                              text="Results Graph"
                              isChecked={showResultsGraph}
                              toggleElement="toggleResultsGraph"
                            ></Toggle>
                          )}
                          {station && (
                            <Toggle
                              text="Envir. Values Table"
                              isChecked={showEnvirValuesTable}
                              toggleElement="toggleEnvirValuesTable"
                            ></Toggle>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
            <div className="flex-shrink-0 w-14">
              {/* <!-- Force sidebar to shrink to fit close icon --> */}
            </div>
          </div>
        </Transition>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-72 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* <div className="flex-shrink-0 flex items-center px-4">
              <img
                src={newaLogo}
                alt="NEWA (Network for Environment and Weather Applications)"
                className="flex items-center w-32"
              />
            </div> */}
            {/* Sidebar component */}
            <div className="flex-1 px-2">
              <div className="h-32">
                <StationsDropdown
                  user={user}
                  marginRight={32}
                ></StationsDropdown>
              </div>

              <div className="mt-24 h-80">
                <span className="block text-sm leading-5 text-secondary-600 font-extrabold mb-1">
                  Date of Interest
                </span>
                <DateOfInterest></DateOfInterest>
              </div>

              {/* Toggle components On/Off */}
              <div className="mt-24">
                <span className="block text-sm leading-5 text-secondary-600 font-extrabold mb-1">
                  Show/Hide
                </span>
                <div className="flex justify-center items-center">
                  <div className="flex-1">
                    <Toggle
                      text="Stations Map"
                      isChecked={showMap}
                      toggleElement="toggleMap"
                    ></Toggle>
                    {station && (
                      <Toggle
                        text="Management Guide"
                        isChecked={showManagementGuide}
                        toggleElement="toggleManagementGuide"
                      ></Toggle>
                    )}
                    {station && (
                      <Toggle
                        text="Results Table"
                        isChecked={showResultsTable}
                        toggleElement="toggleResultsTable"
                      ></Toggle>
                    )}
                    {station && (
                      <Toggle
                        text="Results Graph"
                        isChecked={showResultsGraph}
                        toggleElement="toggleResultsGraph"
                      ></Toggle>
                    )}
                    {station && (
                      <Toggle
                        text="Envir. Values Table"
                        isChecked={showEnvirValuesTable}
                        toggleElement="toggleEnvirValuesTable"
                      ></Toggle>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right hand side */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="flex justify-between items-center md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 rounded-md shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex mr-4 sm:hidden">
            <span className="flex items-center w-8 mr-3">
              <a
                href="https://newa.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-8"
              >
                <img
                  src={newaFavicon}
                  alt="NEWA (Network for Environment and Weather Applications)"
                />
              </a>
            </span>
            <span className="flex items-center w-8 mr-3">
              <a
                href="https://nysipm.cornell.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-8"
              >
                <img
                  src={ipmLogo}
                  alt="New York State Integrated Pest Management Program"
                />
              </a>
            </span>
            <span className="flex items-center w-8">
              <StatePartnerLogo
                newaStatePartner={user ? user.stateOrProvince : "New York"}
              ></StatePartnerLogo>
            </span>
          </div>
        </div>
        <Header></Header>
        <main
          className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6 bg-gray-50"
          // tabIndex="0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
export default Layout
