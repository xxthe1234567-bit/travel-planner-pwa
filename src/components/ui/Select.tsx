import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = '', id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-4 py-3 rounded-xl border border-cream-dark bg-white
          focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage
          ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Checkbox({ label, checked, onChange, disabled }: CheckboxProps) {
  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
            ${checked ? 'bg-sage border-sage' : 'border-gray-300 bg-white'}`}
        >
          {checked && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  )
}

interface AvatarProps {
  src?: string
  name: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ src, name, color, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  }

  const initial = name.charAt(0).toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white`}
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  )
}

interface AvatarGroupProps {
  members: { name: string; avatarUrl?: string; color: string }[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

export function AvatarGroup({ members, max = 4, size = 'md' }: AvatarGroupProps) {
  const display = members.slice(0, max)
  const remaining = members.length - max

  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  }

  return (
    <div className="flex -space-x-2">
      {display.map((m, i) => (
        <Avatar key={i} src={m.avatarUrl} name={m.name} color={m.color} size={size} />
      ))}
      {remaining > 0 && (
        <div
          className={`${sizes[size]} rounded-full flex items-center justify-center
            bg-cream-dark text-gray-600 font-medium border-2 border-white`}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}