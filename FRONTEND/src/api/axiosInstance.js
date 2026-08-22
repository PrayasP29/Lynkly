import axios from 'axios'

// ponytail: prod assumes same-origin /api proxy via vercel.json; host FE+BE apart without a proxy if that changes
const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  : ''

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes('/api/auth/login') &&
      !error.config?.url?.includes('/api/create') &&
      !error.config?.url?.includes('/api/auth/me') &&
      !window.location.pathname.startsWith('/login')
    ) {
      window.location.assign('/login')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
