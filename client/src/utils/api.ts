import axios from 'axios'
import { getLocalStorageItem } from './localStorage'
import { TOKEN } from '@constants/index'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_V1_SERVER,
})

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem(TOKEN) || ''

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
    const {
      data: { data },
    } = res

    return data
  },
  (err) => {
    if (axios.isAxiosError(err) && err.response) {
      err.message = err.response.data.message
    }

    return Promise.reject(err)
  },
)
