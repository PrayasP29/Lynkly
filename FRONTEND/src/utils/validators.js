export const isValidUrl = (urlString) => {
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (e) {
    return false
  }
}

export const ensureUrlProtocol = (urlString) => {
  if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
    return 'https://' + urlString
  }
  return urlString
}
