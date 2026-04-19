import React from 'react'

interface PageContainerProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export function PageContainer({ children, title, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen pb-20 pt-4 px-4 ${className}`}>
      {title && (
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      )}
      {children}
    </div>
  )
}

export function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {action}
    </div>
  )
}

export function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}