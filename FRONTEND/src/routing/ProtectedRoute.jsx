import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { Loader } from '../components/common/Loader/Loader'

export const ProtectedRoute = ({ element, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <Loader fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return element
}
