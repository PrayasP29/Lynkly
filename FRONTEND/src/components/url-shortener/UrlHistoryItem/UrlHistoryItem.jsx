import React from 'react'
import { CopyButton } from '../CopyButton/CopyButton'
import { truncateUrl, stripProtocol } from '../../../utils/formatUrl'
import { Link2 } from 'lucide-react'

export const UrlHistoryItem = ({ item }) => {
  const fullShortUrl = item.fullUrl || `/${item.shortUrl}`

  return (
    <div className="bg-brand-surface border border-brand-border/50 rounded-xl p-4 flex items-center justify-between gap-4 hover:shadow-md transition-all duration-300">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-text-muted/70 uppercase tracking-wider mb-1">
          <Link2 className="w-3.5 h-3.5" />
          <span>Original Link</span>
        </div>
        <p className="text-sm text-brand-text truncate font-medium">{truncateUrl(item.originalUrl, 60)}</p>
        <p className="text-xs text-brand-primary mt-1.5 font-semibold">
          Short alias: <span className="font-mono text-brand-text font-bold bg-brand-bg px-1.5 py-0.5 rounded border border-brand-border/20">{item.shortUrl}</span>
        </p>
      </div>
      <CopyButton text={stripProtocol(fullShortUrl)} className="scale-90" />
    </div>
  )
}
