import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../../components/common/Toast/Toast'
import { Button } from '../../components/common/Button/Button'
import { Loader } from '../../components/common/Loader/Loader'
import { UrlForm } from '../../components/url-shortener/UrlForm/UrlForm'
import { ShortUrlCard } from '../../components/url-shortener/ShortUrlCard/ShortUrlCard'
import { UrlHistoryList } from '../../components/url-shortener/UrlHistoryList/UrlHistoryList'
import { useCreateShortUrl } from '../../hooks/useCreateShortUrl'
import { useAuth } from '../../context/AuthContext'
import { ROUTES } from '../../constants/routes'

export const HomePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const [history, setHistory] = useState([])
  const [toast, setToast] = useState(null)
  const createMutation = useCreateShortUrl()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      navigate(ROUTES.LOGIN)
    } catch {
      setIsLoggingOut(false)
    }
  }

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
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Shorten Your Links</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.name}</span>
                <Button onClick={handleLogout} variant="danger" disabled={isLoggingOut}>
                  {isLoggingOut ? <Loader size="sm" /> : 'Logout'}
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="link" onClick={() => navigate(ROUTES.LOGIN)}>
                  Login
                </Button>
                <Button variant="link" onClick={() => navigate(ROUTES.SIGNUP)}>
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
        <p className="text-xl text-gray-600 mt-2">
          Turn long, unwieldy URLs into short, shareable links in seconds
        </p>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto w-full">
        <UrlForm onSuccess={handleCreateShortUrl} showCustomInput={!!user} />
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
