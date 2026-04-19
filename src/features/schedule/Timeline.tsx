import { TimelineItem } from './TimelineItem'
import type { ScheduleItem } from '../../types'

interface TimelineProps {
  items: ScheduleItem[]
}

export function Timeline({ items }: TimelineProps) {
  const sortedItems = [...items].sort((a, b) => a.time.localeCompare(b.time))

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-soft-sm p-6 text-center">
        <p className="text-gray-400 mb-2">今日無行程</p>
        <p className="text-sm text-gray-400">點擊下方按鈕新增行程</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-cream-dark" />
      <div className="space-y-3">
        {sortedItems.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}