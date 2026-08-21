import React from 'react'
import { UrlHistoryItem } from '../UrlHistoryItem/UrlHistoryItem'

export const UrlHistoryList = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-8 text-center text-brand-text-muted/70">
        <p>No URLs shortened yet. Create your first short URL above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-brand-text mb-2">Recent URLs (Session)</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <UrlHistoryItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
