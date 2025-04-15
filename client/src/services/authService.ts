import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class AuthService {
  async login() {
    await api.post(API_ENDPOINTS.USER.LOGIN, {})
  }

  async signup() {
    await api.post(API_ENDPOINTS.USER.SIGNUP, {})
  }

  async me() {
    await api.get(API_ENDPOINTS.USER.ME)
  }
}

export const authService = new AuthService()
