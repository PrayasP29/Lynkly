import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../../components/auth/LoginForm/LoginForm'
import { ROUTES } from '../../constants/routes'

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-brand-surface border border-brand-border/60 rounded-xl p-8 max-w-md w-full shadow-lg transition-all duration-300 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-brand-text mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-brand-text-muted">
            Log in to manage your shortened URLs
          </p>
        </div>
        
        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-brand-text-muted text-sm">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-brand-primary hover:text-brand-primary-hover hover:underline font-semibold transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
