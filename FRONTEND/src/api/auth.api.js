import axiosInstance from './axiosInstance'
import { API_ENDPOINTS } from '../constants/routes'

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials)
  return response.data
}

export const logoutUser = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGOUT)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ME)
  return response.data
}
