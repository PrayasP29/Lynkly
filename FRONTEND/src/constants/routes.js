export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PORTAL: '/portal',
  NOT_FOUND: '*',
}

export const API_ENDPOINTS = {
  CREATE_SHORT_URL: '/api/create',
  GET_STATS: (id) => `/api/stats/${id}`,
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
}
