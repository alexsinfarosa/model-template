import React from "react"

const LS_KEY = `blueberry_maggot_degree_day_model`
let ls_modelData
if (typeof window !== "undefined") {
  ls_modelData = JSON.parse(window.localStorage.getItem(`${LS_KEY}`))
}

const DEFAULT_STATE = {
  station: ls_modelData ? ls_modelData.station : null,
  res: ls_modelData ? ls_modelData.res : null,
  showMap: ls_modelData ? ls_modelData.showMap : false,
  showGraph: ls_modelData ? ls_modelData.showGraph : false,
  showPestManagement: ls_modelData ? ls_modelData.showPestManagement : true,
  showMessages: ls_modelData ? ls_modelData.showMessages : false,
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
    case "toggleGraph": {
      return {
        ...state,
        showGraph: !state.showGraph,
      }
    }
    case "toggleMessages": {
      return {
        ...state,
        showMessages: !state.showMessages,
      }
    }
    case "togglePestManagement": {
      return {
        ...state,
        showPestManagement: !state.showPestManagement,
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
    window.localStorage.setItem(LS_KEY, JSON.stringify(state))
  }, [state])

  return (
    <GlobalStateContext.Provider
      value={{
        LS_KEY,
        ...state,
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
export default GlobalStateContext
