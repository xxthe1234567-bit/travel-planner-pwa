import { Card } from '../../components/ui/Card'

interface WeatherCardProps {
  weather: 'sunny' | 'cloudy' | 'rainy'
  temperature: number
  location: string
}

export function WeatherCard({ weather, temperature, location }: WeatherCardProps) {
  const weatherEmoji = {
    sunny: '☀️',
    cloudy: '⛅',
    rainy: '🌧️',
  }

  const weatherColor = {
    sunny: 'bg-yellow-100 text-yellow-700',
    cloudy: 'bg-gray-100 text-gray-700',
    rainy: 'bg-blue-100 text-blue-700',
  }

  return (
    <Card className="flex items-center gap-4">
      <div className="text-4xl">{weatherEmoji[weather]}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-2xl font-bold text-gray-800">{temperature}°C</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${weatherColor[weather]}`}>
        {weather === 'sunny' ? '晴天' : weather === 'cloudy' ? '多雲' : '雨天'}
      </div>
    </Card>
  )
}