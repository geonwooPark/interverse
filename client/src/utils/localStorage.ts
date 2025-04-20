export const getLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') return undefined

  return localStorage.getItem(key)
}

export const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return undefined

  return localStorage.setItem(key, value)
}

export const removeLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') return undefined

  return localStorage.removeItem(key)
}
