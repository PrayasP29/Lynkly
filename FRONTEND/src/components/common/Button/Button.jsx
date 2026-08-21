import React from 'react'

export const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg px-4 py-2.5 font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-brand-bg inline-flex items-center justify-center gap-2'

  const variants = {
    primary: `${baseStyles} bg-brand-primary text-white hover:bg-brand-primary-hover active:scale-[0.98] focus:ring-brand-primary/50 shadow-md shadow-brand-primary/15`,
    secondary: `${baseStyles} bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-bg hover:text-brand-primary focus:ring-brand-primary/30`,
    ghost: `${baseStyles} text-brand-text/85 hover:text-brand-primary hover:bg-brand-border/30 focus:ring-brand-primary/20`,
    danger: `${baseStyles} bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] focus:ring-red-500/50`,
    success: `${baseStyles} bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] focus:ring-emerald-500/50`,
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
