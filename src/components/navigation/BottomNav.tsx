import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const navItems = [
  { path: '/schedule', label: '行程', icon: '📅' },
  { path: '/bookings', label: '預訂', icon: '🎫' },
  { path: '/expense', label: '記帳', icon: '💰' },
  { path: '/journal', label: '日誌', icon: '📷' },
  { path: '/planning', label: '準備', icon: '✅' },
  { path: '/members', label: '成員', icon: '👥' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-cream-dark z-40 safe-area-pb">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all
                ${isActive ? 'text-sage' : 'text-gray-400'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-sage rounded-full" />
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}