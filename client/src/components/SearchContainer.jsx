import React from 'react'
import FilterForm from './filterForm'

const SearchContainer = () => {
  return (
   <FilterForm  fields={[
    {
      fieldName: "exam",
      label: "Saman",
      fieldOptions: [
        { text: "IELTS", value: "1" },
        { text: "PTE", value: "2" },
        { text: "GRE", value: "3" },
        { text: "TOEFL", value: "4" },
      ],
    },
    {
      fieldName: "city",
      label: "City",
      fieldOptions: [],
    },
    {
      fieldName: "paymentMode",
      label: "Payment Mode",
      fieldOptions: [
        { text: "Cash", value: "cash" },
        { text: "QR", value: "qr" },
      ],
      type: "value",
    },
    {
      fieldName: "rhythm",
      label: "Hero",
      fieldOptions: [
        { text: "Cash", value: "cash" },
        { text: "QR", value: "qr" },
      ],
      type: "value",
      placeHolder:"Hero rhythm"
    },
  ]}
  quickFilters={[
    "All",
    "Pending",
    "In Progress",
    "Booked",
    "Cancelled",
    "Result Published",
    "On Hold",
    "Awaiting Result",
  ]}/>
  )
}

export default SearchContainer