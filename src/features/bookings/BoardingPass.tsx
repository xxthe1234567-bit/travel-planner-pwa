import type { Booking } from '../../types'

interface BoardingPassProps {
  booking: Booking
}

export function BoardingPass({ booking }: BoardingPassProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
      <div className="bg-sky/10 p-4 flex items-center gap-4">
        <div className="text-4xl">🛫</div>
        <div>
          <p className="text-xs text-gray-500">機票</p>
          <p className="font-bold text-gray-800">{booking.title}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">出發</p>
            <p className="font-bold text-lg">NRT</p>
            <p className="text-sm">東京</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex-1 h-px border-t-2 border-dashed border-gray-300" />
            <span className="mx-2 text-xl">✈️</span>
            <div className="flex-1 h-px border-t-2 border-dashed border-gray-300" />
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">抵達</p>
            <p className="font-bold text-lg">TPE</p>
            <p className="text-sm">台北</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">日期</p>
            <p className="font-medium">2026/05/01</p>
          </div>
          <div>
            <p className="text-gray-500">時間</p>
            <p className="font-medium">10:30</p>
          </div>
          <div>
            <p className="text-gray-500">航班</p>
            <p className="font-medium">CI100</p>
          </div>
          <div>
            <p className="text-gray-500">艙等</p>
            <p className="font-medium">Economy</p>
          </div>
        </div>
      </div>
    </div>
  )
}