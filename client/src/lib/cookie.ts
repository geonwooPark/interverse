import { Cookies } from 'react-cookie'
import { CookieType } from '../../../types/client'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name: string): CookieType => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name)
}

export const getAuthCookie = (roomId: string): CookieType | null => {
  const hostCookie = getCookie('interverse_host')
  const guestCookie = getCookie('interverse_guest')

  if (hostCookie?.roomNum === roomId) return hostCookie
  if (guestCookie?.roomNum === roomId) return guestCookie
  return null
}
