import { Cookies } from 'react-cookie'
import { CookieType } from '../types/client'

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
  const adminCookie = getCookie('interverse_admin')
  const userCookie = getCookie('interverse_user')

  if (adminCookie?.roomNum === roomId) return adminCookie
  if (userCookie?.roomNum === roomId) return userCookie
  return null
}
