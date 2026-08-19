import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { useAuth } from '../../../context/AuthContext'

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      navigate(ROUTES.LOGIN)
    } catch {
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="text-2xl font-bold hover:opacity-90">
          🔗 Lynkly
        </Link>
        <div className="flex gap-4">
          <Link
            to={ROUTES.PORTAL}
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
