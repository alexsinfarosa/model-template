import React from "react"
import dataFetchReducer from "../reducers/dataFetchReducer"
import { fetchStationData, fetchHourlyForecastData } from "../utils/fetchData"
import GlobalStateContext from "../context/globalStateContext"
import vXDef from "../assets/vXDef.json"
import { differenceInHours, getDayOfYear } from "date-fns"
import {
  setParams,
  formatDate,
  stationIdAdjustment,
  prettifyACISData,
  rhumAdjustmentForIcaoStations,
  determineLeafWetness,
  calculateDewpoint,
  calculateCurrentHourFromData,
  baskervilleEmin,
} from "../utils/utils"

export default function useStationData() {
  const { LS_STATION_DATA_KEY, station, dateOfInterest } = React.useContext(
    GlobalStateContext
  )
  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  })

  const isSameYear =
    new Date(dateOfInterest.date).getFullYear() === new Date().getFullYear()

  React.useEffect(() => {
    async function fetchStationHourlyData(stn) {
      console.log(
        "fetchStationHourlyData ------------------------------------------"
      )
      // console.log("fetchStationHourlyData", stn.name)
      const sdate = `${new Date(dateOfInterest.date).getFullYear()}-01-01`
      let edate = ""
      if (isSameYear) {
        edate = formatDate(new Date())
      } else {
        edate = `${new Date(dateOfInterest.date).getFullYear()}-12-31`
      }
      let eleList = vXDef[stn.network]

      const body = {
        sdate,
        edate,
        sid: `${stationIdAdjustment(stn)} ${stn.network}`,
        elems: setParams(stn.network),
      }

      dispatch({ type: "FETCH_INIT" })
      try {
        let dataFinal
        let currentHour
        let currentDayMissingValues = 0
        let datesWithFiveOrMoreMissingValues = []

        let stationData = await fetchStationData(body)
        if (stationData.data) {
          const data = prettifyACISData(stationData.data, eleList)
          // console.log({ data })

          // START: Relative Humidity adjustment for ICAO stations ///////////////////
          const data2 = data.map(d => {
            let p = { ...d }
            if (stn.network === "icao") {
              p["rhum"] = rhumAdjustmentForIcaoStations(p.rhum)
            }
            return p
          })
          // console.log({ data2 })
          // END: Relative Humidity adjustment for ICAO stations ///////////////////

          // START: Determine Leaf wetness if weather station does not have it ///////
          let data3 = [...data2]
          if (!Object.keys(eleList).includes("lwet")) {
            data3 = data2.map(d => {
              let p = { ...d }
              if ("lwet" in Object.keys(p)) {
                return p
              } else {
                p["lwet"] = determineLeafWetness(p["rhum"])
                return p
              }
            })
          }
          // console.log({ data3 })
          // END: Determine Leaf wetness if weather station does not have it ///////

          // START: Calculate Dewpoint (dwpt). Only ICAO stations have dwpt ////////
          let data4 = [...data3]
          if (stn.network !== "icao") {
            data4 = data3.map(d => {
              let p = { ...d }
              p["dwpt"] = d.temp.map((t, i) => {
                const dwpt = calculateDewpoint(t, d.rhum[i])
                if (dwpt === undefined || dwpt === "M") {
                  return "M"
                } else {
                  return dwpt.toFixed(0)
                }
              })
              return p
            })
          }
          // console.log({ data4 })
          // END: Calculate Dewpoint (dwpt). Only ICAO stations have dwpt ////////

          // START: Shift all values from [0:23] to [1:24] in order to match the hours ///
          const data5 = data4.map((day, i) => {
            const { date, ...rest } = day
            let p = { date }
            for (let [key, arr] of Object.entries(rest)) {
              if (i === 0) {
                p[key] = [arr[0], ...arr.slice(0, -1)]
              } else {
                const priorDay = data4[i - 1][key]
                p[key] = [priorDay[priorDay.length - 1], ...arr.slice(0, -1)]
              }
            }
            return p
          })
          // console.log({ data5 })
          // END: Shift all values from [0:23] to [1:24] in order to match the hours ///

          // START: Calculate current hour and current hour data /////////////////////////
          let data6
          const currentDate = data5.slice(-1)[0]
          currentDayMissingValues = currentDate.temp.filter(d => d === "M")
            .length
          if (currentDayMissingValues === 24) {
            dataFinal = [...data5]
          } else {
            currentHour = calculateCurrentHourFromData(currentDate)
            let upToCurrentHour = {}
            Object.entries(currentDate).forEach(([key, val]) => {
              if (key === "date") {
                upToCurrentHour[key] = val
              } else {
                upToCurrentHour[key] = val.slice(0, currentHour)
              }
            })
            data6 = [...data5.slice(0, -1), upToCurrentHour]
          }
          // console.log({ data6 })
          // END: Calculate current hour and current hour data /////////////////////////

          // START: Calculate dd, gdd, min, avg, max ///////////////////////////////////
          let dd = 0
          let gdd = 0
          let min
          let avg
          let max
          const data7 = data6.map((day, i) => {
            const dailyMissingValues = day.temp.filter(t => t === "M").length
            if (dailyMissingValues >= 5) {
              datesWithFiveOrMoreMissingValues.push(i)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: "N/A",
                gdd: "N/A",
                min: "N/A",
                avg: "N/A",
                max: "N/A",
              }
            } else {
              const tempsNoMissingValues = day.temp
                .filter(t => t !== "M")
                .map(d => +d)
              min = Math.min(...tempsNoMissingValues)
              max = Math.max(...tempsNoMissingValues)
              avg =
                tempsNoMissingValues.reduce((a, b) => a + b) /
                tempsNoMissingValues.length
              dd = Math.abs(baskervilleEmin(min, max, 50))
              gdd += Math.round(dd)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: Math.round(dd),
                gdd: Math.round(gdd),
                min: Math.round(min),
                avg: Math.round(avg),
                max: Math.round(max),
              }
            }
          })
          dataFinal = [...data7]
          // END: Calculate dd, gdd, min, avg, max ///////////////////////////////////
          // console.log({ dataFinal })
        }

        let updatedForecast = null
        if (isSameYear) {
          // START: Forecast //////////////////////////////////////////////////////////
          const forecast = await fetchHourlyForecastData(body)
          // console.log({ forecast: forecast.slice(1) })
          // END: Forecast ////////////////////////////////////////////////////////////

          // START: Calculate dd, gdd, min, avg, max ///////////////////////////////////
          let fdd = 0
          let fgdd = Number(dataFinal.map(d => d.gdd).slice(-1)[0])
          let fmin
          let favg
          let fmax
          updatedForecast = forecast.slice(1).map((day, i) => {
            const dailyMissingValues = day.temp.filter(t => t === "M").length
            if (dailyMissingValues >= 5) {
              datesWithFiveOrMoreMissingValues.push(i)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: "N/A",
                gdd: "N/A",
                min: "N/A",
                avg: "N/A",
                max: "N/A",
              }
            } else {
              const tempsNoMissingValues = day.temp
                .filter(t => t !== "M")
                .map(d => +d)
              fmin = Math.min(...tempsNoMissingValues)
              fmax = Math.max(...tempsNoMissingValues)
              favg =
                tempsNoMissingValues.reduce((a, b) => a + b) /
                tempsNoMissingValues.length
              fdd = Math.abs(baskervilleEmin(fmin, fmax, 50))
              fgdd += Math.round(fdd)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: Math.round(fdd),
                gdd: Math.round(fgdd),
                min: Math.round(fmin),
                avg: Math.round(favg),
                max: Math.round(fmax),
              }
            }
          })
          // START: Determine weather icons from forecast data ////////////////////////
          // const forecastWithIcons = determineForecastWeatherIcon(
          //   forecast,
          //   currentHour
          // )
          // console.log({ forecastWithIcons })
          // END: Determine weather icons from forecast data //////////////////////////
        }

        dispatch({
          type: "FETCH_SUCCESS",
          res: {
            station,
            stationData: dataFinal,
            forecast: updatedForecast,
            currentHour,
            currentDayMissingValues,
            datesWithFiveOrMoreMissingValues,
          },
        })

        // START: Setup local storage ///////////////////////////////////////
        localStorage.setItem(
          `${LS_STATION_DATA_KEY}`,
          JSON.stringify({
            station,
            stationData: dataFinal,
            forecast: updatedForecast,
            currentHour,
            currentDayMissingValues,
            lastSuccess: Date.now(),
            fetchedAtHour: new Date().getHours(),
          })
        )
        // END: Setup local storage ///////////////////////////////////////
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" })
      }
    }

    if (station) {
      const LS_STATION_DATA = JSON.parse(
        window.localStorage.getItem(`${LS_STATION_DATA_KEY}`)
      )

      if (LS_STATION_DATA) {
        const isSameStation =
          `${station.id}-${station.network}` ===
          `${LS_STATION_DATA.station.id}-${LS_STATION_DATA.station.network}`

        const isSameYear_LS =
          new Date(LS_STATION_DATA.stationData[0].date).getFullYear() ===
          new Date(dateOfInterest.date).getFullYear()

        if (
          differenceInHours(Date.now(), LS_STATION_DATA.lastSuccess) >= 1 ||
          !isSameStation ||
          !isSameYear_LS
        ) {
          console.log("More than 1 hour since we fetched")
          fetchStationHourlyData(station)
        } else {
          dispatch({
            type: "FETCH_SUCCESS",
            res: LS_STATION_DATA,
          })
        }
      } else {
        fetchStationHourlyData(station)
      }
    }
  }, [station, dateOfInterest, LS_STATION_DATA_KEY])

  return { ...state }
}
