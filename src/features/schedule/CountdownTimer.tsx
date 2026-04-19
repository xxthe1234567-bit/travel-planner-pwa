import { Card } from '../../components/ui/Card'
import { getDaysUntil } from '../../utils/dateUtils'

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const daysUntil = getDaysUntil(targetDate)

  if (daysUntil < 0) {
    return null
  }

  return (
    <Card className="mb-4 bg-gradient-to-r from-sage to-sage-light">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">距離出發還有</p>
          <p className="text-3xl font-bold text-white">{daysUntil}</p>
          <p className="text-white/80">天</p>
        </div>
        <div className="text-5xl">✈️</div>
      </div>
    </Card>
  )
}