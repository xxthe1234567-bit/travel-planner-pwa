import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-2xl font-semibold transition-all duration-100 active:scale-95 inline-flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-sage text-white shadow-soft hover:shadow-soft-hover',
    secondary: 'bg-cream-dark text-gray-700 shadow-soft-sm hover:shadow-soft',
    ghost: 'bg-transparent text-gray-600 hover:bg-cream-dark/50',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-xl',
    md: 'px-5 py-3 text-base rounded-2xl',
    lg: 'px-6 py-4 text-lg rounded-2xl',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}