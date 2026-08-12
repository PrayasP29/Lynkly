import React from 'react'
import { Button } from '../../common/Button/Button'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'

export const CopyButton = ({ text, onSuccess }) => {
  const { copied, copyToClipboard } = useCopyToClipboard()

  const handleCopy = () => {
    copyToClipboard(text)
    onSuccess?.()
  }

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'success' : 'primary'}
      className="whitespace-nowrap"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </Button>
  )
}
