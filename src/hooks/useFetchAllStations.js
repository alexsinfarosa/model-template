import React from "react"
import axios from "axios"
import dataFetchReducer from "../reducers/dataFetchReducer"

export default function useFetchAllStations() {
  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: [],
  })

  React.useEffect(() => {
    let didCancel = false

    const fetchData = async () => {
      // console.log("Fetching ACIS stations...")
      dispatch({ type: "FETCH_INIT" })
      try {
        const result = await axios.get(
          `${window.location.protocol}//newa.nrcc.cornell.edu/newaUtil/stateStationList/all`
        )
        if (!didCancel) {
          window.localStorage.setItem(
            "newa_project__stations",
            JSON.stringify(result.data.stations)
          )

          dispatch({
            type: "FETCH_SUCCESS",
            res: result.data.stations,
          })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" })
        }
      }
    }

    const ls_stations = JSON.parse(
      window.localStorage.getItem(`newa_project__stations`)
    )
    if (ls_stations === null) {
      fetchData()
    } else {
      dispatch({
        type: "FETCH_SUCCESS",
        res: ls_stations,
      })
    }

    return () => {
      didCancel = true
    }
  }, [])

  return { ...state, stations: state.data }
}
