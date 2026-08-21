import React, { createContext, useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess, loginFailure, logout as logoutAction } from '../features/auth/authSlice'

import { getCurrentUser, loginUser, registerUser, logoutUser } from '../api/auth.api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data.user)
        dispatch(loginSuccess({ user: data.user }))
      })
      .catch(() => {
        setUser(null)
        dispatch(logoutAction())
      })
      .finally(() => setIsLoading(false))
  }, [dispatch])

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials)
      setUser(data.user)
      dispatch(loginSuccess({ user: data.user }))
      return data
    } catch (error) {
      dispatch(loginFailure({ error: error.response?.data?.message || error.response?.data?.error || error.message || 'Login failed' }))
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const data = await registerUser(userData)
      return data
    } catch (error) {
      dispatch(loginFailure({ error: error.response?.data?.message || error.response?.data?.error || error.message || 'Registration failed' }))
      throw error
    }
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
    dispatch(logoutAction())
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
