import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = action.payload.error
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },
    loadingStart: (state) => {
      state.loading = true
    },
    loadingStop: (state) => {
      state.loading = false
    },
    setError: (state, action) => {
      state.error = action.payload.error
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { loginSuccess, loginFailure, logout, loadingStart, loadingStop, setError, clearError } = authSlice.actions

export default authSlice.reducer