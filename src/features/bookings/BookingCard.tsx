import { Card } from '../../components/ui/Card'
import type { Booking } from '../../types'

interface BookingCardProps {
  booking: Booking
  onClick?: () => void
}

export function BookingCard({ booking, onClick }: BookingCardProps) {
  const typeImage = {
    flight: 'bg-gradient-to-r from-sky/20 to-sky/5',
    hotel: 'bg-gradient-to-r from-lavender/20 to-lavender/5',
    car: 'bg-gradient-to-r from-forest/20 to-forest/5',
    ticket: 'bg-gradient-to-r from-orange/20 to-orange/5',
  }

  return (
    <Card
      className={`cursor-pointer active:scale-[0.98] transition-transform ${typeImage[booking.type]}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">
          {booking.type === 'flight' ? '🛫' : booking.type === 'hotel' ? '🏨' : booking.type === 'car' ? '🚗' : '🎫'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 truncate">{booking.title}</span>
            {booking.pinProtected && <span className="text-xs">🔒</span>}
          </div>
          <p className="text-sm text-gray-500 truncate">{booking.details}</p>
          {booking.cost > 0 && (
            <p className="text-sm font-medium text-sage mt-1">
              {booking.currency} {booking.cost.toLocaleString()}
            </p>
          )}
        </div>
        <div className="text-gray-400">›</div>
      </div>
    </Card>
  )
}