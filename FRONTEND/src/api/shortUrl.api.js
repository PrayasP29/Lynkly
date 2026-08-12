import axiosInstance from './axiosInstance'

export const createShortUrl = async (url) => {
  const response = await axiosInstance.post('/api/create', { url })
  return response.data
}

export const getUrlStats = async (shortId) => {
  // Placeholder for future stats endpoint
  // const response = await axiosInstance.get(`/api/stats/${shortId}`)
  // return response.data
  return { shortId, clicks: 0 }
}
