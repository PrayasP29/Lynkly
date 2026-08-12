export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  NOT_FOUND: '*',
}

export const API_ENDPOINTS = {
  CREATE_SHORT_URL: '/api/create',
  GET_STATS: (id) => `/api/stats/${id}`,
}
