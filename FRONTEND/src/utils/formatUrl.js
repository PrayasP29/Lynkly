export const truncateUrl = (url, maxLength = 50) => {
  if (url.length <= maxLength) return url
  return url.substring(0, maxLength) + '...'
}

export const getShortUrlDisplay = (baseUrl, shortId) => {
  return `${baseUrl}/${shortId}`
}

// presentation/copy only — canonical href must keep the protocol
export const stripProtocol = (url) => url.replace(/^https?:\/\//, '')
