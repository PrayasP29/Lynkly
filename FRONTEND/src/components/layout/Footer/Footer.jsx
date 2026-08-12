import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Lynkly. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">Shorten your links. Simplify your world.</p>
      </div>
    </footer>
  )
}
