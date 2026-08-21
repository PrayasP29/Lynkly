import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { AppBackground } from '../AppBackground/AppBackground'

export const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text transition-colors duration-300 relative">
      <AppBackground />
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
