import { useState } from 'react'
import { Input, NumberInput } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { useTripStore } from '../../stores/tripStore'
import type { Member } from '../../types'

interface ExpenseFormProps {
  members: Member[]
  onSuccess: () => void
}

export function ExpenseForm({ members, onSuccess }: ExpenseFormProps) {
  const { addExpense } = useTripStore()
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('TWD')
  const [category, setCategory] = useState('food')
  const [payer, setPayer] = useState(members[0]?.id || '')
  const [splitAmong, setSplitAmong] = useState<string[]>(members.map((m) => m.id))
  const [notes, setNotes] = useState('')

  const categoryOptions = [
    { value: 'food', label: '🍔 餐飲' },
    { value: 'transport', label: '🚆 交通' },
    { value: 'accommodation', label: '🏨 住宿' },
    { value: 'shopping', label: '🛍️ 購物' },
    { value: 'entertainment', label: '🎮 娛樂' },
    { value: 'other', label: '📦 其他' },
  ]

  const currencyOptions = [
    { value: 'TWD', label: 'TWD (台幣)' },
    { value: 'JPY', label: 'JPY (日幣)' },
    { value: 'USD', label: 'USD (美金)' },
    { value: 'EUR', label: 'EUR (歐元)' },
  ]

  const payerOptions = members.map((m) => ({ value: m.id, label: m.name }))

  const handleSubmit = () => {
    if (!amount || !payer) return

    addExpense({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount),
      currency,
      category: category as 'food' | 'transport' | 'accommodation' | 'shopping' | 'entertainment' | 'other',
      payer,
      splitAmong,
      notes,
    })

    setAmount('')
    setNotes('')
    onSuccess()
  }

  const toggleSplit = (memberId: string) => {
    setSplitAmong((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    )
  }

  const splitAmount = splitAmong.length > 0 ? (parseFloat(amount || '0') / splitAmong.length).toFixed(0) : '0'

  return (
    <div className="space-y-4">
      <NumberInput
        label="金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        currency={currency}
        placeholder="0"
      />

      <Select
        label="幣別"
        options={currencyOptions}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />

      <Select
        label="類別"
        options={categoryOptions}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Select
        label="付款人"
        options={payerOptions}
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">分攤對象</label>
        <div className="flex flex-wrap gap-2">
          {members.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleSplit(m.id)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all
                ${splitAmong.includes(m.id)
                  ? 'bg-sage text-white'
                  : 'bg-cream-dark text-gray-600'}`}
            >
              {m.name}
            </button>
          ))}
        </div>
        {splitAmong.length > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            每人分攤: {currency} {splitAmount}
          </p>
        )}
      </div>

      <Input
        label="備註"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="選填"
      />

      <Button onClick={handleSubmit} className="w-full">
        新增支出
      </Button>
    </div>
  )
}