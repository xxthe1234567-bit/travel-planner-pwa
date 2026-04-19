import { Card } from '../../components/ui/Card'
import { AvatarGroup } from '../../components/ui/Select'
import { useTripStore } from '../../stores/tripStore'
import type { TodoItem, Member } from '../../types'

interface TodoListProps {
  items: TodoItem[]
  members: Member[]
}

export function TodoList({ items, members }: TodoListProps) {
  const { toggleTodo } = useTripStore()

  const getAssignedMembers = (assignedTo: string[]) => {
    return assignedTo
      .map((id) => members.find((m) => m.id === id))
      .filter((m): m is Member => m !== undefined)
  }

  const categoryEmoji = {
    todo: '📋',
    packing: '🧳',
    shopping: '🛒',
  }

  if (items.length === 0) {
    return (
      <Card className="text-center py-6 text-gray-400">
        尚無項目
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {items.map((todo) => {
        const assigned = getAssignedMembers(todo.assignedTo)
        return (
          <Card
            key={todo.id}
            className={`flex items-center gap-3 cursor-pointer transition-all ${
              todo.isCompleted ? 'opacity-50' : ''
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0
                ${todo.isCompleted ? 'bg-sage border-sage' : 'border-gray-300'}`}
            >
              {todo.isCompleted && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xl">{categoryEmoji[todo.category]}</span>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium truncate ${
                  todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </p>
              {assigned.length > 0 && (
                <AvatarGroup
                  members={assigned.map((m) => ({ name: m.name, avatarUrl: m.avatarUrl, color: m.color }))}
                  size="sm"
                />
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}