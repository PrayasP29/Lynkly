import React from 'react'
import { QueryProvider } from './context/QueryProvider'
import { AuthProvider } from './context/AuthContext'
import { AppRouter } from './routing/AppRouter'

const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  )
}

export default App