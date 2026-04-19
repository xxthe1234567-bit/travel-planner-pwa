import { format, parseISO, differenceInDays, addDays, isToday, isSameDay } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export function formatDate(date: string | Date, pattern = 'MM/dd'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, pattern, { locale: zhTW })
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'HH:mm')
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'MM/dd HH:mm', { locale: zhTW })
}

export function formatFullDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'yyyy年MM月dd日', { locale: zhTW })
}

export function getDaysUntil(targetDate: string | Date): number {
  const d = typeof targetDate === 'string' ? parseISO(targetDate) : targetDate
  return differenceInDays(d, new Date())
}

export function getTripDays(startDate: string, endDate: string): string[] {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  const days: string[] = []
  let current = start
  while (current <= end) {
    days.push(format(current, 'yyyy-MM-dd'))
    current = addDays(current, 1)
  }
  return days
}

export function isDateToday(date: string): boolean {
  return isToday(parseISO(date))
}

export function isSameDate(date1: string, date2: string): boolean {
  return isSameDay(parseISO(date1), parseISO(date2))
}

export function getWeekday(date: string): string {
  const d = parseISO(date)
  return format(d, 'EEE', { locale: zhTW })
}

export function getMonthDay(date: string): string {
  const d = parseISO(date)
  return format(d, 'MM/dd', { locale: zhTW })
}