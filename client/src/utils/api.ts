import axios from 'axios'
import { getLocalStorageItem } from './localStorage'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_V1,
})

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem('interverse_token') || ''

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  },
)
