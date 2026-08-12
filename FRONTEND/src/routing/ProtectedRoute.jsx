import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export const ProtectedRoute = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return element
}
