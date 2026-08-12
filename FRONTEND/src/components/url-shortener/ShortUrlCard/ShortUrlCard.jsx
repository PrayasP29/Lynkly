import React from 'react'
import { CopyButton } from '../CopyButton/CopyButton'
import { truncateUrl } from '../../../utils/formatUrl'

export const ShortUrlCard = ({ originalUrl, shortUrl, onCopySuccess }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  const fullShortUrl = `${baseUrl}/${shortUrl}`

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">✨ Your Short URL is Ready!</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Original URL:</p>
          <p className="text-sm text-gray-900 bg-white p-2 rounded border border-gray-200 break-all">
            {truncateUrl(originalUrl, 100)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Short URL:</p>
          <div className="flex gap-2 items-stretch">
            <input
              type="text"
              value={fullShortUrl}
              readOnly
              className="flex-1 text-sm bg-white p-2 rounded border border-gray-200 font-mono text-blue-600"
            />
            <CopyButton text={fullShortUrl} onSuccess={onCopySuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}
