import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { useAuth } from '../../../context/AuthContext'
import { useTheme } from '../../../context/ThemeContext'
import { useSelector } from 'react-redux'
import { Sun, Moon, Menu, X, Link2, LogOut } from 'lucide-react'

export const Navbar = () => {
  const { isAuthenticated: authIsAuthenticated, logout: authLogout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { isAuthenticated: reduxIsAuthenticated } = useSelector((state) => state.auth)
  const isAuthenticated = reduxIsAuthenticated || authIsAuthenticated

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await authLogout()
      navigate(ROUTES.LOGIN)
    } catch {
      setIsLoggingOut(false)
    }
  }

  const initials = user 
    ? (user.name 
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2) 
        : 'U') 
    : 'U'

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-surface/85 backdrop-blur-md border-b border-brand-border/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 text-brand-text hover:text-brand-primary transition-colors text-2xl font-bold tracking-tight">
              <Link2 className="w-6 h-6 text-brand-primary animate-pulse" />
              <span>Lynkly</span>
            </Link>
          </div>

          {/* Right Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <Link to={ROUTES.HOME} className="text-brand-text/80 hover:text-brand-primary text-sm font-medium transition-colors">
                Dashboard
              </Link>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-brand-border/40 text-brand-text/80 hover:text-brand-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="relative group">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-orange-600 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    <span className="text-sm font-bold text-white">{initials}</span>
                  </div>
                </button>
                {/* Tooltip on hover */}
                <div className="absolute right-0 mt-2 w-48 bg-brand-surface border border-brand-border rounded-lg shadow-lg py-1 z-50 hidden group-hover:block transition-all duration-200">
                  <div className="px-4 py-2 border-b border-brand-border">
                    <p className="text-xs text-brand-text/50">Signed in as</p>
                    <p className="text-sm font-semibold truncate">{user?.name || user?.email || 'User'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-brand-border/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to={ROUTES.LOGIN}
                  className="text-brand-text/85 hover:text-brand-primary font-medium transition-colors py-2 px-3 rounded-lg hover:bg-brand-border/20"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="bg-brand-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-brand-primary-hover hover:scale-[1.02] transition-all duration-200 shadow-md shadow-brand-primary/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls (Hamburger & Theme Toggle) */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-brand-border/40 text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-brand-border/40 text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-surface/95 border-b border-brand-border/60 transition-colors duration-300">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 border-b border-brand-border/40">
                  <p className="text-xs text-brand-text/50">Signed in as</p>
                  <p className="text-sm font-semibold truncate">{user?.name || user?.email || 'User'}</p>
                </div>
                <Link
                  to={ROUTES.HOME}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-brand-text/80 hover:bg-brand-border/30 hover:text-brand-primary transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleLogout()
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-base font-medium text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center w-full block py-2 text-base font-medium text-brand-text/85 hover:bg-brand-border/30 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center w-full block bg-brand-primary text-white font-medium py-2 rounded-md hover:bg-brand-primary-hover transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}