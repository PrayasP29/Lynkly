import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CopyButton } from '../CopyButton/CopyButton'
import { truncateUrl } from '../../../utils/formatUrl'
import { CheckCircle2, Link2 } from 'lucide-react'

export const ShortUrlCard = ({ originalUrl, fullShortUrl, onCopySuccess }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    onCopySuccess?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="bg-brand-surface border border-brand-border/60 rounded-xl p-6 shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-2 mb-4 text-brand-primary">
        <CheckCircle2 className="w-5 h-5" />
        <h3 className="text-lg font-bold text-brand-text">
          Your Short URL is Ready!
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-brand-text-muted/70 uppercase tracking-wider mb-1">Original URL</p>
          <p className="text-sm text-brand-text break-all font-medium bg-brand-bg/50 p-2.5 rounded-lg border border-brand-border/30">
            {truncateUrl(originalUrl, 100)}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-brand-text-muted/70 uppercase tracking-wider mb-1">Short URL</p>
          <div className="flex gap-2 items-stretch">
            <div className="flex-1 flex items-center gap-2 bg-brand-bg/50 px-3 py-2 rounded-lg border border-brand-border/40 font-mono text-sm text-brand-primary font-semibold truncate select-all">
              <Link2 className="w-4 h-4 text-brand-text-muted/50 flex-shrink-0" />
              <span className="truncate">{fullShortUrl}</span>
            </div>
            <CopyButton
              text={fullShortUrl}
              onSuccess={handleCopy}
              copied={copied}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}