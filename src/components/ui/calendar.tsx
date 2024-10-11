import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 grid grid-cols-7 gap-2", className)} // 그리드 레이아웃
      classNames={{
        months: "flex flex-col items-center space-y-4", // 중간 정렬 및 공간 조절
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-bold", // 텍스트 크기 및 굵기 변경
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: " border-collapse",
        head_row: "flex ",
        head_cell:
          "text-muted-foreground  w-full font-normal text-sm text-center", // 중앙 정렬 추가
        row: "flex",
        cell: cn(
          "relative text-left align-top p-2 border border-gray-300 rounded-md", // 텍스트를 왼쪽 상단에 배치
          "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50"
        ),
        day: cn(
          "h-[110px] w-[130px] font-normal", // 날짜 칸 크기 조절
          "[&:hover]:bg-gray-200 flex items-start justify-start" // 텍스트가 왼쪽 상단에 배치되도록 flex 조정
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-5 w-5" />, // 아이콘 크기 조정
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
