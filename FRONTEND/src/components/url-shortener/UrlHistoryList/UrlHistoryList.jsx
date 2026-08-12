import React from 'react'
import { UrlHistoryItem } from '../UrlHistoryItem/UrlHistoryItem'

export const UrlHistoryList = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No URLs shortened yet. Create your first short URL above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent URLs (Session)</h3>
      {items.map((item, index) => (
        <UrlHistoryItem key={index} item={item} />
      ))}
    </div>
  )
}
