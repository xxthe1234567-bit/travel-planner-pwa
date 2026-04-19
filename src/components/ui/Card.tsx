import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline'
  onClick?: () => void
}

export function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  const variants = {
    default: 'bg-white shadow-soft',
    outline: 'bg-white border-2 border-cream-dark shadow-soft-sm',
  }

  return (
    <div
      className={`rounded-2xl p-4 ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardSm({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl p-3 shadow-soft-sm border border-cream-dark/30 ${className}`}>
      {children}
    </div>
  )
}