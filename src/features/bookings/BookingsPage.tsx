import { PageContainer, Section } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { BookingCard } from './BookingCard'
import { useTripStore } from '../../stores/tripStore'
import { useState } from 'react'
import { PinModal } from './PinModal'

export function BookingsPage() {
  const { bookings } = useTripStore()
  const [selectedType, setSelectedType] = useState<string>('all')
  const [pinModalOpen, setPinModalOpen] = useState(false)

  const filteredBookings = selectedType === 'all'
    ? bookings
    : bookings.filter((b) => b.type === selectedType)

  const handleBookingClick = (_bookingId: string, pinProtected: boolean) => {
    if (pinProtected) {
      setPinModalOpen(true)
    }
  }

  const types = [
    { value: 'all', label: '全部' },
    { value: 'flight', label: '機票' },
    { value: 'hotel', label: '住宿' },
    { value: 'car', label: '租車' },
    { value: 'ticket', label: '票券' },
  ]

  return (
    <PageContainer title="預訂">
      <Section title="">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedType === type.value
                  ? 'bg-sage text-white shadow-soft-sm'
                  : 'bg-white text-gray-600 shadow-soft-sm'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </Section>

      {filteredBookings.length === 0 ? (
        <Section title="">
          <Card className="text-center py-8">
            <p className="text-gray-400 mb-2">尚無預訂</p>
            <p className="text-sm text-gray-400">點擊下方按鈕新增預訂</p>
          </Card>
        </Section>
      ) : (
        <Section title="">
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onClick={() => handleBookingClick(booking.id, booking.pinProtected)}
              />
            ))}
          </div>
        </Section>
      )}

      <Section title="">
        <Card className="flex items-center justify-center py-6">
          <button className="text-sage font-medium flex items-center gap-2">
            <span className="text-2xl">+</span>
            新增預訂
          </button>
        </Card>
      </Section>

      <PinModal
        isOpen={pinModalOpen}
        onClose={() => { setPinModalOpen(false) }}
        onSuccess={() => { setPinModalOpen(false); }}
      />
    </PageContainer>
  )
}