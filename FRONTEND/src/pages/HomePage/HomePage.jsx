import React, { useState } from 'react'
import { Toast } from '../../components/common/Toast/Toast'
import { UrlForm } from '../../components/url-shortener/UrlForm/UrlForm'
import { ShortUrlCard } from '../../components/url-shortener/ShortUrlCard/ShortUrlCard'
import { UrlHistoryList } from '../../components/url-shortener/UrlHistoryList/UrlHistoryList'
import { useCreateShortUrl } from '../../hooks/useCreateShortUrl'

export const HomePage = () => {
  const [lastResult, setLastResult] = useState(null)
  const [history, setHistory] = useState([])
  const [toast, setToast] = useState(null)
  const createMutation = useCreateShortUrl()

  const handleCreateShortUrl = async (url) => {
    try {
      const result =await createMutation.mutateAsync(url)
      
      if (result.success && result.shortUrl) {
        const shortId = result.shortUrl.split('/').pop()
        const historyItem = {
          originalUrl: url,
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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shorten Your Links</h1>
        <p className="text-xl text-gray-600">
          Turn long, unwieldy URLs into short, shareable links in seconds
        </p>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto w-full">
        <UrlForm onSuccess={handleCreateShortUrl} />
      </div>

      {/* Result Section */}
      {lastResult && (
        <div className="max-w-2xl mx-auto w-full">
          <ShortUrlCard
            originalUrl={lastResult.originalUrl}
            shortUrl={lastResult.shortUrl}
            onCopySuccess={() =>
              setToast({ type: 'success', message: 'Link copied to clipboard!' })
            }
          />
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto w-full">
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
