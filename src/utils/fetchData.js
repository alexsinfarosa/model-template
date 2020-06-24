import axios from "axios"
import { format, addDays } from "date-fns"

let protocol = "http"
if (typeof window !== "undefined") {
  protocol = window.location.protocol
}

// Fetch selected station hourly data ---------------------------------------------------
export const fetchStationData = async body => {
  const url = `${protocol}//data.nrcc.rcc-acis.org/StnData`
  return axios
    .post(url, body)
    .then(res => res.data)
    .catch(err => console.log("Failed to load selected station data ", err))
}

// export const fetchSolarRadiationIcaoStations = async body => {
//   const url = `${protocol}//adhoc.rcc-acis.org/SolarRadiation`
//   const { sid, sdate, edate } = body
//   const id = sid.split(" ")[0]
//   return axios(`${url}?sid=${id}&sdate=${sdate}&edate=${edate}`)
//     .then(res => res.data.data)
//     .catch(err =>
//       console.log("Failed to fetch solar radiation from ICAO station", err)
//     )
// }

// Fetch forecast hourly data --------------------------------------------------------------
export const fetchHourlyForecastData = async body => {
  const url = `${protocol}//newa.nrcc.cornell.edu/newaUtil/getFcstData`
  // always need to add 5 days
  const plusFiveDays = format(addDays(new Date(), 5), "yyyy-MM-dd")
  // const plusFiveDays = "2020-05-23"

  // available forecast variables:  ['temp','rhum','wspd','tsky','qpf','dwpt','pop12']
  const forecastElementList = [
    "temp",
    "rhum",
    "wspd",
    "tsky",
    "qpf",
    "dwpt",
    "pop12",
  ]

  let req = forecastElementList.map(el =>
    axios
      .get(
        `${url}/${body.sid.split(" ")[0]}/${body.network}/${el}/${
          body.edate
        }/${plusFiveDays}`
      )
      .then(res => {
        return res.data.data.map(e => {
          return { date: e[0], [el]: e[1] }
        })
      })
      .catch(err =>
        console.log(`Failed to load ${el} hourly forecast data`, err)
      )
  )

  const response = await Promise.all(req)
  let forecastResults = [...response[0]]
  response.slice(1).forEach(variable => {
    variable.forEach((day, j) => {
      const variable = Object.keys(day).filter(key => key !== "date")
      forecastResults[j] = {
        ...forecastResults[j],
        [variable]: day[variable],
      }
    })
  })
  return forecastResults
}
