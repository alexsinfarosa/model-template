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
            data6 = [...data5]
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
          let minT
          let avgT
          let maxT
          const data7 = data6.map((day, i) => {
            const dailyMissingValues = day.temp.filter(t => t === "M").length
            if (dailyMissingValues >= 5) {
              datesWithFiveOrMoreMissingValues.push(i)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: "N/A",
                gdd: "N/A",
                minT: "N/A",
                avgT: "N/A",
                maxT: "N/A",
              }
            } else {
              const tempsNoMissingValues = day.temp
                .filter(t => t !== "M")
                .map(d => +d)
              minT = Math.min(...tempsNoMissingValues)
              maxT = Math.max(...tempsNoMissingValues)
              avgT =
                tempsNoMissingValues.reduce((a, b) => a + b) /
                tempsNoMissingValues.length
              dd = Math.abs(baskervilleEmin(minT, maxT, 50))
              gdd += Math.round(dd)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: Math.round(dd),
                gdd: Math.round(gdd),
                minT: Math.round(minT),
                avgT: Math.round(avgT),
                maxT: Math.round(maxT),
              }
            }
          })
          dataFinal = [...data7]
          // console.log({ dataFinal })
          // console.log({ datesWithFiveOrMoreMissingValues })
          // END: Calculate dd, gdd, min, avg, max ///////////////////////////////////
          // console.log({ dataFinal })
        }

        let updatedForecast = null
        if (isSameYear) {
          // START: Forecast //////////////////////////////////////////////////////////
          const forecast = await fetchHourlyForecastData(body)
          // console.log({ forecast })
          // END: Forecast ////////////////////////////////////////////////////////////

          const forecastFirstDay = forecast[0]
          const stationDataLastDay = dataFinal.slice(-1)[0]

          const forecastWeatherVariables = Object.keys(forecastFirstDay).slice(
            1
          )
          let hybridDay = { ...stationDataLastDay }
          Object.entries(stationDataLastDay).forEach(([key, val]) => {
            if (forecastWeatherVariables.includes(key)) {
              hybridDay[key] = [
                ...val,
                ...forecastFirstDay[key].slice(currentHour),
              ]
            }
          })

          let indexWithValidGdd = dataFinal.slice(-2)[0].dayOfYear - 1
          while (isNaN(dataFinal[indexWithValidGdd].gdd)) {
            indexWithValidGdd--
          }

          // START: Calculate dd, gdd, min, avg, max ///////////////////////////////////
          let fdd = 0
          let fgdd = dataFinal[indexWithValidGdd].gdd
          let fminT
          let favgT
          let fmaxT
          updatedForecast = [hybridDay, ...forecast.slice(1)].map((day, i) => {
            const dailyMissingValues = day.temp.filter(t => t === "M").length
            if (dailyMissingValues >= 5) {
              datesWithFiveOrMoreMissingValues.push(i)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: "N/A",
                gdd: "N/A",
                minT: "N/A",
                avgT: "N/A",
                maxT: "N/A",
              }
            } else {
              const tempsNoMissingValues = day.temp
                .filter(t => t !== "M")
                .map(d => +d)
              fminT = Math.min(...tempsNoMissingValues)
              fmaxT = Math.max(...tempsNoMissingValues)
              favgT =
                tempsNoMissingValues.reduce((a, b) => a + b) /
                tempsNoMissingValues.length
              fdd = Math.abs(baskervilleEmin(fminT, fmaxT, 50))
              fgdd += Math.round(fdd)
              return {
                ...day,
                dayOfYear: getDayOfYear(new Date(day.date)),
                dd: Math.round(fdd),
                gdd: Math.round(fgdd),
                minT: Math.round(fminT),
                avgT: Math.round(favgT),
                maxT: Math.round(fmaxT),
              }
            }
          })
        }
        // console.log({ updatedForecast })

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
          console.log(`Difference in hours since last fetch: ${differenceInHours(
            Date.now(),
            LS_STATION_DATA.lastSuccess
          )}
          `)
          console.log(`isSameYear: ${isSameYear_LS}`)
          console.log(`isSameStation: ${isSameStation}`)
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
  }, [station, dateOfInterest, LS_STATION_DATA_KEY, isSameYear])

  return { ...state }
}
