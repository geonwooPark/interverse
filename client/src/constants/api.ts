export const API_ENDPOINTS = {
  USER: {
    LOGIN: '/user/login',
    SIGNUP: '/user/signup',
    ME: '/user/me',
    SENDEMAIL: 'user/send-verification-email',
    CHECKCODE: 'user/check-verification-code',
  },
  ROOM: '/rooms',
} as const
