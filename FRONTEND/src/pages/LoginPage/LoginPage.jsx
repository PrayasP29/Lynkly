import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../../components/auth/LoginForm/LoginForm'
import { ROUTES } from '../../constants/routes'

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Log in to manage your shortened URLs</p>
        
        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
