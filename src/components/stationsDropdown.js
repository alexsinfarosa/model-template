import React from "react"
import Select from "react-select"
import planeIcon from "../assets/plane.svg"
import GlobalStateContext from "../context/globalStateContext"
import { formatStationsToDisplayOnDropdownMenu } from "../utils/utils"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"

const formatGroupLabel = data => (
  <div className="flex justify-between text-gray-400">
    <span>{data.label}</span>
    <span>{data.options.length}</span>
  </div>
)

const formatOptionLabel = ({ name, state, network }) => (
  <div className="flex justify-between items-center text-xs">
    <div className="">
      <span>{name}, </span>
      <span className="mr-32 font-bold">{state}</span>
    </div>
    <div className="">
      {network === "icao" && (
        <img src={planeIcon} alt="airport newa station" className="w-3"></img>
      )}
    </div>
  </div>
)

const StationsDropdown = ({ user }) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const { station, stations } = React.useContext(GlobalStateContext)

  let formattedStationsFavorite = []
  if (stations.length !== 0) {
    formattedStationsFavorite = formatStationsToDisplayOnDropdownMenu(
      stations.slice(56, 60)
    )
  }

  let formattedStations = []
  if (stations.length !== 0) {
    formattedStations = formatStationsToDisplayOnDropdownMenu(stations)
  }

  return (
    <div className="relative z-30">
      <Tabs defaultIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>
            <span
              className={`${
                tabIndex === 0
                  ? `text-primary-600 font-extrabold`
                  : `text-gray-400`
              } text-sm leading-5`}
            >
              Favorite Stations
            </span>
          </Tab>
          <Tab>
            <span
              className={`${
                tabIndex === 1
                  ? `text-primary-600 font-extrabold`
                  : `text-gray-400`
              } text-sm leading-5`}
            >
              All Stations
            </span>
          </Tab>
        </TabList>

        <TabPanel>
          {user ? (
            <div className="mt-4 shadow-sm">
              <Select
                aria-labelledby="stations"
                value={formattedStationsFavorite[0].options[0]}
                placeholder={"Select or search by weather station name"}
                isSearchable
                options={formattedStationsFavorite}
                formatGroupLabel={formatGroupLabel}
                formatOptionLabel={formatOptionLabel}
                getOptionValue={option => option["id"]}
                theme={theme => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: "#DAEBCD",
                    primary50: "#C4DFAE",
                    primary: "#579427",
                    neutral20: "#CBD5E0",
                  },
                })}
              ></Select>
            </div>
          ) : (
            <div className="mt-8 ml-3">
              <a
                className="inline-flex justify-between no-underline text-sm text-gray-900 font-semibold"
                href="https://newa.rcc-acis.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login to NEWA
                <svg
                  className="ml-2 w-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          )}
        </TabPanel>
        <TabPanel>
          <div className="mt-4 shadow-sm">
            <Select
              aria-labelledby="stations"
              value={station}
              placeholder={"Select or search by weather station name"}
              isSearchable
              options={formattedStations}
              formatGroupLabel={formatGroupLabel}
              formatOptionLabel={formatOptionLabel}
              getOptionValue={option => option["id"]}
              theme={theme => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  primary25: "#DAEBCD",
                  primary50: "#C4DFAE",
                  primary: "#579427",
                  neutral20: "#CBD5E0",
                },
              })}
            ></Select>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default StationsDropdown
