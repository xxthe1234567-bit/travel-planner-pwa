import { Card } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Select'
import { formatDate } from '../../utils/dateUtils'
import type { JournalEntry, Member } from '../../types'

interface JournalCardProps {
  entry: JournalEntry
  members: Member[]
}

export function JournalCard({ entry, members }: JournalCardProps) {
  const author = members.find((m) => m.id === entry.author)

  return (
    <Card className="overflow-hidden">
      {entry.photos.length > 0 && (
        <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-hide">
          {entry.photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt=""
              className="w-full h-48 object-cover rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        {author && (
          <Avatar src={author.avatarUrl} name={author.name} color={author.color} size="sm" />
        )}
        <span className="font-medium text-gray-800">{author?.name || '匿名'}</span>
        <span className="text-sm text-gray-400">·</span>
        <span className="text-sm text-gray-400">{formatDate(entry.date, 'MM/dd HH:mm')}</span>
      </div>

      <h3 className="font-bold text-gray-800 mb-1">{entry.title}</h3>
      <p className="text-gray-600 text-sm whitespace-pre-wrap">{entry.content}</p>

      {entry.location && (
        <p className="mt-2 text-sm text-gray-400 flex items-center gap-1">
          📍 {entry.location}
        </p>
      )}
    </Card>
  )
}