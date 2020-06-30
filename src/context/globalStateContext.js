import React from "react"
import { getDayOfYear } from "date-fns"

const LS_ALL_STATIONS_KEY = `newa_project_stations`
const LS_STATION_DATA_KEY = `newa_project_station_data`
const LS_MODEL_KEY = `blueberry_maggot_model`

let ls_stationData
let ls_model
if (typeof window !== "undefined") {
  ls_stationData = JSON.parse(
    window.localStorage.getItem(`${LS_STATION_DATA_KEY}`)
  )
  ls_model = JSON.parse(window.localStorage.getItem(`${LS_MODEL_KEY}`))
}

// const user = null
const user = {
  name: "Alex Sinfarosa",
  email: "as898@cornell.edu",
  stateOrProvince: "New Jersey",
  favoriteStations: ["kdxr icao", "kbdr icao", "ew_haw miwx"],
  activeTools: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  weatherVariables: [0, 1, 2, 6, 7],
  preExpanded: [0],
}

const DEFAULT_STATE = {
  station: ls_stationData ? ls_stationData.station : null,
  dateOfInterest: { date: new Date(), dayOfYear: getDayOfYear(new Date()) },
  stationData: ls_stationData ? ls_stationData : null,
  showMap: ls_model ? ls_model.showMap : false,
  showManagementGuide: ls_model ? ls_model.showManagementGuide : true,
  showResultsTable: ls_model ? ls_model.showResultsTable : true,
  showResultsGraph: ls_model ? ls_model.showResultsGraph : false,
  showEnvirValuesTable: ls_model ? ls_model.showEnvirValuesTable : false,
}

function reducer(state, action) {
  switch (action.type) {
    case "setStation": {
      return {
        ...state,
        station: action.station,
      }
    }
    case "setDateOfInterest": {
      return {
        ...state,
        dateOfInterest: action.dateOfInterest,
      }
    }
    case "toggleMap": {
      return {
        ...state,
        showMap: !state.showMap,
      }
    }
    case "toggleManagementGuide": {
      return {
        ...state,
        showManagementGuide: !state.showManagementGuide,
      }
    }
    case "toggleResultsTable": {
      return {
        ...state,
        showResultsTable: !state.showResultsTable,
      }
    }
    case "toggleResultsGraph": {
      return {
        ...state,
        showResultsGraph: !state.showResultsGraph,
      }
    }
    case "toggleEnvirValuesTable": {
      return {
        ...state,
        showEnvirValuesTable: !state.showEnvirValuesTable,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

let modelName = ""
if (typeof window !== "undefined") {
  const pathname = window.location.pathname
  modelName = pathname
    .slice(1)
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .slice(0, -1)
}

const GlobalStateContext = React.createContext()
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, DEFAULT_STATE)

  React.useEffect(() => {
    window.localStorage.setItem(
      LS_MODEL_KEY,
      JSON.stringify({
        showMap: state.showMap,
        showManagementGuide: state.showManagementGuide,
        showResultsTable: state.showResultsTable,
        showResultsGraph: state.showResultsGraph,
        showEnvirValuesTable: state.showEnvirValuesTable,
      })
    )
  }, [state])

  return (
    <GlobalStateContext.Provider
      value={{
        modelName,
        user,
        LS_ALL_STATIONS_KEY,
        LS_STATION_DATA_KEY,
        LS_MODEL_KEY,
        ...state,
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
export default GlobalStateContext
