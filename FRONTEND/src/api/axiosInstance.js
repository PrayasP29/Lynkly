import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

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
      !window.location.pathname.startsWith('/login')
    ) {
      window.location.assign('/login')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
