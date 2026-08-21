import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { Button } from '../../components/common/Button/Button'

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4 relative z-10">
      <h1 className="text-8xl font-black text-brand-primary mb-2 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-brand-text mb-4">Page Not Found</h2>
      <p className="text-brand-text-muted max-w-md mb-8">
        The page you're looking for doesn't exist, has been moved, or the link is invalid.
      </p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary">
          Return to Home
        </Button>
      </Link>
    </div>
  )
}
