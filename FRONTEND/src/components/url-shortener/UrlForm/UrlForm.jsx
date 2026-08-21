import React, { useState } from 'react'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { Loader2 } from 'lucide-react'
import { isValidUrl, ensureUrlProtocol } from '../../../utils/validators'
import { ErrorCard } from '../../common/ErrorCard/ErrorCard'

export const UrlForm = ({ onSuccess, showCustomInput = false }) => {
  const [url, setUrl] = useState('')
  const [customShortUrl, setCustomShortUrl] = useState('')
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    const urlWithProtocol = ensureUrlProtocol(url)

    if (!isValidUrl(urlWithProtocol)) {
      setError('Please enter a valid URL')
      return
    }

    setIsPending(true)
    try {
      await onSuccess({ url: urlWithProtocol, customShortUrl: showCustomInput ? customShortUrl : undefined })
      setUrl('')
      setCustomShortUrl('')
    } catch (err) {
      setError(err.message || 'Failed to create short URL')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <ErrorCard message={error} onClose={() => setError('')} />
      )}
      <Input
        type="url"
        placeholder="Enter your long URL (e.g., https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isPending}
        error={!!error && error.includes('URL')}
        errorMessage={error.includes('URL') ? error : ''}
        label="URL to Shorten"
      />
      {showCustomInput && (
        <Input
          placeholder="Custom short URL (optional)"
          value={customShortUrl}
          onChange={(e) => setCustomShortUrl(e.target.value)}
          disabled={isPending}
          error={!!error && error.includes('alias')}
          errorMessage={error.includes('alias') ? error : ''}
          label="Custom alias"
        />
      )}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 flex items-center justify-center min-h-[46px]"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            'Shorten URL'
          )}
        </Button>
      </div>
    </form>
  )
}
