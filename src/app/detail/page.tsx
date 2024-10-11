"use client"

import { Calendar } from "@/components/ui/calendar"
import { DatePickerWithRange } from "@/components/ui/datePicker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ko } from "date-fns/locale";
import React from "react"


const detailPage = () => {
    // 샤드시엔 달력 날짜
    const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    
    <>
     <Calendar
    locale={ko}
    mode="single"
    selected={date}
    onSelect={setDate}
    className="flex items-center justify-center"
  />
  <DatePickerWithRange/>
    </>
  )
}

export default detailPage