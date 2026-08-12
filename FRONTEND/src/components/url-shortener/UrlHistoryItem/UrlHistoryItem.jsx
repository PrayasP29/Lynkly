import React from 'react'
import { CopyButton } from '../CopyButton/CopyButton'
import { truncateUrl } from '../../../utils/formatUrl'

export const UrlHistoryItem = ({ item }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  const fullShortUrl = `${baseUrl}/${item.shortUrl}`

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600 mb-1">Original:</p>
        <p className="text-sm text-gray-900 truncate">{truncateUrl(item.originalUrl, 60)}</p>
        <p className="text-xs text-gray-500 mt-2">
          Short: <span className="font-mono text-blue-600">{item.shortUrl}</span>
        </p>
      </div>
      <CopyButton text={fullShortUrl} />
    </div>
  )
}
