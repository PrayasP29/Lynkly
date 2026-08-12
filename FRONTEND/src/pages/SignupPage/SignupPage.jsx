import React from 'react'
import { Link } from 'react-router-dom'
import { SignupForm } from '../../components/auth/SignupForm/SignupForm'
import { ROUTES } from '../../constants/routes'

export const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600 mb-6">Join Lynkly to start shortening URLs</p>
        
        <SignupForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-blue-600 hover:underline font-medium">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
