import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout/PageLayout'
import { HomePage } from '../pages/HomePage/HomePage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { SignupPage } from '../pages/SignupPage/SignupPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/AuthContext'

export const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.PORTAL}
            element={
              <ProtectedRoute
                element={<HomePage />}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              />
            }
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </Router>
  )
}
