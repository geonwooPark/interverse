export const API_ENDPOINTS = {
  USER: {
    LOGIN: '/user/login',
    SIGN_UP: '/user/signup',
    ME: '/user/me',
    SEND_EMAIL: '/user/send-verification-email',
    CHECK_CODE: '/user/check-verification-code',
    CHANGE_PASSWORD: '/user/change-password',
    CHECK_ID: '/user/check-id',
  },
  ROOM: '/rooms',
} as const
