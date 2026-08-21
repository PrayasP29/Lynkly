import React from 'react'

export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage = '',
  label = '',
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-brand-text/80 tracking-wide">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-lg 
          bg-brand-surface text-brand-text 
          border ${error ? 'border-red-500 focus:ring-red-400' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/50'} 
          placeholder-brand-text-muted/50
          transition-all duration-200 outline-none
          focus:ring-2
          ${disabled ? 'cursor-not-allowed opacity-50 bg-brand-bg/50' : ''} 
          ${className}
        `}
        {...props}
      />
      {error && errorMessage && (
        <span className="text-xs font-medium text-red-500 dark:text-red-400 animate-fade-in">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
