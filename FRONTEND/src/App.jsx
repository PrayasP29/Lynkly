import React from 'react'
import { QueryProvider } from './context/QueryProvider'
import { AppRouter } from './routing/AppRouter'

const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  )
}

export default App