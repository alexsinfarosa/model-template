import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import GlobalStateContext from "../context/globalStateContext"
import { getDayOfYear } from "date-fns"

export default function DateOfInterest() {
  const { dateOfInterest, dispatch } = React.useContext(GlobalStateContext)
  return (
    <DatePicker
      id="dateOfInterest"
      selected={dateOfInterest.date}
      onChange={dateOfInterest =>
        dispatch({
          type: "setDateOfInterest",
          dateOfInterest: {
            dayOfYear: getDayOfYear(new Date(dateOfInterest)),
            date: dateOfInterest,
          },
        })
      }
      maxDate={new Date()}
      inline
      showYearDropdown
    />
  )
}
