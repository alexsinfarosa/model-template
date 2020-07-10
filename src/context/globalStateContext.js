import React from "react"
import { getDayOfYear } from "date-fns"
import stateAndProvinces from "../assets/statesAndProvinces.json"

let url = new URL("https://newa-models.netlify.app")
let modelName = ""
let user = {}
const LS_ALL_STATIONS_KEY = `newa_project_stations`
const LS_STATION_DATA_KEY = `newa_project_station_data`
const LS_MODEL_KEY = `blueberry_maggot_model`

let ls_stationData
let ls_model
if (typeof window !== "undefined") {
  url = new URL(window.location.href)

  modelName = url.pathname
    .replace(/\//g, "")
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  if (url.searchParams.has("favStns") && url.searchParams.has("sop")) {
    const stateOrProvince = url.searchParams.get("sop").toUpperCase()
    if (stateAndProvinces.find(d => d.postalCode === stateOrProvince)) {
      user["stateOrProvince"] = stateOrProvince
    }
    user["favoriteStations"] = url.searchParams.get("favStns").split(",")
  }

  ls_stationData = JSON.parse(
    window.localStorage.getItem(`${LS_STATION_DATA_KEY}`)
  )

  ls_model = JSON.parse(window.localStorage.getItem(`${LS_MODEL_KEY}`))
}

const DEFAULT_STATE = {
  station: ls_stationData ? ls_stationData.station : null,
  dateOfInterest: { date: new Date(), dayOfYear: getDayOfYear(new Date()) },
  stationData: ls_stationData ? ls_stationData : null,
  showMap: ls_model
    ? ls_model.showMap
    : !Object.keys(user).length
    ? true
    : false,
  showManagementGuide: ls_model ? ls_model.showManagementGuide : true,
  showResultsTable: ls_model ? ls_model.showResultsTable : true,
  showResultsGraph: ls_model ? ls_model.showResultsGraph : true,
  showEnvirValuesTable: ls_model ? ls_model.showEnvirValuesTable : true,
  user: !Object.keys(user).length
    ? ls_model
      ? typeof ls_model.user === "undefined" ||
        !Object.keys(ls_model.user).length
        ? user
        : ls_model.user
      : user
    : user,
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
        user: state.user,
      })
    )
    //     window.localStorage.setItem(
    //   LS_STATION_DATA_KEY,
    //   JSON.stringify({
    //     showMap: state.showMap,
    //     showManagementGuide: state.showManagementGuide,
    //     showResultsTable: state.showResultsTable,
    //     showResultsGraph: state.showResultsGraph,
    //     showEnvirValuesTable: state.showEnvirValuesTable,
    //     user: state.user,
    //   })
    // )
  }, [state])

  return (
    <GlobalStateContext.Provider
      value={{
        url,
        modelName,
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
