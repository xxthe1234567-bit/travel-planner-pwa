import { Card } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Select'
import { EXPENSE_CATEGORIES } from '../../constants/theme'
import { formatDate } from '../../utils/dateUtils'
import type { Expense, Member } from '../../types'

interface ExpenseListProps {
  date: string
  items: Expense[]
  members: Member[]
}

export function ExpenseList({ date, items, members }: ExpenseListProps) {
  const getMember = (id: string) => members.find((m) => m.id === id)

  const categoryLabel = {
    food: '🍔 餐飲',
    transport: '🚆 交通',
    accommodation: '🏨 住宿',
    shopping: '🛍️ 購物',
    entertainment: '🎮 娛樂',
    other: '📦 其他',
  }

  const total = items.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-500">{formatDate(date, 'MM/dd')}</p>
        <p className="text-sm font-medium text-gray-500">
          合計 {items[0]?.currency} {total.toLocaleString()}
        </p>
      </div>
      <div className="space-y-2">
        {items.map((expense) => {
          const payer = getMember(expense.payer)
          return (
            <Card key={expense.id} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: EXPENSE_CATEGORIES[expense.category] + '20' }}
              >
                {categoryLabel[expense.category].split(' ')[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800 truncate">
                    {categoryLabel[expense.category].split(' ')[1]}
                  </span>
                  {payer && (
                    <Avatar src={payer.avatarUrl} name={payer.name} color={payer.color} size="sm" />
                  )}
                </div>
                {expense.notes && (
                  <p className="text-sm text-gray-500 truncate">{expense.notes}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">
                  {expense.currency} {expense.amount.toLocaleString()}
                </p>
                {expense.splitAmong.length > 1 && (
                  <p className="text-xs text-gray-400">
                    分攤 {expense.splitAmong.length} 人
                  </p>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}