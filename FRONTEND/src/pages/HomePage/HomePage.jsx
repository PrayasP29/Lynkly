import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../../components/common/Toast/Toast'
import { UrlForm } from '../../components/url-shortener/UrlForm/UrlForm'
import { ShortUrlCard } from '../../components/url-shortener/ShortUrlCard/ShortUrlCard'
import { UrlHistoryList } from '../../components/url-shortener/UrlHistoryList/UrlHistoryList'
import { useCreateShortUrl } from '../../hooks/useCreateShortUrl'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../constants/routes'
import { Zap, Globe } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

export const HomePage = () => {
  const { user } = useAuth()
  const [lastResult, setLastResult] = useState(null)
  const [history, setHistory] = useState([])
  const [toast, setToast] = useState(null)
  const createMutation = useCreateShortUrl()

  const handleCreateShortUrl = async (urlData) => {
    try {
      const result = await createMutation.mutateAsync(urlData)
      
      if (result.success && result.shortUrl) {
        const shortId = result.shortUrl.split('/').pop()
        const originalUrl = typeof urlData === 'string' ? urlData : urlData.url
        const historyItem = {
          originalUrl,
          shortUrl: shortId,
          createdAt: new Date().toISOString(),
        }
        
        setLastResult(historyItem)
        setHistory((prev) => [historyItem, ...prev.slice(0, 9)])
        setToast({ type: 'success', message: 'URL shortened successfully!' })
      }
    } catch (error) {
      setToast({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Failed to shorten URL',
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16 space-y-12 transition-all duration-300">
      
      {/* Hero & Form Cohesive Block */}
      <div className="flex flex-col items-center justify-center text-center space-y-8 bg-brand-surface border border-brand-border/60 rounded-xl p-6 sm:p-10 shadow-lg relative z-10 transition-all duration-300">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-text leading-tight">
            Shorten Your Links
          </h1>
          <p className="text-base sm:text-lg text-brand-text-muted max-w-xl mx-auto leading-relaxed">
            Turn long, unwieldy URLs into short, shareable links in seconds. 
            {user ? ' Enter a custom alias below for personalization.' : ' Sign in to use custom aliases.'}
          </p>
        </div>

        {/* Shortener Form */}
        <div className="w-full max-w-2xl text-left border-t border-brand-border/30 pt-6">
          <UrlForm onSuccess={handleCreateShortUrl} showCustomInput={!!user} />
        </div>
      </div>

      {/* Result Section */}
      <AnimatePresence mode="wait">
        {lastResult && (
          <div className="w-full">
            <ShortUrlCard
              originalUrl={lastResult.originalUrl}
              shortUrl={lastResult.shortUrl}
              onCopySuccess={() =>
                setToast({ type: 'success', message: 'Link copied to clipboard!' })
              }
            />
          </div>
        )}
      </AnimatePresence>

      {/* Feature Row - Positioned Below the Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <div className="flex items-start gap-4 rounded-xl bg-brand-surface p-5 border border-brand-border/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-brand-text mb-1">Instant Shortening</h4>
            <p className="text-sm text-brand-text-muted">Generate secure, clean, and reliable links in one click.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 rounded-xl bg-brand-surface p-5 border border-brand-border/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-brand-text mb-1">Custom Aliases</h4>
            <p className="text-sm text-brand-text-muted">Customize your short links with memorable keywords for your audience.</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="bg-brand-surface border border-brand-border/60 rounded-xl p-6 shadow-sm transition-all duration-300">
          <UrlHistoryList items={history} />
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}