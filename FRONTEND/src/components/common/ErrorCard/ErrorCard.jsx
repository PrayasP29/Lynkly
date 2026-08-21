import React from 'react'
import { AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export const ErrorCard = ({ message, onClose }) => {
  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-3 relative shadow-sm"
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm font-medium">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-300 font-bold text-lg leading-none cursor-pointer focus:outline-none"
        >
          &times;
        </button>
      )}
    </motion.div>
  )
}
