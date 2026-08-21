import React from 'react'
import { Button } from '../../common/Button/Button'
import { Check, Copy } from 'lucide-react'

export const CopyButton = ({ text, onSuccess, copied = false, className = '' }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      onSuccess?.()
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'success' : 'secondary'}
      className={`min-w-[80px] ${className}`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-white animate-scale-in" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  )
}