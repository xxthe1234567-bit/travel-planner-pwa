import { Card } from '../../components/ui/Card'
import { CATEGORY_COLORS } from '../../constants/theme'
import type { ScheduleItem } from '../../types'

interface TimelineItemProps {
  item: ScheduleItem
}

export function TimelineItem({ item }: TimelineItemProps) {
  const categoryColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.attraction

  const categoryLabel = {
    attraction: '景點',
    food: '美食',
    transport: '交通',
    accommodation: '住宿',
  }

  return (
    <div className="relative flex gap-3">
      <div
        className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white"
        style={{ backgroundColor: categoryColor }}
      />
      <Card className="ml-6 flex-1">
        <div className="flex items-start gap-3">
          <div
            className="px-2 py-1 rounded-lg text-xs font-medium text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryLabel[item.category]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-gray-800 truncate">
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>⏰ {item.time}</span>
              <span>📍 {item.location}</span>
            </div>
            {item.notes && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.notes}</p>
            )}
            {item.photos.length > 0 && (
              <div className="flex gap-1 mt-2 overflow-x-auto">
                {item.photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}