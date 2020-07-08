import statesAndProvinces from "../assets/statesAndProvinces.json"
import vXDef from "../assets/vXDef.json"
import { getDayOfYear } from "date-fns"

/////////////////////////////////////////////////////////////
export function formatStationsToDisplayOnDropdownMenu(allStations) {
  let stations = [...allStations]
  let res = []

  statesAndProvinces
    .filter(s => s.isNewaStatePartner)
    .forEach(state => {
      let p = {}
      p.label = state.name
      p.postalCode = state.postalCode
      p.options = stations
        .filter(stn => stn.state === state.postalCode)
        .map(stn => {
          const rest = {
            ...stn,
            label: `${stn.name}, ${stn.state}`,
            stateFullName: state.name,
          }
          return rest
        })
      res.push(p)
    })
  return res.filter(s => s.options.length !== 0)
}

/////////////////////////////////////////////////////////////////
export function setParams(network) {
  const elems = vXDef[network]
  return Object.values(elems).map(val => {
    return { vX: val }
  })
}

//////////////////////////////////////////////////////////////////
export function formatDate(d) {
  const year = d.getFullYear()
  let month = d.getMonth() + 1
  if (month < 10) month = `0${month}`
  let date = d.getDate()
  if (date < 10) date = `0${date}`
  return `${year}-${month}-${date}`
}

////////////////////////////////////////////////////////////
export function formatAMPM(hour) {
  const amOrpm = hour > 11 ? "PM" : "AM"
  const h = hour % 12 || 12
  return `${h}:00 ${amOrpm}`
}

//////////////////////////////////////////////////////////////////
export function stationIdAdjustment(stn) {
  // Michigan (miwx)
  if (stn.network === "miwx") {
    // remove ew_ to all station ids of 'miwx' network, example: ew_ITH becomes ITH
    return stn.id.slice(3, 6)
  }

  // NY mesonet (nysm)
  if (stn.network === "nysm") {
    // example: remove nysm_ to all station ids of 'nysm' network, example: nysm_spra becomes spra
    return stn.id.slice(5, 9)
  }

  return stn.id
}

///////////////////////////////////////////////////////////////////
export function prettifyACISData(data, elems) {
  let result = []
  data.forEach(day => {
    const [date, ...rest] = day
    let p = { date }
    Object.keys(elems).forEach((key, i) => {
      p[key] = rest[i]
    })
    result.push(p)
  })
  return result
}

/////////////////////////////////////////////////////////////////
// Handling Relative Humidity Adjustment for ICAO stations
export const rhumAdjustmentForIcaoStations = rhArrValues =>
  rhArrValues.map(rh => {
    const val = (Number(rh) / (0.0047 * Number(rh) + 0.53)).toFixed(0)
    return rh === "M" ? rh : typeof rh === "string" ? val : Number(val)
  })

// Leaf Wetness ///////////////////////////////////////////////
export function determineLeafWetness(rhumArr) {
  return rhumArr.map(r => (r === "M" ? r : r >= "90" ? "60" : "0"))
}

////////////////////////////////////////////////////////////
export function calculateDewpoint(tempF, rhum) {
  if (tempF !== "M" && rhum !== "M" && rhum > 0) {
    const tempC = (5.0 / 9.0) * (tempF - 32.0)
    const sat = 6.11 * Math.pow(10.0, (7.5 * tempC) / (237.7 + tempC))
    const vp = (rhum * sat) / 100.0
    const logvp = Math.log(vp)
    const dewptC = (-430.22 + 237.7 * logvp) / (-logvp + 19.08)
    return (9.0 / 5.0) * dewptC + 32.0
  }
}

/////////////////////////////////////////////////////////////
export function findMostFrequentNumber(numbers) {
  let counted = numbers.reduce((acc, curr) => {
    if (curr in acc) {
      acc[curr]++
    } else {
      acc[curr] = 1
    }

    return acc
  }, {})

  let mode = Object.keys(counted).reduce((a, b) =>
    counted[a] > counted[b] ? a : b
  )

  return mode
}

