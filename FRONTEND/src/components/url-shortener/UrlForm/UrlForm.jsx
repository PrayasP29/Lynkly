import React, { useState } from 'react'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { Loader } from '../../common/Loader/Loader'
import { isValidUrl, ensureUrlProtocol } from '../../../utils/validators'

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="url"
        placeholder="Enter your long URL (e.g., https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isPending}
        error={!!error}
        errorMessage={error}
        label="URL to Shorten"
      />
      {showCustomInput && (
        <div className="flex gap-2">
          <Input
            placeholder="Custom short URL (optional)"
            value={customShortUrl}
            onChange={(e) => setCustomShortUrl(e.target.value)}
            disabled={isPending}
            error={!!error}
            errorMessage={error}
            label="Custom alias"
          />
        </div>
      )}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader size="sm" />
              <span>Shortening...</span>
            </>
          ) : (
            'Shorten URL'
          )}
        </Button>
      </div>
    </form>
  )
}
