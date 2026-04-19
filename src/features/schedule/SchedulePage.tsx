import { useState } from 'react'
import { PageContainer, Section } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { DateSelector } from './DateSelector'
import { Timeline } from './Timeline'
import { WeatherCard } from './WeatherCard'
import { CountdownTimer } from './CountdownTimer'
import { useTripStore } from '../../stores/tripStore'

export function SchedulePage() {
  const { config, schedule } = useTripStore()
  const [selectedDate, setSelectedDate] = useState(config.startDate)

  const getWeatherForDate = (date: string) => {
    const weathers: Array<'sunny' | 'cloudy' | 'rainy'> = ['sunny', 'cloudy', 'sunny', 'rainy', 'cloudy', 'sunny', 'sunny']
    const dayIndex = Math.abs(new Date(date).getDate() % 7)
    return weathers[dayIndex]
  }

  const getTempForDate = (date: string) => {
    const temps = [22, 24, 23, 20, 25, 26, 24]
    const dayIndex = Math.abs(new Date(date).getDate() % 7)
    return temps[dayIndex]
  }

  return (
    <PageContainer title="行程">
      <CountdownTimer targetDate={config.startDate} />

      <Section title="">
        <DateSelector
          startDate={config.startDate}
          endDate={config.endDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </Section>

      <Section title={selectedDate}>
        <WeatherCard
          weather={getWeatherForDate(selectedDate)}
          temperature={getTempForDate(selectedDate)}
          location={config.destination}
        />
      </Section>

      <Section title="行程時間軸">
        <Timeline
          items={schedule.filter((s) => s.date === selectedDate)}
        />
      </Section>

      <Section title="新增行程">
        <Card className="flex items-center justify-center py-6">
          <button className="text-sage font-medium flex items-center gap-2">
            <span className="text-2xl">+</span>
            新增行程
          </button>
        </Card>
      </Section>
    </PageContainer>
  )
}