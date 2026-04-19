import { useState } from 'react'
import { PageContainer, Section } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { ExpenseList } from './ExpenseList'
import { ExpenseForm } from './ExpenseForm'
import { Modal } from '../../components/ui/Modal'
import { useTripStore } from '../../stores/tripStore'
import { EXCHANGE_RATES } from '../../constants/theme'

export function ExpensePage() {
  const { expenses, members } = useTripStore()
  const [showForm, setShowForm] = useState(false)

  const totalByCurrency: Record<string, number> = {}
  expenses.forEach((e) => {
    if (!totalByCurrency[e.currency]) totalByCurrency[e.currency] = 0
    totalByCurrency[e.currency] += e.amount
  })

  const totalInTWD = Object.entries(totalByCurrency).reduce((sum, [currency, amount]) => {
    const rate = EXCHANGE_RATES[currency] || 1
    return sum + amount * rate
  }, 0)

  const expensesByDate: Record<string, typeof expenses> = {}
  expenses.forEach((e) => {
    if (!expensesByDate[e.date]) expensesByDate[e.date] = []
    expensesByDate[e.date].push(e)
  })

  const sortedDates = Object.keys(expensesByDate).sort((a, b) => b.localeCompare(a))

  return (
    <PageContainer title="記帳">
      <Section title="總支出">
        <Card className="bg-gradient-to-br from-sage to-sage-light">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/80 text-sm">台幣合計</p>
              <p className="text-2xl font-bold text-white">
                NT$ {totalInTWD.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">筆數</p>
              <p className="text-2xl font-bold text-white">{expenses.length}</p>
            </div>
          </div>
          {Object.keys(totalByCurrency).length > 1 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/80 text-xs mb-2">各幣別</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(totalByCurrency).map(([currency, amount]) => (
                  <span key={currency} className="text-sm text-white">
                    {currency} {amount.toLocaleString()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </Section>

      <Section title="支出明細">
        {sortedDates.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-gray-400 mb-2">尚無支出記錄</p>
            <p className="text-sm text-gray-400">點擊下方按鈕新增支出</p>
          </Card>
        ) : (
          sortedDates.map((date) => (
            <ExpenseList
              key={date}
              date={date}
              items={expensesByDate[date]}
              members={members}
            />
          ))
        )}
      </Section>

      <Section title="">
        <Card
          className="flex items-center justify-center py-6 cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          <button className="text-sage font-medium flex items-center gap-2">
            <span className="text-2xl">+</span>
            新增支出
          </button>
        </Card>
      </Section>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="新增支出">
        <ExpenseForm
          members={members}
          onSuccess={() => setShowForm(false)}
        />
      </Modal>
    </PageContainer>
  )
}