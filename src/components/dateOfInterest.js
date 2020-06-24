import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function DateOfInterest() {
  const [startDate, setStartDate] = React.useState(new Date())
  return (
    <DatePicker
      id="dateOfInterest"
      selected={startDate}
      onChange={date => setStartDate(date)}
      maxDate={new Date()}
      inline
      // showMonthDropdown
      showYearDropdown
      // dateFormatCalendar="MMMM"
      // yearDropdownItemNumber={5}
      // scrollableYearDropdown
    />
  )
}
