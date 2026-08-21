import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border/60 text-brand-text-muted transition-colors duration-300 py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Lynkly. All rights reserved.
        </p>
        <p className="text-xs text-brand-text-muted/60 mt-1">
          Shorten your links. Simplify your world.
        </p>
      </div>
    </footer>
  )
}
