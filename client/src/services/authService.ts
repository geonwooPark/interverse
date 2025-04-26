import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class AuthService {
  async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<any> {
    return await api.post(API_ENDPOINTS.USER.LOGIN(), {
      email,
      password,
    })
  }

  async signup({
    email,
    nickname,
    password,
  }: {
    email: string
    nickname: string
    password: string
  }): Promise<any> {
    return await api.post(API_ENDPOINTS.USER.SIGN_UP(), {
      nickname,
      email,
      password,
    })
  }

  async me(): Promise<any> {
    return await api.get(API_ENDPOINTS.USER.ME())
  }

  async sendVerificationEmail(email: string): Promise<any> {
    return await api.post(API_ENDPOINTS.USER.SEND_EMAIL(), {
      email,
    })
  }

  async checkVerificationCode({
    email,
    code,
  }: {
    email: string
    code: number
  }): Promise<any> {
    return await api.post(API_ENDPOINTS.USER.CHECK_CODE(), {
      email,
      code,
    })
  }

  async changePassword({
    email,
    newPassword,
  }: {
    email: string
    newPassword: string
  }): Promise<any> {
    return await api.patch(API_ENDPOINTS.USER.CHANGE_PASSWORD(), {
      email,
      newPassword,
    })
  }

  async checkId(email: string): Promise<any> {
    return await api.post(API_ENDPOINTS.USER.CHECK_ID(), {
      email,
    })
  }
}

export const authService = new AuthService()
