import React from "react"

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
  stateOrProvince: "New York",
  favoriteStations: ["kdxr icao", "kbdr icao", "ew_haw miwx"],
  activeTools: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  weatherVariables: [0, 1, 2, 6, 7],
  preExpanded: [0],
}

const DEFAULT_STATE = {
  station: ls_stationData ? ls_stationData.station : null,
  stationData: ls_stationData ? ls_stationData : null,
  showMap: ls_model ? ls_model.showMap : false,
  showManagementGuide: ls_model ? ls_model.showManagementGuide : true,
  showResultsTable: ls_model ? ls_model.showResultsTable : true,
  showResultsGraph: ls_model ? ls_model.showResultsGraph : false,
}

function reducer(state, action) {
  switch (action.type) {
    case "setStation": {
      return {
        ...state,
        station: action.station,
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const GlobalStateContext = React.createContext()
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, DEFAULT_STATE)

  React.useEffect(() => {
    window.localStorage.setItem(
      LS_STATION_DATA_KEY,
      JSON.stringify(state.stationData)
    )
    window.localStorage.setItem(
      LS_MODEL_KEY,
      JSON.stringify({
        showMap: state.showMap,
        showManagementGuide: state.showManagementGuide,
        showResultsTable: state.showResultsTable,
        showResultsGraph: state.showResultsGraph,
      })
    )
  }, [state])

  return (
    <GlobalStateContext.Provider
      value={{
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
