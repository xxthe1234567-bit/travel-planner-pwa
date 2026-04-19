import { Routes, Route, Navigate } from 'react-router-dom'
import { BottomNav } from './components/navigation/BottomNav'
import { SchedulePage } from './features/schedule/SchedulePage'
import { BookingsPage } from './features/bookings/BookingsPage'
import { ExpensePage } from './features/expense/ExpensePage'
import { JournalPage } from './features/journal/JournalPage'
import { PlanningPage } from './features/planning/PlanningPage'
import { MembersPage } from './features/members/MembersPage'
import { useOfflineSync } from './hooks/useOfflineSync'

function App() {
  useOfflineSync()

  return (
    <div className="min-h-screen bg-cream">
      <Routes>
        <Route path="/" element={<Navigate to="/schedule" replace />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/members" element={<MembersPage />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App