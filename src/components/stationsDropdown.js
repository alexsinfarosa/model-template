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
  <div className="flex justify-between items-center">
    <div className="flex-1 text-left text-xs">
      <span>{name}, </span>
      <span className="ml-1 font-bold">{state}</span>
    </div>
    <div className="mr-2">
      {network === "icao" && (
        <img src={planeIcon} alt="airport newa station" className="w-3"></img>
      )}
    </div>
  </div>
)

export default function StationsDropdown({ user = false }) {
  const [tabIndex, setTabIndex] = React.useState(0)
  const { station, stations } = React.useContext(GlobalStateContext)

  let formattedStationsFavorite = []
  if (stations.length !== 0) {
    formattedStationsFavorite = formatStationsToDisplayOnDropdownMenu(
      stations.slice(56, 58)
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
