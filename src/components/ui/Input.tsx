import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 rounded-xl border border-cream-dark bg-white
          focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage
          placeholder:text-gray-400 ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface NumberInputProps extends Omit<InputProps, 'type'> {
  currency?: string
}

export function NumberInput({ currency, label, error, className = '', id, ...props }: NumberInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {currency && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
            {currency}
          </span>
        )}
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          className={`w-full px-4 py-3 rounded-xl border border-cream-dark bg-white
            focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage
            placeholder:text-gray-400 ${currency ? 'pl-10' : ''}
            ${error ? 'border-red-400' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function TextArea({ label, error, className = '', id, ...props }: TextAreaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full px-4 py-3 rounded-xl border border-cream-dark bg-white
          focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage
          placeholder:text-gray-400 resize-none ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}