import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../api/auth.api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    setUser(data.user)
    return data
  }

  const register = async (userData) => {
    const data = await registerUser(userData)
    return data
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
