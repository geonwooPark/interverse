import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_V1,
})

api.interceptors.request.use(
  (config) => {
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
