import { useCallback, useState } from 'react'

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [])

  return { copied, copyToClipboard }
}
