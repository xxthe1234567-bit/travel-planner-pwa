import { useRef, useEffect } from 'react'
import { getTripDays, getWeekday, getMonthDay } from '../../utils/dateUtils'

interface DateSelectorProps {
  startDate: string
  endDate: string
  selectedDate: string
  onSelectDate: (date: string) => void
}

export function DateSelector({ startDate, endDate, selectedDate, onSelectDate }: DateSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const days = getTripDays(startDate, endDate)

  useEffect(() => {
    if (scrollRef.current) {
      const selected = scrollRef.current.querySelector(`[data-date="${selectedDate}"]`)
      if (selected) {
        selected.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [selectedDate])

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
    >
      {days.map((date, index) => {
        const isSelected = date === selectedDate
        const isToday = date === new Date().toISOString().split('T')[0]
        return (
          <button
            key={date}
            data-date={date}
            onClick={() => onSelectDate(date)}
            className={`flex-shrink-0 w-14 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all
              ${isSelected ? 'bg-sage text-white shadow-soft' : 'bg-white shadow-soft-sm'}
              ${isToday && !isSelected ? 'ring-2 ring-sage' : ''}`}
          >
            <span className={`text-xs font-medium ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
              Day {index + 1}
            </span>
            <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
              {getMonthDay(date)}
            </span>
            <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
              {getWeekday(date)}
            </span>
          </button>
        )
      })}
    </div>
  )
}