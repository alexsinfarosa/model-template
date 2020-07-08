import React from "react"
import Select from "react-select"
import planeIcon from "../assets/plane.svg"
import GlobalStateContext from "../context/globalStateContext"
import { formatStationsToDisplayOnDropdownMenu } from "../utils/utils"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import useFetchAllStations from "../hooks/useFetchAllStations"

const customStyles = {
  placeholder: provided => ({
    ...provided,
    fontSize: 11,
  }),
  singleValue: provided => ({
    ...provided,
    width: "100%",
    padding: "0 8px 0 0",
  }),
}

const formatGroupLabel = data => (
  <div className="flex justify-between text-gray-400">
    <span>{data.label}</span>
    <span>{data.options.length}</span>
  </div>
)

const formatOptionLabel = ({ name, state, network }) => (
  <div className="flex justify-between items-center text-xs">
    <div className="w-full">
      <span>{name}, </span>
      <span className="font-bold">{state}</span>
    </div>
    <div className="">
      {network === "icao" && (
        <img
          src={planeIcon}
          alt="airport newa station"
          className="w-3 mr-"
        ></img>
      )}
    </div>
  </div>
)

const StationsDropdown = () => {
  const { user, station, dispatch } = React.useContext(GlobalStateContext)
  const [tabIndex, setTabIndex] = React.useState(user ? 0 : 1)
  const { stations } = useFetchAllStations()

  let formattedStationsFavorite = []
  if (stations.length !== 0 && user) {
    formattedStationsFavorite = formatStationsToDisplayOnDropdownMenu(
      stations.filter(d => {
        const ss = `${d.id} ${d.network}`
        if (user.favoriteStations.includes(ss)) {
          return d
        } else {
          return null
        }
      })
    )
  }

  let formattedStations = []
  if (stations.length !== 0) {
    formattedStations = formatStationsToDisplayOnDropdownMenu(stations)
  }

  function handleSetSelectedStation(station) {
    dispatch({ type: "setStation", station })
  }

  return (
    <div className="relative z-30">
      <Tabs defaultIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>
            <span
              className={`${
                tabIndex === 0
                  ? `text-sm leading-5 text-secondary-600 font-bold mb-2 tracking-wide`
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
                  ? `block text-sm leading-5 text-secondary-600 font-bold mb-2 tracking-wide`
                  : `text-gray-400`
              } text-sm leading-5`}
            >
              All Stations
            </span>
          </Tab>
        </TabList>

        <TabPanel>
          {user ? (
            <div className="mt-6 shadow-sm bg-red-100">
              <Select
                aria-labelledby="stations"
                value={
                  station === null
                    ? formattedStationsFavorite.length !== 0 &&
                      formattedStationsFavorite[0].options[0]
                    : station
                }
                placeholder={"Select or search by weather station name"}
                isSearchable
                options={formattedStationsFavorite}
                onChange={stn => handleSetSelectedStation(stn)}
                formatGroupLabel={formatGroupLabel}
                formatOptionLabel={formatOptionLabel}
                getOptionValue={option => option["id"]}
                styles={customStyles}
                theme={theme => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    secondary25: "#DAEBCD",
                    secondary50: "#C4DFAE",
                    secondary: "#579427",
                    neutral20: "#CBD5E0",
                  },
                })}
              ></Select>
            </div>
          ) : (
            <div className="mt-6 ml-3">
              <a
                className="inline-flex justify-between no-underline text-sm text-gray-900 font-semibold"
                href="https://newa.rcc-acis.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit NEWA
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
              onChange={stn => handleSetSelectedStation(stn)}
              formatGroupLabel={formatGroupLabel}
              formatOptionLabel={formatOptionLabel}
              getOptionValue={option => option["id"]}
              styles={customStyles}
              theme={theme => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  secondary25: "#DAEBCD",
                  secondary50: "#C4DFAE",
                  secondary: "#579427",
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
