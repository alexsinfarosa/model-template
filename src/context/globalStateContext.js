import React from "react"

const LS_KEY = `newa_project_`
let ls_data
let ls_stations
if (typeof window !== "undefined") {
  ls_data = JSON.parse(window.localStorage.getItem(`${LS_KEY}_data`))
  ls_stations = JSON.parse(window.localStorage.getItem(`${LS_KEY}_stations`))
}

const DEFAULT_STATE = {
  station: ls_data ? ls_data.station : null,
  stations: ls_stations ? ls_stations : [],
}

function reducer(state, action) {
  switch (action.type) {
    case "setStation": {
      return {
        ...state,
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
  const [showMap, setShowMap] = React.useState(false)

  return (
    <GlobalStateContext.Provider
      value={{
        ...state,
        dispatch,
        ls_data,
        ls_stations,
        showMap,
        setShowMap,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
export default GlobalStateContext
