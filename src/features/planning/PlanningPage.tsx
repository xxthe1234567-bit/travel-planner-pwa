import { useState } from 'react'
import { PageContainer, Section } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { TodoList } from './TodoList'
import { useTripStore } from '../../stores/tripStore'

export function PlanningPage() {
  const { todos, members } = useTripStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { value: 'all', label: '全部' },
    { value: 'todo', label: '待辦' },
    { value: 'packing', label: '行李' },
    { value: 'shopping', label: '購物' },
  ]

  const filteredTodos = selectedCategory === 'all'
    ? todos
    : todos.filter((t) => t.category === selectedCategory)

  const completedCount = todos.filter((t) => t.isCompleted).length
  const totalCount = todos.length

  return (
    <PageContainer title="準備">
      <Section title="進度">
        <Card className="bg-gradient-to-br from-sage to-sage-light">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/80">完成進度</p>
            <p className="text-2xl font-bold text-white">
              {completedCount}/{totalCount}
            </p>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </Card>
      </Section>

      <Section title="">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedCategory === cat.value
                  ? 'bg-sage text-white shadow-soft-sm'
                  : 'bg-white text-gray-600 shadow-soft-sm'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="清單">
        <TodoList items={filteredTodos} members={members} />
      </Section>

      <Section title="">
        <Card className="flex items-center justify-center py-6">
          <button className="text-sage font-medium flex items-center gap-2">
            <span className="text-2xl">+</span>
            新增項目
          </button>
        </Card>
      </Section>
    </PageContainer>
  )
}