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
      // todayButton="Today"
      inline
      className="w-full border border-gray-300 rounded-md p-2 outline-none hover:border-gray-400 focus:border-2 focus:border-primary-600 shadow-sm"
    />
  )
}
