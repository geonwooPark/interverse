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
    return await api.post(API_ENDPOINTS.USER.LOGIN, {
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
    return await api.post(API_ENDPOINTS.USER.SIGNUP, {
      nickname,
      email,
      password,
    })
  }

  async me(): Promise<any> {
    return await api.get(API_ENDPOINTS.USER.ME)
  }

  async sendVerificationEmail(email: string): Promise<any> {
    return await api.post(API_ENDPOINTS.USER.SENDEMAIL, {
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
    return await api.post(API_ENDPOINTS.USER.CHECKCODE, {
      email,
      code,
    })
  }
}

export const authService = new AuthService()
