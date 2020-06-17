import React from "react"
import newaLogo from "../assets/newa-logo.svg"
import modelData from "../assets/model-data.json"
import Toggle from "../components/toggle"
import StationsDropdown from "../components/stationsDropdown"
import DateOfInterest from "../components/dateOfInterest"
import Footer from "../components/footer"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  function handleCloseSidebar(e) {
    if (e.keyCode === 27) {
      setSidebarOpen(false)
    }
  }

  return (
    <div
      onKeyDown={handleCloseSidebar}
      className="h-screen flex overflow-hidden bg-gray-100"
    >
      {/* <!-- Off-canvas menu for mobile --> */}
      {sidebarOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 flex z-40"
            // onClick={() => setSidebarOpen(false)}
            // onKeyDown={handleCloseSidebar}
          >
            <div className="fixed inset-0">
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>
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
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    src={newaLogo}
                    alt="NEWA (Network for Environment and Weather Applications)"
                    className="flex items-center w-32"
                  />
                </div>
                <div className="mt-8 px-2">
                  <StationsDropdown></StationsDropdown>
                  <DateOfInterest></DateOfInterest>
                  {/* Toggle components On/Off */}
                  <div className="mt-12 bg-gray-50">
                    <Toggle text="Map"></Toggle>
                    <Toggle text="Graph"></Toggle>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-14">
              {/* <!-- Force sidebar to shrink to fit close icon --> */}
            </div>
          </div>
        </div>
      )}

      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-72 border-r border-gray-200 bg-white">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <img
              src={newaLogo}
              alt="NEWA (Network for Environment and Weather Applications)"
              className="flex items-center w-32 ml-4"
            />
            {/* Sidebar component */}
            <div className="flex-1 px-2">
              <div className="mt-12">
                <StationsDropdown></StationsDropdown>
              </div>

              <div className="mt-16">
                <span className="block text-sm font-medium leading-5 text-primary-600 font-extrabold mb-1">
                  Date of Interest
                </span>
                <DateOfInterest></DateOfInterest>
              </div>

              {/* Toggle components On/Off */}
              <div className="mt-24">
                <span className="block text-sm font-medium leading-5 text-primary-600 font-extrabold mb-1">
                  Show/Hide
                </span>
                <div className="bg-gray-100 rounded  flex justify-center items-center">
                  <div className="flex-1">
                    <Toggle text="Map"></Toggle>
                    <Toggle text="Graph"></Toggle>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
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
        </div>
        <main
          className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6"
          tabIndex="0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {modelData.title}
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* <!-- Replace with your content --> */}
            <div className="py-4">{children}</div>
            {/* <!-- /End replace --> */}
            <hr className="max-w-7xl mx-auto my-12"></hr>
            <Footer></Footer>
          </div>
        </main>
      </div>
    </div>
  )
}
export default Layout
