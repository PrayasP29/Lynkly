import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  }

  const borderStyles = {
    success: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    error: 'border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400',
    info: 'border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400',
    warning: 'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400',
  }

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl bg-brand-surface z-50 animate-fade-in ${borderStyles[type]}`}>
      {icons[type]}
      <span className="text-sm font-semibold tracking-wide">{message}</span>
    </div>
  )
}