///////////////////////////////////////////////////////////
export function calculateCurrentHourFromData(todayObject) {
  const { date, ...rest } = todayObject
  const hours = Object.values(rest).map(
    arr => arr.filter(d => d !== "M").length
  )
  return Number(findMostFrequentNumber(hours))
}

/////////////////////////////////////////////////////////////////
// Convert Fahrenheit to Celcius
export const fahrenheitToCelcius = t => ((t - 32) * 5) / 9

//////////////////////////////////////////////////////////////////
// This formula is used to calculate growing degree day
export function baskervilleEmin(min, max, base) {
  if (min >= base) {
    const avg = (max + min) / 2
    return avg - base
  } else if (max <= base) {
    return 0
  } else {
    const avg = (max + min) / 2
    const amt = (max - min) / 2
    const t1 = Math.sin((base - avg) / amt)
    return avg < 0
      ? 0
      : (amt * Math.cos(t1) - (base - avg) * (3.14 / 2 - t1)) / 3.14
  }
}

///////////////////////////////////////////////////////////
export function calculateCustomGdd(data, base, startDate, formula) {
  let cdd = 0
  const splittedBase = base.split("˚")

  // The base can be in Celsius or Fahrenheit ---------------
  let bbase
  if (splittedBase[0] === "86/50") {
    bbase = 50
  } else {
    bbase = parseFloat(splittedBase[0])
  }

  // Index from which to start the accumulation
  let sDateIdx = 0 // default to January 1 index
  if (startDate === "March 1") {
    sDateIdx = 60 // March 1 index
  } else if (startDate === "April 1") {
    sDateIdx = 90 // April 1 index
  } else if (startDate === "May 1") {
    sDateIdx = 120 // May 1 index
  }

  if (data.length > sDateIdx) {
    data.slice(sDateIdx).forEach(d => {
      const countMissingValues = d.temp.filter(t => isNaN(t) || t === "M")
        .length
      let dd = 0
      if (countMissingValues < 5) {
        const filteredTemps = d.temp.filter(d => d !== "M")
        let temps = [...filteredTemps]
        if (bbase === 4 || bbase === 14.3 || bbase === 39) {
          temps = filteredTemps.map(t => fahrenheitToCelcius(t))
        }
        let min = Math.min(...temps)
        let max = Math.max(...temps)

        if (splittedBase[0] === "86/50") {
          if (max > 86) {
            max = 86
          }
          if (min < 50) {
            min = 50
          }
        }

        // Chose formula to determine how to calculate degree day
        if (formula === "Baskerville Emin") {
          dd = baskervilleEmin(min, max, bbase)
        } else {
          // Use average formula
          const avg = (min + max) / 2
          dd = avg - bbase > 0 ? avg - bbase : 0
        }
      }
      cdd += dd
    })
  }

  return cdd.toFixed(0)
}

export function formatDateMonthDay(stringDate) {
  // string date format: 2020-12-23
  const dd = stringDate.split("-")
  // const year = dd[0]
  const month = dd[1]
  const date = dd[2]
  const monthsList = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }
  return `${monthsList[month]} ${date}`
}

// export function leapYear(year) {
//   return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
// }

export function isModelInSeason(modelData, selectedDate) {
  const currentYear = new Date().getFullYear()
  const dateRange = modelData.isInSeason.split(" | ")
  const lowerDate = getDayOfYear(new Date(`${currentYear}-${dateRange[0]}`))
  const upperDate = getDayOfYear(new Date(`${currentYear}-${dateRange[1]}`))
  if (selectedDate) {
    if (
      selectedDate.dayOfYear >= lowerDate &&
      selectedDate.dayOfYear <= upperDate
    ) {
      for (const [key, values] of Object.entries(
        modelData.elements.managementGuide.thresholds
      )) {
        const gddRange = key.split("-")
        const lowerGdd = +gddRange[0]
        const upperGdd = +gddRange[1]
        if (selectedDate.gdd >= lowerGdd && selectedDate.gdd <= upperGdd) {
          return { resMngGuide: values, isInSeason: true }
        }
      }
    } else {
      return {
        resMngGuide: modelData.elements.managementGuide.outOfSeason,
        isInSeason: false,
      }
    }
  }
}
