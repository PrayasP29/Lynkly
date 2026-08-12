import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="text-2xl font-bold hover:opacity-90">
          🔗 Lynkly
        </Link>
        <div className="flex gap-4">
          <Link
            to={ROUTES.HOME}
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
          >
            Home
          </Link>
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
        </div>
      </div>
    </nav>
  )
}
